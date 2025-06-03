// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.join(__dirname, 'files'))); // serve files statically

app.get('/', (req, res) => {
  res.send('Backend running...');
});

let quizResults = [];

app.post('/submit-quiz', (req, res) => {
  const { answers, score, completed } = req.body;
  quizResults.push({ answers, score, completed, timestamp: Date.now() });
  res.json({ message: "Recorded" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
