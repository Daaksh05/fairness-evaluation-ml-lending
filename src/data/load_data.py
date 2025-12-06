import pandas as pd

def load_csv(path: str) -> pd.DataFrame:
    """Load dataset from CSV file."""
    try:
        df = pd.read_csv(path)
        print(f"[INFO] Loaded dataset with {df.shape[0]} rows & {df.shape[1]} columns")
        return df
    except FileNotFoundError:
        print("[ERROR] File not found. Check path.")
