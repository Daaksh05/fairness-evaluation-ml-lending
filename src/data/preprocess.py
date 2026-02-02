import pandas as pd
from sklearn.preprocessing import StandardScaler

# ✅ MUST match training exactly
FEATURE_ORDER = [
    "income",
    "loan_amount",
    "credit_score",
    "employment_years",
    "age",
    "gender"
]

def preprocess_data(df: pd.DataFrame, scaler: StandardScaler = None):
    """
    Preprocess input data for inference.
    Ensures feature alignment with training.
    """

    df = df.copy()

    # ✅ Encode gender exactly as training
    df["gender"] = df["gender"].apply(lambda x: 1 if str(x).lower() == "male" else 0)

    # ✅ Drop API-only columns safely
    drop_cols = ["race", "term", "property_value"]
    for col in drop_cols:
        if col in df.columns:
            df.drop(columns=[col], inplace=True)

    # ✅ ENSURE all required features exist
    for col in FEATURE_ORDER:
        if col not in df.columns:
            df[col] = 0

    # ✅ Enforce exact feature order
    df = df[FEATURE_ORDER]

    # ✅ Apply scaler
    if scaler is not None:
        df = df.astype(float)
        df.iloc[:, :] = scaler.transform(df)

    return df
