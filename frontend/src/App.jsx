import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar.jsx";
import UploadPanel from "./components/UploadPanel.jsx";
import AnalysisResult from "./components/AnalysisResult.jsx";
import AutoFixPanel from "./components/AutoFixPanel.jsx";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

function App() {
  const [creativeFile, setCreativeFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // URL of uploaded image
  const [analysis, setAnalysis] = useState(null);
  const [fixedResult, setFixedResult] = useState(null);
  const [guidelines, setGuidelines] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fixLoading, setFixLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/guidelines`)
      .then((res) => setGuidelines(res.data))
      .catch(() => {});
  }, []);

  const handleFileChange = (file) => {
    setCreativeFile(file);

    // revoke old object URL if any
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = file ? URL.createObjectURL(file) : null;
    setPreviewUrl(url);

    // reset previous results
    setAnalysis(null);
    setFixedResult(null);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!creativeFile) {
      setError("Please upload a creative first.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);
    setFixedResult(null);

    try {
      const formData = new FormData();
      formData.append("creative", creativeFile);

      const res = await axios.post(`${API_BASE}/api/analyze`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAnalysis(res.data);
    } catch (err) {
      setError("Failed to analyze creative. Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleAutoFix = async () => {
    if (!analysis || !analysis.issues) return;
    setFixLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_BASE}/api/autofix`, {
        issues: analysis.issues,
      });

      setFixedResult(res.data);
    } catch (err) {
      setError("Failed to auto-fix creative.");
    } finally {
      setFixLoading(false);
    }
  };

  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">
        <section className="left-pane">
          <UploadPanel
            creativeFile={creativeFile}
            previewUrl={previewUrl}
            onFileChange={handleFileChange}
            onAnalyze={handleAnalyze}
            loading={loading}
          />
          {error && <div className="error-banner">{error}</div>}
          {guidelines && (
            <div className="card">
              <h3>Guideline Snapshot</h3>
              <p className="muted">{guidelines.retailer}</p>
              <ul>
                {guidelines.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="right-pane">
          <AnalysisResult analysis={analysis} />
          <AutoFixPanel
            analysis={analysis}
            fixedResult={fixedResult}
            previewUrl={previewUrl}
            onAutoFix={handleAutoFix}
            loading={fixLoading}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
