// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('✅ Backend is working!');
});

app.post('/predict', (req, res) => {
  const { text } = req.body;

  // Dummy response for now
  res.json({
    toxic: true,
    labels: ['insult', 'threat']
  });
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
