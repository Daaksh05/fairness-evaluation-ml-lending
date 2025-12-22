from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
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

# Load the trained model and scaler
try:
    model = joblib.load('models/loan_approval_model.pkl')
    scaler = joblib.load('models/scaler.pkl')
except FileNotFoundError:
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
    age: int
    gender: str
    race: str

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
        # Convert input data to a pandas DataFrame
        input_data = pd.DataFrame([applicant.dict()])

        # Preprocess the input data
        # The 'target' column is not needed for prediction
        preprocessed_data, _ = preprocess_data(input_data, target_column=None, scaler=scaler)

        # Make a prediction
        prediction = model.predict(preprocessed_data)[0]
        decision = "Approved" if prediction == 1 else "Rejected"

        # Evaluate fairness
        # For a single prediction, fairness metrics are not very meaningful.
        # Typically, you would evaluate fairness on a batch of data.
        # Here, we'll return a placeholder for the fairness metrics.
        fairness_metrics = {
            "demographic_parity_difference": "N/A for single prediction",
            "disparate_impact": "N/A for single prediction"
        }

        return {
            "loan_decision": decision,
            "fairness_metrics": fairness_metrics
        }
    except Exception as e:
        # Log the error for debugging
        print(f"An error occurred: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

# To run the app, use the command:
# uvicorn backend.main:app --reload
# The following is for development purposes and should not be used in production.
if __name__ == "__main__":
    import uvicorn
    # We bind to 0.0.0.0 to make the server accessible from outside the container
    # in a Dockerized environment.
    uvicorn.run(app, host="0.0.0.0", port=8000)
