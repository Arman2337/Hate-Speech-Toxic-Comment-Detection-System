const { spawn } = require('child_process');

exports.predictComment = (req, res) => {
  const userText = req.body.text;

  const pythonProcess = spawn('python', ['./python/predict.py', userText]);

  pythonProcess.stdout.on('data', (data) => {
    const result = data.toString();
    res.json(JSON.parse(result));
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error: ${data}`);
    res.status(500).send('Prediction failed');
  });
};
