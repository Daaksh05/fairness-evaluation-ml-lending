import pandas as pd
from sklearn.preprocessing import StandardScaler

def preprocess_data(df: pd.DataFrame, target: str = None, sensitive_features: list = None, scaler=None):
    """Clean and preprocess dataset. If scaler is provided, use it for transform only."""
    
    df = df.dropna()

    # Separate X and y if target is provided
    if target:
        X = df.drop(columns=[target])
        y = df[target]
    else:
        X = df
        y = None

    # Identify numeric and categorical features
    numeric_features = X.select_dtypes(include=['number']).columns
    categorical_features = X.select_dtypes(include=['object']).columns

    # One-hot encode categorical variables
    if len(categorical_features) > 0:
        X = pd.get_dummies(X, columns=categorical_features, drop_first=True)

    # Scale numeric values
    if scaler is None:
        scaler = StandardScaler()
        if len(numeric_features) > 0:
            X[numeric_features] = scaler.fit_transform(X[numeric_features])
    else:
        if len(numeric_features) > 0:
            X[numeric_features] = scaler.transform(X[numeric_features])

    print("[INFO] Data preprocessed successfully.")

    return X, y, scaler
