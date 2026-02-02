import React from 'react';
import Section from './components/Section';
import DemoForm from './components/DemoForm';

import {
  Github,
  ExternalLink,
  Lightbulb,
  Settings,
  ShieldCheck,
  Cpu,
  Users,
  Globe,
  Zap,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  CreditCard,
  Target,
  FileText,
  Copy,
  CheckCircle,
  ArrowUp
} from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [copied, setCopied] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="landing-page">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 z-[100] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Background Effect */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-slate-950">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 blur-[120px] rounded-full" />
          <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full" />
        </div>
      </div>

      {/* Hero Section */}
      <Section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl mb-6 tracking-tight gradient-text">
            Responsible AI in Financial Lending
          </h1>
          <h2 className="text-xl md:text-3xl font-medium text-slate-300 mb-4">
            Fairness-Aware Machine Learning System
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Building AI systems that are both accurate and ethically sound
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary flex items-center gap-2">
              <Github size={20} /> View on GitHub
            </a>
            <button
              onClick={() => document.getElementById('demo').scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-outline flex items-center gap-2"
            >
              <ExternalLink size={20} /> Try Live Demo
            </button>
          </div>
        </motion.div>
      </Section>

      {/* Vision & Motivation */}
      <Section id="vision" className="py-24">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-500/10 rounded-xl">
            <Lightbulb className="text-indigo-400" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl">Project Vision & Motivation</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xl text-slate-300 leading-relaxed">
              In an era where algorithmic decisions shape access to critical financial
              services, this project addresses a fundamental challenge: how can we build AI systems
              that are both accurate and ethically sound?
            </p>
            <p className="mt-6 text-slate-400">
              My end-to-end fairness-aware lending system demonstrates that high-performance
              machine learning and responsible AI principles are not mutually exclusive—they
              are complementary imperatives.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl border border-indigo-500/20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent animate-pulse" />
              <Target size={120} className="text-indigo-400/50" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-indigo-400/20 rounded-full animate-ping" />
            </div>
          </div>
        </div>
      </Section>

      {/* Interactive Demo */}
      <Section id="demo" className="py-24 bg-slate-900/50 rounded-[3rem] border border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 gradient-text">Interactive Demo</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Test the fairness-aware lending system in real-time. Input applicant data below
            to see the model's prediction and confidence level.
          </p>
        </div>
        <DemoForm />
      </Section>

      {/* Try the API */}
      <Section id="api-docs" className="py-24">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-3 bg-blue-500/10 rounded-xl">
            <Globe className="text-blue-400" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl">Try the API</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl mb-4 text-slate-300">Request Example</h3>
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto">
              <pre className="text-blue-400">
                {`POST /predict HTTP/1.1
Content-Type: application/json

{
  "loan_amount": 200000,
  "term": 360,
  "property_value": 250000,
  "income": 60000,
  "credit_score": 720,
  "age": 35,
  "gender": "Male",
  "race": "White"
}`}
              </pre>
            </div>
          </div>
          <div>
            <h3 className="text-xl mb-4 text-slate-300">Response Format</h3>
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-xs overflow-x-auto">
              <pre className="text-emerald-400">
                {`HTTP/1.1 200 OK
Content-Type: application/json

{
  "approved": true,
  "confidence": 91
}`}
              </pre>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-slate-500 text-sm">
          The API is powered by FastAPI and provides automatic Swagger documentation at
          <code className="text-indigo-400 ml-1">/docs</code>.
        </div>
      </Section>

      {/* Technical Implementation */}
      <Section id="technical" className="py-24">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-3 bg-purple-500/10 rounded-xl">
            <Settings className="text-purple-400" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl">Technical Implementation</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="text-indigo-400" size={24} />
              <h3 className="text-xl">Core ML Pipeline</h3>
            </div>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-400 mt-1" size={18} />
                <span><strong>Data Engineering:</strong> Modular preprocessing pipeline ensuring reproducibility</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-400 mt-1" size={18} />
                <span><strong>Model Development:</strong> Logistic Regression with 91% mean prediction confidence</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-400 mt-1" size={18} />
                <span><strong>Production Deployment:</strong> RESTful API (FastAPI) with Swagger docs</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-400 mt-1" size={18} />
                <span><strong>Artifact Management:</strong> Versioned model serialization (.pkl)</span>
              </li>
            </ul>
          </div>
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-cyan-400" size={24} />
              <h3 className="text-xl">Fairness-by-Design Framework</h3>
            </div>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-400 mt-1" size={18} />
                <span><strong>Sensitive Attribute Decoupling:</strong> Race/gender excluded from features</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-400 mt-1" size={18} />
                <span><strong>Post-hoc Auditing:</strong> Disparate impact analysis enabled</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-emerald-400 mt-1" size={18} />
                <span><strong>Transparent Documentation:</strong> Open-source with audit capabilities</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 bg-slate-900/50 rounded-2xl border border-slate-800 font-mono text-sm overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
            </div>
            <button
              onClick={() => copyToClipboard('uvicorn backend.main:app --reload')}
              className="p-1 hover:bg-slate-800 rounded transition-colors"
            >
              {copied ? <CheckCircle size={16} className="text-emerald-400" /> : <Copy size={16} className="text-slate-500" />}
            </button>
          </div>
          <p className="text-indigo-400">$ uvicorn backend.main:app --reload</p>
          <p className="text-slate-500 mt-2"># INFO:     Will watch for changes in [backend]</p>
          <p className="text-slate-300"># INFO:     Uvicorn running on http://127.0.0.1:8000</p>
        </div>
      </Section>

      {/* Ethical AI & Societal Impact */}
      <Section id="impact" className="py-24">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-3 bg-cyan-500/10 rounded-xl">
            <ShieldCheck className="text-cyan-400" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl">Ethical AI & Societal Impact</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card hover:shadow-indigo-500/10">
            <div className="p-3 bg-indigo-500/10 rounded-lg w-fit mb-4">
              <Zap className="text-indigo-400" size={24} />
            </div>
            <h3 className="text-xl mb-2">Practical Ethics</h3>
            <p className="text-slate-400">Moving beyond theoretical fairness to Fairness-by-Design in production systems</p>
          </div>
          <div className="card hover:shadow-cyan-500/10">
            <div className="p-3 bg-cyan-500/10 rounded-lg w-fit mb-4">
              <Users className="text-cyan-400" size={24} />
            </div>
            <h3 className="text-xl mb-2">Algorithmic Accountability</h3>
            <p className="text-slate-400">Modular architecture enables stakeholder auditing, addressing black-box concerns</p>
          </div>
          <div className="card hover:shadow-purple-500/10">
            <div className="p-3 bg-purple-500/10 rounded-lg w-fit mb-4">
              <Globe className="text-purple-400" size={24} />
            </div>
            <h3 className="text-xl mb-2">Real-World Banking</h3>
            <p className="text-slate-400">Production-ready (FastAPI + Uvicorn) for enterprise latency & scalability</p>
          </div>
          <div className="card hover:shadow-emerald-500/10">
            <div className="p-3 bg-emerald-500/10 rounded-lg w-fit mb-4">
              <Target className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-xl mb-2">Interdisciplinary Integration</h3>
            <p className="text-slate-400">Synthesizes software engineering, statistics, and applied ethics</p>
          </div>
        </div>
      </Section>

      {/* Technical Stack */}
      <Section id="stack" className="py-24">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-3 bg-emerald-500/10 rounded-xl">
            <Zap className="text-emerald-400" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl">Technical Stack</h2>
        </div>
        <div className="flex flex-wrap gap-4 mb-12">
          {[
            { name: "Python 3.10+", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
            { name: "FastAPI", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
            { name: "Scikit-Learn", color: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
            { name: "Pandas", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
            { name: "Joblib", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
            { name: "Uvicorn", color: "bg-red-500/10 text-red-400 border-red-500/20" }
          ].map((tech, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`px-4 py-2 rounded-full border text-sm font-semibold ${tech.color} cursor-default`}
            >
              {tech.name}
            </motion.span>
          ))}
        </div>
        <div>
          <h3 className="text-xl mb-6 text-slate-300">Skills Demonstrated</h3>
          <div className="flex flex-wrap gap-3">
            {["MLOps", "API Development", "Bias Mitigation", "Statistical Modeling", "Production Deployment"].map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-slate-800 text-slate-400 rounded-md text-sm border border-slate-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Section>


      {/* Project Metrics */}
      <Section id="metrics" className="py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Model Confidence", value: "91%", icon: Target },
            { label: "API Latency", value: "<1ms", icon: Zap },
            { label: "Feature Decoupling", value: "100%", icon: ShieldCheck },
            { label: "Open Source", value: "GitHub", icon: Github }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto p-3 bg-slate-800 rounded-full w-fit mb-4">
                <stat.icon className="text-indigo-400" size={24} />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="container px-5 mx-auto flex flex-col items-center">
          <div className="flex gap-6 mb-8">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">GitHub Repository</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-slate-500 mb-2">Created by Daakshayani</p>
          <p className="text-slate-600 text-sm">Application for M.Sc. Artificial Intelligence & Society - PSL University</p>
        </div>
      </footer>

      {/* Floating Back to Top */}
      <motion.button
        className="fixed bottom-8 right-8 p-3 bg-indigo-600 text-white rounded-full shadow-lg z-50 hover:bg-indigo-500 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp size={24} />
      </motion.button>
    </div>
  );
}

export default App;
