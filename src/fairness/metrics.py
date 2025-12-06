import numpy as np
import pandas as pd

def demographic_parity(y_pred, sensitive_attr):
    """Check demographic parity by comparing positive prediction rates."""
    
    groups = pd.unique(sensitive_attr)
    rates = {}

    for group in groups:
        group_idx = sensitive_attr == group
        rate = y_pred[group_idx].mean()
        rates[group] = rate

    print("\nDemographic Parity Rates:", rates)
    return rates


def disparate_impact(rates):
    """Compute Disparate Impact = (minority rate / majority rate)."""

    values = list(rates.values())
    di = min(values) / max(values)

    print(f"Disparate Impact (DI): {di:.3f}")
    return di
