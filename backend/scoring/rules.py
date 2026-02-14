def interpret_metrics(raw):
    """
    Only lightweight behavioral flags here.
    Score-based levels will be derived from scores.py.
    """

    confidence_flag = "low"

    if raw["average_energy"] > 0.03 and raw["energy_variance"] < 0.02:
        confidence_flag = "strong"
    elif raw["average_energy"] > 0.02:
        confidence_flag = "developing"

    return {
        "confidence_flag": confidence_flag
    }
