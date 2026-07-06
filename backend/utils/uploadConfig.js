const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure directories exist
const photoDir = path.join(__dirname, '../uploads/photos');
const certDir = path.join(__dirname, '../uploads/certificates');

if (!fs.existsSync(photoDir)) fs.mkdirSync(photoDir, { recursive: true });
if (!fs.existsSync(certDir)) fs.mkdirSync(certDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'photo') {
            cb(null, photoDir);
        } else if (file.fieldname === 'certificate_pdf') {
            cb(null, certDir);
        } else {
            cb(null, path.join(__dirname, '../uploads'));
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

module.exports = upload;
