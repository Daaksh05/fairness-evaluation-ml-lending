from src.data.load_data import load_csv
from src.data.preprocess import preprocess_data
from src.data.split_data import split_data
from src.models.train_model import train_model
from src.fairness.evaluate_fairness import fairness_report

def main():
    df = load_csv("data/raw/lending_data.csv")

    sensitive = df["gender"]       # needed before preprocessing
    X, y, scaler = preprocess_data(df, target="loan_status", sensitive_features=["gender"])

    X_train, X_test, y_train, y_test = split_data(X, y)
    model = train_model(X_train, y_train)

    y_pred = model.predict(X_test)

    fairness_report(y_pred, sensitive_attr=sensitive.iloc[X_test.index])

if __name__ == "__main__":
    main()

