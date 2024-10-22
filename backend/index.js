require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const QRCode = require('qrcode');
const qrControllers = require('./controllers/qr');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8989;

app.get('/', (req, res) => {
  res.send('Test, samuel!');
});

app.get('/api/qr/generate', async (req, res) => {
  qrControllers.generate(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err))
})

app.post('/api/qr/scan', async (req, res) => {
  console.log(req)
  qrControllers.scan(req)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json(err))
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
