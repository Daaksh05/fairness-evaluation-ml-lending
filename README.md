# Fairness Evaluation of Machine Learning Models in Financial Lending

## 📘 Abstract
Machine learning models are increasingly used in high-stakes decision-making domains such as **financial lending**. While these systems improve efficiency and scalability, they may unintentionally introduce or amplify **bias** against certain demographic groups. This project presents a structured framework to **evaluate, analyze, and interpret fairness** in machine learning-based loan approval systems.

The system demonstrates an end-to-end ML pipeline including data collection, preprocessing, model training, performance evaluation, and fairness assessment using widely accepted fairness metrics. The project emphasizes **Responsible AI principles** and highlights the importance of fairness-aware decision systems.

---

## 📌 Motivation
Financial lending decisions directly affect individuals’ access to economic opportunities. Biased automated systems can result in unfair loan rejections based on sensitive attributes such as gender or age. This project aims to:

- Understand how bias enters ML pipelines
- Measure fairness quantitatively
- Promote ethical and transparent AI systems

---

## 🎯 Project Objectives
- Build a baseline machine learning model for loan approval prediction
- Identify sensitive attributes influencing decisions
- Evaluate bias using fairness metrics
- Interpret fairness results clearly
- Provide a modular and extensible fairness evaluation framework

---

## 🧠 Concepts & Technologies Used
### Machine Learning
- Logistic Regression
- Classification Evaluation Metrics
- Feature Scaling & Encoding

### Fairness & Responsible AI
- Algorithmic Bias
- Demographic Parity
- Disparate Impact
- Fairness Evaluation Pipelines

### Tools & Libraries
- Python 3
- scikit-learn
- pandas, numpy
- Fairlearn
- Git & GitHub

---


---

## 📊 Dataset Description
The dataset represents simplified loan application records.

### Attributes
| Feature | Description |
|------|------------|
| loan_status | Target variable (0 = Rejected, 1 = Approved) |
| gender | Sensitive attribute |
| income | Annual income |
| loan_amount | Loan requested |
| credit_score | Creditworthiness score |
| employment_years | Years of employment |
| age | Applicant age |

---

## 🔄 Machine Learning Pipeline

### 1️⃣ Data Loading
- Reads CSV data from `data/raw`
- Performs validation checks

### 2️⃣ Data Preprocessing
- Missing value removal
- Categorical encoding
- Feature scaling
- Separation of target and features

### 3️⃣ Model Training
- Logistic Regression baseline
- Simple and interpretable model choice

### 4️⃣ Model Evaluation
- Accuracy
- Classification report

### 5️⃣ Fairness Evaluation
- Group-wise prediction rates
- Fairness metric computation
- Interpretation of bias

---

## ⚖️ Fairness Metrics Explained

### 🔹 Demographic Parity
Ensures the probability of positive predictions is equal across sensitive groups.

### 🔹 Disparate Impact (DI)
Ratio of favorable outcomes between protected and unprotected groups.

**Rule of Thumb:**
- DI ≈ 1 → Fair
- DI < 0.8 → Potential bias

---

## ▶️ How to Run the Project

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Daaksh05/fairness-evaluation-ml-lending.git
cd fairness-evaluation-ml-lending


