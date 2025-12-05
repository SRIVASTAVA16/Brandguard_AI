const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "BrandGuard AI Backend is running..." });
});

// Analyze Route
app.post("/api/analyze", upload.single("creative"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No creative uploaded" });
  }

  const mockResponse = {
    status: "analyzed",
    issues: [
      {
        id: 1,
        type: "Logo placement",
        severity: "high",
        description:
          "Logo too close to bottom edge. Minimum 20px margin required.",
        suggestedFix: "Move logo 20px up and 15px right",
      },
      {
        id: 2,
        type: "Contrast",
        severity: "medium",
        description: "Text contrast below recommended accessibility.",
        suggestedFix: "Increase text brightness by +15%",
      },
      {
        id: 3,
        type: "Aspect ratio",
        severity: "low",
        description: "Creative not in 1:1 required for Instagram Feed.",
        suggestedFix: "Resize to 1080x1080",
      },
    ],
    aiScore: 71,
    recommendedFormats: [
      "1080x1080 - IG Feed",
      "1080x1920 - IG Story",
      "1200x630 - Facebook Feed",
    ],
  };

  res.json(mockResponse);
});

// Auto Fix Route
app.post("/api/autofix", express.json(), (req, res) => {
  const { issues } = req.body;

  const appliedFixes = issues.map((issue) => ({
    id: issue.id,
    applied: true,
    comment: `Auto-fix applied: ${issue.type}`,
  }));

  res.json({
    status: "fixed",
    appliedFixes,
    // bright white background with black text so it's VERY visible
    fixedCreativeUrl:
      "https://dummyimage.com/800x800/ffffff/000000.png&text=BrandGuard+AI+Fixed"
  });
});



// Guidelines Route
app.get("/api/guidelines", (req, res) => {
  res.json({
    retailer: "Tesco Retail Media",
    rules: [
      "Maintain 20px safe zone around edges.",
      "Logo must be visible and not distorted.",
      "Primary text should meet contrast ratio.",
      "No misleading text allowed.",
      "Use approved brand colors only.",
    ],
  });
});

app.listen(PORT, () => {
    console.log(`BrandGuard AI Backend running on port ${PORT}`);
});
