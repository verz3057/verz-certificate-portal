const QRCode = require('qrcode');

const generateQR = async (certificateId) => {
    try {
        const url = `${process.env.FRONTEND_URL}/verify?certificate=${certificateId}`;
        const qrCodeDataUrl = await QRCode.toDataURL(url);
        return qrCodeDataUrl;
    } catch (err) {
        console.error('Error generating QR code:', err);
        return null;
    }
}

module.exports = { generateQR };
