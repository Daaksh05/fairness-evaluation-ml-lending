import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pandas as pd
from src.data.load_data import load_csv
from src.data.preprocess import preprocess_data
from src.models.train_model import train_model

def main():
    # Load the dataset
    df = load_csv("data/raw/lending_data.csv")

    # Preprocess the dataset to fit the scaler
    X_train, y_train, scaler = preprocess_data(df, target="loan_status")

    # Train the model
    model = train_model(X_train, y_train)

    # Example profile (student/applicant)
    profile = {
        "gender": "Female",
        "income": 65000,
        "loan_amount": 18000,
        "credit_score": 720,
        "employment_years": 4,
        "age": 28
    }

    # Convert to DataFrame
    profile_df = pd.DataFrame([profile])

    # Preprocess the profile using the fitted scaler
    X_profile, _, _ = preprocess_data(profile_df, scaler=scaler)

    # Align columns: add missing columns from X_train with 0
    for col in X_train.columns:
        if col not in X_profile.columns:
            X_profile[col] = 0

    # Ensure order matches X_train
    X_profile = X_profile[X_train.columns]

    # Make prediction
    prediction = model.predict(X_profile)

    # Print result
    status = "Approved" if prediction[0] == 1 else "Rejected"
    print(f"Loan Status Prediction: {status}")

if __name__ == "__main__":
    main()
