const { spawn } = require("child_process");
const Analysis = require("../models/Analysis");

exports.predictText = (req, res) => {
  const { text, userId } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text input is required." });
  }

  const pythonProcess = spawn("python", ["./backend/ml/predict.py", text]);

  let resultData = "";
  pythonProcess.stdout.on("data", (data) => {
    resultData += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python Error: ${data}`);
  });

  pythonProcess.on("close", async (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: "Prediction failed" });
    }
    try {
      const result = JSON.parse(resultData);
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
