import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react';

const DemoForm = () => {
    const [formData, setFormData] = useState({
        loan_amount: 15000,
        income: 55000,
        credit_score: 720,
        employment_years: 3,
        age: 29,
        gender: 'Male',
        race: 'White'
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        // Prepare payload with correct types and defaults
        const payload = {
            loan_amount: parseFloat(formData.loan_amount) || 0,
            income: parseFloat(formData.income) || 0,
            credit_score: parseInt(formData.credit_score) || 0,
            employment_years: parseInt(formData.employment_years) || 0,
            age: parseInt(formData.age) || 0,
            gender: formData.gender,
            race: formData.race,
            // Add missing backend fields with reasonable defaults if not in form
            term: 360,
            property_value: (parseFloat(formData.loan_amount) || 0) * 1.2
        };

        try {
            // Use relative path for Vercel deployment (handled by rewrites)
            // or fallback to localhost for local dev if configured differently.
            // But for this Vercel setup, relative path /api/predict is best.
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || 'Failed to get prediction from API');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card max-w-4xl mx-auto p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Send size={120} className="text-indigo-400" />
            </div>

            <h3 className="text-2xl mb-8 flex items-center gap-2">
                <Send className="text-indigo-400" size={24} />
                Live Prediction Demo
            </h3>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 relative z-10">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400">Loan Amount ($)</label>
                    <input
                        type="number"
                        name="loan_amount"
                        value={formData.loan_amount}
                        onChange={handleChange}
                        className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-indigo-500 outline-none transition-all"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400">Annual Income ($)</label>
                    <input
                        type="number"
                        name="income"
                        value={formData.income}
                        onChange={handleChange}
                        className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-indigo-500 outline-none transition-all"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400">Credit Score</label>
                    <input
                        type="number"
                        name="credit_score"
                        value={formData.credit_score}
                        onChange={handleChange}
                        className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-indigo-500 outline-none transition-all"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400">Employment (Years)</label>
                    <input
                        type="number"
                        name="employment_years"
                        value={formData.employment_years}
                        onChange={handleChange}
                        className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-indigo-500 outline-none transition-all"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-indigo-500 outline-none transition-all"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-400">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-indigo-500 outline-none transition-all"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-400">Race (Sensitive Attribute for Auditing)</label>
                    <select
                        name="race"
                        value={formData.race}
                        onChange={handleChange}
                        className="p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-indigo-500 outline-none transition-all"
                    >
                        <option value="White">White</option>
                        <option value="Asian">Asian</option>
                        <option value="Black">Black</option>
                        <option value="Hispanic">Hispanic</option>
                    </select>
                </div>

                <div className="md:col-span-2 mt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                        {loading ? 'Processing...' : 'Analyze Application'}
                    </button>
                </div>
            </form>

            {error && (
                <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                    <XCircle size={20} />
                    <p>{error}</p>
                </div>
            )}

            {result && (
                <div className={`mt-8 p-6 rounded-xl border animate-in fade-in slide-in-from-top-4 duration-500 ${result.approved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-full ${result.approved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                            {result.approved ? <CheckCircle size={32} /> : <XCircle size={32} />}
                        </div>
                        <div>
                            <h4 className="text-2xl font-bold">
                                {result.approved ? 'Application Approved' : 'Application Denied'}
                            </h4>
                            <p className="text-slate-400">
                                Model Confidence: <span className="text-white font-semibold">{result.confidence}%</span>
                            </p>
                        </div>
                    </div>

                    {result.explanation && result.explanation.length > 0 && (
                        <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-white/5">
                            <h5 className="text-sm font-semibold text-slate-300 mb-2">Decision Factors:</h5>
                            <ul className="space-y-1">
                                {result.explanation.map((item, index) => (
                                    <li key={index} className="text-sm text-slate-400 flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-white/5 text-sm text-slate-500 italic">
                        Note: This prediction is based on the trained model. Fairness constraints have been applied to ensure non-discrimination based on the sensitive attributes provided.
                    </div>
                </div>
            )}
        </div>
    );
};

export default DemoForm;
