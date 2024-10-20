require('dotenv').config();

const express = require('express');

const app = express();
const port = process.env.PORT || 8989;

app.get('/', (req, res) => {
  res.send('Test, samuel!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
