def fairness_report(y_pred, sensitive_attr):
    from .metrics import demographic_parity, disparate_impact

    print("\n--- Fairness Evaluation ---")
    dp_rates = demographic_parity(y_pred, sensitive_attr)
    di = disparate_impact(dp_rates)

    print("\nInterpretation:")
    if di < 0.8:
        print("⚠️ Bias Detected (DI < 0.8 threshold)")
    else:
        print("✓ Fairness acceptable")

    return {"dp_rates": dp_rates, "di": di}
