import pandas as pd
import numpy as np

def evaluate_fairness(
    y_true,
    y_pred,
    sensitive_series: pd.Series
):
    """
    Evaluate basic fairness metrics:
    - Demographic Parity Difference
    - Disparate Impact

    Parameters:
    - y_true: Ground truth labels
    - y_pred: Model predictions
    - sensitive_series: Sensitive attribute (e.g., gender, race)

    Returns:
    dict with fairness metrics
    """

    df = pd.DataFrame({
        "y_true": y_true,
        "y_pred": y_pred,
        "group": sensitive_series
    })

    groups = df["group"].unique()

    if len(groups) < 2:
        return {
            "demographic_parity_difference": "N/A",
            "disparate_impact": "N/A"
        }

    positive_rates = {}

    for g in groups:
        group_df = df[df["group"] == g]
        positive_rates[g] = group_df["y_pred"].mean()

    max_rate = max(positive_rates.values())
    min_rate = min(positive_rates.values())

    demographic_parity_difference = max_rate - min_rate
    disparate_impact = (
        min_rate / max_rate if max_rate > 0 else "N/A"
    )

    return {
        "demographic_parity_difference": round(demographic_parity_difference, 4),
        "disparate_impact": round(disparate_impact, 4)
        if isinstance(disparate_impact, float)
        else disparate_impact,
        "group_positive_rates": positive_rates
    }
