import os
import joblib
import pandas as pd

from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler

# Project paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "raw", "lending_data.csv")
MODEL_DIR = os.path.join(BASE_DIR, "models")

os.makedirs(MODEL_DIR, exist_ok=True)

MODEL_PATH = os.path.join(MODEL_DIR, "loan_approval_model.pkl")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")

# ---------------------------
# Load dataset
# ---------------------------
df = pd.read_csv(DATA_PATH)

# Expected columns
FEATURES = [
    "income",
    "loan_amount",
    "credit_score",
    "employment_years",
    "age",
    "gender"
]

TARGET = "loan_status"

# Encode gender
df["gender"] = df["gender"].map({"Male": 1, "Female": 0})

X = df[FEATURES]
y = df[TARGET]

# ---------------------------
# Scale numeric features
# ---------------------------
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# ---------------------------
# Train model
# ---------------------------
model = LogisticRegression(max_iter=1000)
model.fit(X_scaled, y)

# ---------------------------
# Save artifacts
# ---------------------------
joblib.dump(model, MODEL_PATH)
joblib.dump(scaler, SCALER_PATH)

print("✅ Model and scaler created successfully")
print("📦", MODEL_PATH)
print("📦", SCALER_PATH)
