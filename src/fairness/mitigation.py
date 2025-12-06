import numpy as np

def threshold_adjustment(model, X_test, threshold=0.6):
    """Post-processing mitigation: change decision threshold."""
    
    proba = model.predict_proba(X_test)[:, 1]
    adjusted_pred = (proba >= threshold).astype(int)

    print(f"[INFO] Applied threshold adjustment at {threshold}")
    return adjusted_pred
