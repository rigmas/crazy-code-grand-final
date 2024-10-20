require('dotenv').config();

const express = require('express');
const QRCode = require('qrcode');

const app = express();
const port = process.env.PORT || 8989;

app.get('/', (req, res) => {
  res.send('Test, samuel!');
});

app.get('/qr/generate', async (req, res) => {
  try {
    const { text } = req.query;
    
    // Generate QR code 
    const qrCodeDataUrl = await QRCode.toDataURL(text || '1');

    console.log({ qrCodeDataUrl })

    res.json({
      qrCodeUrl: qrCodeDataUrl
    });
  } catch (error) {
    console.log({ error })
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
