const { Student } = require('../models');

// GET /api/students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll({
            order: [['created_at', 'DESC']]
        });
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// POST /api/students
const createStudent = async (req, res) => {
    try {
        const { roll_number, student_name, father_name, college_name, course_name, certificate_status } = req.body;
        
        if (!roll_number || !student_name || !father_name || !college_name || !course_name) {
            return res.status(400).json({ message: 'All fields except certificate_status are required' });
        }

        const existing = await Student.findOne({ where: { roll_number } });
        if (existing) {
            return res.status(400).json({ message: 'Roll Number already exists' });
        }

        const student = await Student.create({
            roll_number,
            student_name,
            father_name,
            college_name,
            course_name,
            certificate_status: certificate_status || 'Verified'
        });

        res.status(201).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// PUT /api/students/:id
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { roll_number, student_name, father_name, college_name, course_name, certificate_status } = req.body;

        const student = await Student.findByPk(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        if (roll_number && roll_number !== student.roll_number) {
            const existing = await Student.findOne({ where: { roll_number } });
            if (existing) {
                return res.status(400).json({ message: 'Roll Number already in use' });
            }
        }

        await student.update({
            roll_number: roll_number || student.roll_number,
            student_name: student_name || student.student_name,
            father_name: father_name || student.father_name,
            college_name: college_name || student.college_name,
            course_name: course_name || student.course_name,
            certificate_status: certificate_status || student.certificate_status
        });

        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// DELETE /api/students/:id
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByPk(id);
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        await student.destroy();
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent
};
