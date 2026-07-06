const { Student } = require('../models');

// GET /api/verify/:rollNumber
const verifyCertificate = async (req, res) => {
    try {
        const { rollNumber } = req.params;

        const student = await Student.findOne({
            where: { roll_number: rollNumber }
        });

        if (!student) {
            return res.status(404).json({ message: 'Certificate Not Found' });
        }

        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    verifyCertificate
};
