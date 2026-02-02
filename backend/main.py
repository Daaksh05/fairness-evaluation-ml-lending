from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import joblib
import sys
import os

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.data.preprocess import preprocess_data
from src.fairness.evaluate_fairness import evaluate_fairness

app = FastAPI(
    title="FairLend AI API",
    description="API for predicting loan approval and evaluating fairness.",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model and scaler
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'loan_approval_model.pkl')
SCALER_PATH = os.path.join(BASE_DIR, 'models', 'scaler.pkl')

try:
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    print(f"✅ Model loaded from {MODEL_PATH}")
except FileNotFoundError:
    print(f"❌ Model not found at {MODEL_PATH}")
    model = None
    scaler = None

class LoanApplicant(BaseModel):
    # Define the input data schema based on your dataset features
    # Example:
    loan_amount: int
    term: int
    property_value: int
    income: int
    credit_score: int
    employment_years: int
    age: int
    gender: str
    race: str

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None
    }

@app.on_event("startup")
async def startup_event():
    if model is None or scaler is None:
        # This is a simple way to handle the model not being ready.
        # In a production system, you might want to have a more robust
        # mechanism, like a health check endpoint.
        print("Model or scaler not found. Please train the model first.")

@app.post("/predict")
async def predict(applicant: LoanApplicant):
    if model is None or scaler is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Please train the model first.")

    try:
        input_data = pd.DataFrame([applicant.dict()])

        # ✅ Correct preprocessing call
        X = preprocess_data(input_data, scaler=scaler)

        prediction = model.predict(X)[0]
        confidence = float(model.predict_proba(X).max() * 100) # Ensure confidence is float

        explanation_messages = []
        explanation_messages = []
        try:
            # Check if model has coefficients (Logistic Regression)
            if hasattr(model, 'coef_'):
                coefs = model.coef_[0]
                feature_names = X.columns
                
                # Calculate contribution: feature_value * coefficient
                # X is a DataFrame, so we get the first row as values
                contributions = X.values[0] * coefs
                
                # Create pairs of (feature, contribution)
                feature_map = list(zip(feature_names, contributions))
                
                # Sort by absolute contribution to identify most impactful features
                feature_map.sort(key=lambda x: abs(x[1]), reverse=True)
                
                top_factors = feature_map[:3] # Top 3 factors
                
                for feature, score in top_factors:
                    readable_feature = feature.replace('_', ' ').title()
                    
                    # Logic: 
                    # If Approved (prediction=1): Positive scores helped, Negative scores hurt
                    # If Denied (prediction=0): Negative scores caused denial, Positive scores helped but weren't enough
                    
                    if prediction == 1: # Approved
                        if score > 0:
                            explanation_messages.append(f"High {readable_feature} increased approval chance.")
                        else:
                            explanation_messages.append(f"Low {readable_feature} decreased approval chance, but was outweighed.")
                    else: # Denied
                        if score < 0:
                            explanation_messages.append(f"Low {readable_feature} significantly reduced approval chance.")
                        else:
                            explanation_messages.append(f"Good {readable_feature}, but not enough to approve.")
                            
            else:
                 explanation_messages.append("Explanation available only for linear models.")
                 
        except Exception as expl_error:
            print(f"Explanation generation failed: {expl_error}")
            explanation_messages.append("Automated decision based on credit history and income.")


        return {
            "approved": bool(prediction),
            "confidence": confidence,
            "explanation": explanation_messages
        }

    except Exception as e:
        print("❌ ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))


# To run the app, use the command:
# uvicorn backend.main:app --reload
# The following is for development purposes and should not be used in production.
if __name__ == "__main__":
    import uvicorn
    # We bind to 0.0.0.0 to make the server accessible from outside the container
    # in a Dockerized environment.
    uvicorn.run(app, host="0.0.0.0", port=8000)
