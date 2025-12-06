import pandas as pd
from sklearn.preprocessing import StandardScaler

def preprocess_data(df: pd.DataFrame, target: str, sensitive_features: list):
    """Clean and preprocess dataset."""
    
    df = df.dropna()

    # Separate X and y
    X = df.drop(columns=[target])   # FIXED: X not x
    y = df[target]

    # Identify numeric and categorical features
    numeric_features = X.select_dtypes(include=['number']).columns
    categorical_features = X.select_dtypes(include=['object']).columns

    # One-hot encode categorical variables
    if len(categorical_features) > 0:
        X = pd.get_dummies(X, columns=categorical_features, drop_first=True)

    # Scale numeric values
    scaler = StandardScaler()
    if len(numeric_features) > 0:
        X[numeric_features] = scaler.fit_transform(X[numeric_features])

    print("[INFO] Data preprocessed successfully.")

    return X, y, scaler
