// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use('/files', express.static(path.join(__dirname, 'files'))); // serve files statically

app.get('/', (req, res) => {
  res.send('Backend running...');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
