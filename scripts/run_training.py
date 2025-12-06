from src.data.load_data import load_csv
from src.data.preprocess import preprocess_data
from src.data.split_data import split_data
from src.models.train_model import train_model
from src.models.evaluate import evaluate_model

def main():
    df = load_csv("data/raw/lending_data.csv")
    X, y, scaler = preprocess_data(df, target="loan_status", sensitive_features=["gender"])
    X_train, X_test, y_train, y_test = split_data(X, y)

    model = train_model(X_train, y_train)
    y_pred = evaluate_model(model, X_test, y_test)

if __name__ == "__main__":
    main()
