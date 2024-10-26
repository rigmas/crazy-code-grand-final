const QRCode = require("qrcode");

const userRepository = require("../repositories/user");

exports.generate = async (req) => {
  const { email } = req.query;

  const frontendBaseUrl = process.env.FRONTEND_BASE_URL;
  try {
    const qrCodeUrl = await QRCode.toDataURL(`${frontendBaseUrl}/login/${email}`);

    return { message: "QR code generated successfully", data: qrCodeUrl };
  } catch (err) {
    console.error("qr::generate - err: ", err);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
};

exports.scan = async (req) => {
  const { email } = req.body;

  try {
    const user = await userRepository.getUserByEmail(email);

    return { message: "QR code scanned successfully", data: user };
  } catch (err) {
    console.error("qr::scan - err: ", err);
    res.status(500).json({ error: "Failed to scan QR code" });
  }
};
