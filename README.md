# 🤖 Fairness Evaluation of ML Models in Financial Lending

An **end-to-end Responsible AI system** for **loan approval prediction**, designed with a strong focus on **fairness, transparency, and societal impact**.  
This project combines **Machine Learning**, **Ethical AI**, and **API deployment** using **FastAPI**.

---

## 🌟 Key Highlights

✅ Loan approval prediction using Logistic Regression  
✅ Ethical handling of sensitive attributes (gender, race)  
✅ Fairness-aware ML pipeline design  
✅ Reproducible training & inference using saved artifacts  
✅ FastAPI backend with REST endpoints  
✅ Ideal for **AI & Society / Responsible AI / PSL coursework**

---

## 🏗️ Project Structure

```
fairness-evaluation-ml-lending/
│
├── backend/
│   └── main.py                🚀 FastAPI backend
│
├── scripts/
│   └── train_model.py         🧠 Model training script
│
├── src/
│   └── data/
│       └── preprocess.py     🔄 Shared preprocessing logic
│
├── data/
│   └── raw/
│       └── lending_data.csv  📊 Dataset
│
├── models/                   📦 Generated ML artifacts
│   ├── loan_approval_model.pkl
│   ├── scaler.pkl
│   └── feature_order.pkl
│
├── venv/                     🐍 Virtual environment
└── README.md
```

---

## ⚙️ Requirements

- 🐍 Python **3.10+**
- 📦 pip
- 💻 Windows / macOS / Linux

---

## 🚀 How to Run the Project (Step-by-Step)

### 1️⃣ Clone the Repository

```
git clone https://github.com/Daaksh05/fairness-evaluation-ml-lending.git
cd fairness-evaluation-ml-lending
```

---

### 2️⃣ Create & Activate Virtual Environment

```
python -m venv venv
```

**Windows**
```
venv\Scripts\activate
```

**macOS / Linux**
```
source venv/bin/activate
```

---

### 3️⃣ Install Dependencies

```
pip install fastapi uvicorn pandas scikit-learn joblib
```

---

### 4️⃣ Prepare Dataset 📊

Ensure the following file exists:

```
data/raw/lending_data.csv
```

Required columns:

```
loan_amount,income,credit_score,age,gender,race,loan_status
```

---

### 5️⃣ Train the Model (MANDATORY) 🧠

⚠️ This step **must be completed before starting the backend**.

```
python scripts/train_model.py
```

Expected output:

```
✅ Training complete
📦 loan_approval_model.pkl created
📦 scaler.pkl created
📦 feature_order.pkl created
```

---

### 6️⃣ Start the Backend API 🚀

```
uvicorn backend.main:app --reload
```

If successful:

```
INFO: Application startup complete
```

---

## 🌐 API Usage

### 🔍 Swagger UI

Open in your browser:

```
http://localhost:8000/docs
```

---

### 📥 Example Prediction Input

```
{
  "loan_amount": 250000,
  "term": 240,
  "property_value": 400000,
  "income": 85000,
  "credit_score": 720,
  "age": 32,
  "gender": "male",
  "race": "asian"
}
```

---

### 📤 Example Response

```
{
  "approved": true,
  "confidence": 91
}
```

---

## 🧠 Ethical AI & Fairness Note ⚖️

Sensitive attributes such as **gender** and **race** are **NOT used to decide loan approval**.  
They are included **only for fairness auditing, counterfactual analysis, and societal impact evaluation**, aligning with Responsible AI principles.

---

## 🎓 Academic Relevance (AI & Society / PSL)

This project demonstrates:

✨ Ethical AI system design  
✨ Bias-aware ML pipelines  
✨ Transparency & reproducibility  
✨ Societal impact of algorithmic decision-making  

---

## 📄 License

📘 This project is intended for **academic and educational purposes only**.

---

## 🙌 Author Daakshayani

**Daaksh05**  
🤖 AI | 📊 Machine Learning | ⚖️ Fairness | 🌍 Responsible AI
