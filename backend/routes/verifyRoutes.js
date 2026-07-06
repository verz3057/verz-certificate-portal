const express = require('express');
const router = express.Router();
const { verifyCertificate } = require('../controllers/verifyController');

// GET /api/verify/:rollNumber
router.get('/:rollNumber', verifyCertificate);

module.exports = router;
