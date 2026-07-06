const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePDF = ({ certificateId, studentName, courseName, issueDate, grade, qrCodeUrl, instructorName, filePath }) => {
    return new Promise((resolve, reject) => {
        try {
            // Create a document
            const doc = new PDFDocument({
                layout: 'landscape',
                size: 'A4',
                margin: 50
            });

            // Pipe its output somewhere, like to a file or HTTP response
            const stream = fs.createWriteStream(filePath);
            doc.pipe(stream);

            // Add background or border (Optional simple border for now)
            doc.rect(20, 20, 800, 555).stroke('#D4AF37'); // Gold border
            doc.rect(25, 25, 790, 545).stroke('#111111'); // Black inner border

            // Title
            doc.fontSize(40).fillColor('#111111').text('CERTIFICATE OF COMPLETION', 0, 100, { align: 'center' });
            
            // Subtitle
            doc.fontSize(16).fillColor('#666666').text('This is proudly presented to', 0, 160, { align: 'center' });

            // Student Name
            doc.fontSize(36).fillColor('#D4AF37').text(studentName, 0, 210, { align: 'center' });

            // Description
            doc.fontSize(16).fillColor('#666666').text(`For successfully completing the course`, 0, 270, { align: 'center' });
            doc.fontSize(24).fillColor('#111111').text(courseName, 0, 310, { align: 'center' });

            // Details
            doc.fontSize(14).fillColor('#333333').text(`Grade: ${grade}`, 100, 400);
            doc.text(`Issue Date: ${issueDate}`, 100, 425);
            doc.text(`Certificate ID: ${certificateId}`, 100, 450);

            // Signatures
            doc.fontSize(14).fillColor('#111111').text('___________________________', 600, 430);
            doc.text(instructorName, 600, 450, { width: 200, align: 'center' });
            doc.fontSize(10).fillColor('#666666').text('Instructor Signature', 600, 465, { width: 200, align: 'center' });

            // QR Code (Placeholder text if we don't fetch and embed the actual image)
            // PDFKit requires fetching the image from URL to embed, for simplicity we print the URL or ID here
            // If qrCodeUrl is local, we could embed it. For now, let's just write the verification link.
            doc.fontSize(10).fillColor('#999999').text(`Verify at: ${qrCodeUrl}`, 0, 520, { align: 'center' });

            doc.end();

            stream.on('finish', () => resolve(filePath));
            stream.on('error', (err) => reject(err));
        } catch (err) {
            reject(err);
        }
    });
};

module.exports = { generatePDF };
