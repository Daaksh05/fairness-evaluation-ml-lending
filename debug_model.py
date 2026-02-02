import joblib
import pandas as pd
import numpy as np

try:
    model = joblib.load('models/loan_approval_model.pkl')
    print("Model loaded successfully.")
    print("Model classes:", model.classes_)
    
    # Test prediction
    X_test = np.zeros((1, 6))
    pred = model.predict(X_test)
    print("Prediction test successful:", pred)
    
except Exception as e:
    print("Error:", e)
    import traceback
    traceback.print_exc()
