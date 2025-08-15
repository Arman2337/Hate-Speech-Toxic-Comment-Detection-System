const { spawn } = require("child_process");
const path = require("path");
const Analysis = require("../model/analysis");

exports.predictText = (req, res) => {
  const { text, userId } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text input is required." });
  }

  // ✅ Correct Python script path no matter where the server is started from
  const pythonScriptPath = path.join(__dirname, "..", "ml", "predict.py");

  // ✅ Spawn Python process with correct script path and text argument
  const pythonProcess = spawn("python", [pythonScriptPath, text], {
    cwd: path.join(__dirname, "..", "ml"), // Ensures working directory is correct
  });

  let resultData = "";
  let errorData = "";

  pythonProcess.stdout.on("data", (data) => {
    resultData += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    errorData += data.toString();
  });

  pythonProcess.on("close", async (code) => {
    if (code !== 0) {
      console.error(`❌ Python Script Error: ${errorData}`);
      return res.status(500).json({ error: "Prediction failed", details: errorData });
    }

    try {
      const result = JSON.parse(resultData);

      // ✅ Save to history if user is logged in
      if (userId) {
        const newAnalysis = new Analysis({
          userId,
          inputText: text,
          results: result,
        });
        await newAnalysis.save();
      }

      res.json(result);
    } catch (e) {
      console.error("❌ Failed to parse prediction result:", e);
      res.status(500).json({ error: "Failed to parse prediction result" });
    }
  });
};

exports.getHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await Analysis.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history." });
  }
};


exports.getStats = async (req, res) => {
    try {
        // 1. Get total number of documents in the Analysis collection
        const totalAnalyzed = await Analysis.countDocuments();

        // 2. Get the number of documents considered toxic
        // We define "toxic" as any entry where the overallScore is >= 50
        const toxicDetected = await Analysis.countDocuments({ 
            'results.overallScore': { $gte: 50 } 
        });

        res.status(200).json({
            totalAnalyzed,
            toxicDetected
        });

    } catch (error) {
        console.error("❌ Failed to fetch stats:", error);
        res.status(500).json({ message: "Failed to fetch statistics." });
    }
};