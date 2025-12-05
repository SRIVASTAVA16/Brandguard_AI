import React from "react";

function AnalysisResult({ analysis }) {
  if (!analysis) {
    return (
      <div className="card">
        <h2>Analysis</h2>
        <p className="muted">
          Upload a creative and click “Analyze” to see results.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Compliance Analysis</h2>
      <p>
        AI Compliance Score: <strong>{analysis.aiScore}/100</strong>
      </p>
      <h4>Detected Issues</h4>
      <ul className="issue-list">
        {analysis.issues.map((issue) => (
          <li
            key={issue.id}
            className={`issue-item severity-${issue.severity}`}
          >
            <div className="issue-header">
              <span className="issue-type">{issue.type}</span>
              <span className="issue-badge">
                {issue.severity.toUpperCase()}
              </span>
            </div>
            <p>{issue.description}</p>
            <p className="muted">Suggested fix: {issue.suggestedFix}</p>
          </li>
        ))}
      </ul>

      <h4>Recommended Formats</h4>
      <div className="chip-row">
        {analysis.recommendedFormats.map((fmt, idx) => (
          <span key={idx} className="chip">
            {fmt}
          </span>
        ))}
      </div>
    </div>
  );
}

export default AnalysisResult;
