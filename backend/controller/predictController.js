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
