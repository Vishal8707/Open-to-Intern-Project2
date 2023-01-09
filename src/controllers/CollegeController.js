const collegeModel = require("../models/CollegeModel");

const createCollegeData = async (req,res) => {
    let data = req.body
    let saveData = await collegeModel.create(data)
    res.status(201).send({status:true, data: saveData})
}

module.exports.createCollegeData = createCollegeData