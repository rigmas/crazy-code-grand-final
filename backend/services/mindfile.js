const fs = require('fs');
const path = require('path');

exports.uploadFileBase64 = (name, content, extension) => {
  const fileBuffer = Buffer.from(content, 'base64')

  const filePath = path.join(getUploadsDir, name + extension);
  fs.writeFileSync(filePath, fileBuffer);

  if (!fs.existsSync(filePath)) {
    console.error(`Failed to write file: ${filePath}`)
  }

  return filePath
}

exports.readFileBinary = (filePath) => {
  console.log('==>', filePath)
  const fileBuffer = fs.readFileSync(filePath)
  console.log('==>', fileBuffer)
  return fileBuffer
}

const getUploadsDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(getUploadsDir)) {
  fs.mkdirSync(getUploadsDir);
}
