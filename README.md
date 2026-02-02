# 🤖 Fairness-Aware Financial Lending AI

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18362174.svg)](https://doi.org/10.5281/zenodo.18362174)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-2ea44f?style=for-the-badge&logo=vercel)](https://fairness-evaluation-ml-lending-g4gchi9u2-daaksh05s-projects.vercel.app)

An **end-to-end Responsible AI system** that combines a rigorous fairness-aware machine learning model with a modern, interactive full-stack application.

The system predicts loan approvals while providing **real-time explanations** for its decisions, demonstrating that high-performance AI can be transparent and ethically sound.

---

## 🌟 Key Features

### 🧠 Intelligent Backend
- **Fairness-Aware ML**: Logistic Regression model trained with fairness constraints.
- **Explainable AI (XAI)**: Provides real-time "Decision Factors" explaining *why* an application was approved or denied.
- **FastAPI**: High-performance, asynchronous REST API.
- **Artifact Management**: Reproducible inference using versioned model/scaler artifacts.

### ✨ Modern Frontend
- **Interactive Demo**: Real-time loan application simulation.
- **React + Vite**: Blazing fast performance.
- **Beautiful UI**: Glassmorphism design, smooth animations (Framer Motion), and responsive layout.

---

## 🏗️ Project Structure

```
fairness-evaluation-ml-lending/
│
├── api/                      🚀 Serverless Entry Point (Vercel)
│   └── index.py
│
├── backend/                  🐍 FastAPI Backend
│   ├── main.py              (API Routes & Logic)
│   └── __init__.py
│
├── landing-page/             ⚛️ React Frontend
│   ├── src/                 (Components, Styles, App.jsx)
│   ├── dist/                (Built static assets)
│   └── vite.config.js
│
├── models/                   📦 ML Artifacts
│   ├── loan_approval_model.pkl
│   └── scaler.pkl
│
├── data/                     📊 Datasets
│   └── raw/
│
└── requirements.txt          📋 Dependencies
```

---

## 🚀 Quick Start (Locally)

### 1. Backend Setup (Python)

```bash
# Clone the repository
git clone https://github.com/Daaksh05/fairness-evaluation-ml-lending.git
cd fairness-evaluation-ml-lending

# Create (and activate) a virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the API Server
python -m uvicorn backend.main:app --reload
```
*The backend will run at `http://localhost:8000`*

### 2. Frontend Setup (Node.js)

Open a new terminal window:

```bash
cd landing-page

# Install dependencies
npm install

# Start the dev server
npm run dev
```
*The website will run at `http://localhost:5173`*

---

## ☁️ Deployment (Vercel)

This project is configured for one-click deployment on **Vercel**.

1.  **Push** this repository to GitHub.
2.  Import the project into Vercel.
3.  **Important Configuration**:
    *   **Root Directory**: `fairness-evaluation-ml-lending` (or `./` if at repo root).
    *   **Framework Preset**: Select **Vite**.
    *   **Build Settings (Override)**:
        *   **Build Command**: `cd landing-page && npm install && npm run build`
        *   **Output Directory**: `landing-page/dist`
        *   **Install Command**: `cd landing-page && npm install`
4.  **Deploy!** Vercel will automatically handle both the Python backend (serverless functions) and the React frontend.

---

## 🧠 Ethical AI & Fairness Note ⚖️

Sensitive attributes such as **gender** and **race** are **NOT used to decide loan approval**.
They are included in the request payload only for:
1.  **Fairness Auditing**: Analyzing disparate impact across demographic groups.
2.  **Societal Impact Evaluation**: Ensuring the model aligns with Responsible AI principles.

---

## 📖 Citation

If you use this project in academic work, please cite it as:

**BibTeX**
```bibtex
@software{daakshayani2026fairness,
  author  = {Daakshayani, N. S.},
  title   = {Fairness Evaluation of Machine Learning Models in Financial Lending},
  year    = {2026},
  version = {1.0.0},
  doi     = {10.5281/zenodo.18362174},
  url     = {https://github.com/Daaksh05/fairness-evaluation-ml-lending}
}
```

**APA**
> Daakshayani, N. S. (2026). Fairness Evaluation of Machine Learning Models in Financial Lending (Version 1.0.0) [Computer software]. https://doi.org/10.5281/zenodo.18362174
