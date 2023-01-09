const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/CollegeController.js');

router.post('/functionup/colleges', collegeController.createCollegeData)

module.exports = router