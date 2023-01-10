const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/CollegeController.js');
const InternController = require("../controllers/InernController")

router.post('/functionup/colleges', collegeController.createCollegeData)
router.post('/functionup/interns', InternController.createIntern)
router.get('/functionup/collegeDetails', InternController.getCollege)


module.exports = router