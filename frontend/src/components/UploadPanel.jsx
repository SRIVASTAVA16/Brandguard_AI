import React, { useRef } from "react";

function UploadPanel({ creativeFile, previewUrl, onFileChange, onAnalyze, loading }) {
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) onFileChange(file);
  };

  return (
    <div className="card">
      <h2>Upload Creative</h2>
      <p className="muted">
        Upload any JPG/PNG creative. We’ll analyze it for guideline and brand
        compliance.
      </p>
      <div className="upload-box" onClick={handleBrowseClick}>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleChange}
        />
        {creativeFile ? (
          <p>{creativeFile.name}</p>
        ) : (
          <p>Click to browse or drag &amp; drop (simulated)</p>
        )}
      </div>

      {previewUrl && (
        <div className="preview-row">
          <img src={previewUrl} alt="preview" className="preview-img" />
        </div>
      )}

      <button
        className="primary-btn"
        onClick={onAnalyze}
        disabled={!creativeFile || loading}
      >
        {loading ? "Analyzing..." : "Analyze Creative"}
      </button>
    </div>
  );
}

export default UploadPanel;
