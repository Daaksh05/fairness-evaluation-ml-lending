from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

def train_model(X_train, y_train):
    """Train logistic regression baseline model."""
    
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train, y_train)

    print("[INFO] Model training completed.")
    return model
