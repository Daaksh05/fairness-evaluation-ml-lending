Fairness Evaluation of ML Models in Financial Lending Data

This project investigates bias and fairness in machine learning models used for financial lending decisions such as loan approval and credit risk assessment. The goal is to evaluate whether models behave equitably across demographic groups (e.g., gender, age, socioeconomic groups) and to apply fairness-enhancing mitigation strategies.

The project is designed as a computational social science and responsible AI study, integrating machine learning, fairness metrics, interpretability, and ethical evaluation.

🚀 Project Objectives

Build ML models for predicting loan approval / credit risk

Evaluate fairness using statistical and group fairness metrics

Identify disparate model behavior across sensitive attributes

Apply bias mitigation strategies (pre-, in-, post-processing)

Provide actionable insights for ethical and fair model deployment

📂 Project Structure
fairness-evaluation-ml-lending/
│
├── data/
│   ├── raw/                # Original datasets
│   ├── processed/          # Cleaned datasets
│   └── sample/             # Sample data for testing
│
├── notebooks/
│   ├── 01_data_exploration.ipynb
│   ├── 02_preprocessing.ipynb
│   ├── 03_model_training.ipynb
│   ├── 04_fairness_metrics.ipynb
│   └── 05_bias_mitigation.ipynb
│
├── src/
│   ├── data/               # Data loading & preprocessing
│   ├── models/             # Model training & evaluation
│   ├── fairness/           # Fairness metrics & mitigation
│   └── utils/              # Config & helper functions
│
├── scripts/
│   ├── run_training.py
│   ├── run_fairness_check.py
│   ├── run_mitigation.py
│   └── deploy_app.py
│
├── reports/                # Visualizations, logs, summary
├── models/                 # Trained model artifacts
│
├── requirements.txt
├── README.md
└── .gitignore

🧠 Methodology
1️⃣ Dataset

You may use datasets such as:

Lending Club dataset

HMDA (Home Mortgage Disclosure Act) dataset

Any financial lending dataset with sensitive attributes

Features include:

Income, loan amount, credit score

Employment length, DTI ratio

Sensitive attributes (gender, age, etc.)

2️⃣ Model Training

Machine learning models explored include:

Logistic Regression

Random Forest

XGBoost

Target variable:

loan_status ∈ { approved, rejected }

3️⃣ Fairness Metrics

The project evaluates:

Demographic Parity

Equal Opportunity

Disparate Impact Ratio

False Positive Rate (FPR) gap

False Negative Rate (FNR) gap

Tools used:

fairlearn

sklearn

custom fairness metric functions

4️⃣ Bias Mitigation Techniques
Pre-processing

Reweighing

Removing or encoding sensitive attributes

In-processing

Fairness-constrained optimization

Post-processing

Threshold adjustment

Reject option classification

📊 Results Summary (Example)

The model showed a disparate impact ratio below 0.8, indicating bias

Threshold adjustment improved fairness by 15–20%

Reweighing reduced approval rate disparity between demographic groups

(This section can be updated once your results are generated.)

🛠 Tech Stack

Python 3.10+

Pandas, NumPy

Scikit-learn

Fairlearn

Matplotlib / Seaborn

Jupyter Notebook

Streamlit (optional deployment)
