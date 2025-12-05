import React from "react";

function AutoFixPanel({ analysis, fixedResult, previewUrl, onAutoFix, loading }) {
  return (
    <div className="card">
      <h2>Auto-Fix Assistant</h2>
      <p className="muted">
        BrandGuard AI can auto-fix detected violations and generate a compliant
        creative.
      </p>
      <button
        className="secondary-btn"
        onClick={onAutoFix}
        disabled={!analysis || !analysis.issues || loading}
      >
        {loading ? "Applying Fixes..." : "Auto-Fix Creative"}
      </button>

      {fixedResult && (
        <>
          <h4 style={{ marginTop: "1rem" }}>Applied Fixes</h4>
          <ul>
            {fixedResult.appliedFixes.map((fix) => (
              <li key={fix.id}>✅ {fix.comment}</li>
            ))}
          </ul>

          <h4 style={{ marginTop: "1rem" }}>Fixed Creative Preview</h4>

          {previewUrl ? (
            <div className="fixed-preview-wrapper">
              <div className="fixed-preview-inner">
                <span className="fixed-badge">Fixed Version</span>
                <img
                  src={previewUrl}
                  alt="Fixed creative"
                  className="fixed-preview-img"
                />
              </div>
            </div>
          ) : (
            <p className="muted">
              Upload and analyze a creative to see the fixed preview.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default AutoFixPanel;
