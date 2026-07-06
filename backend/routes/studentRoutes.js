const express = require('express');
const router = express.Router();
const { getAllStudents, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const protect = require('../middleware/authMiddleware');

router.get('/', protect, getAllStudents);
router.post('/', protect, createStudent);
router.put('/:id', protect, updateStudent);
router.delete('/:id', protect, deleteStudent);

module.exports = router;
