const collegeModel = require("../models/CollegeModel");

let nameRegex = /^[a-zA-Z ]+$/;
let logoLinkRrgex =  /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i

const createCollegeData = async (req, res) => {
    try {
        let data = req.body
        let { name, fullName, logoLink } = data
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, msg: "please provide all details" })
        }
        
        if (!name || name == "") {
            return res.status(400).send({ status: false, msg: "please provide the name" })
        }
        if (name) {
            let checkname = await collegeModel.findOne({ name: name });

            if (checkname) {
                return res.status(400).send({ status: false, msg: "name is already registere" })
            }
        }
        if (!nameRegex.test(name)) {
            return res.status(400).send({ status: false, msg: "please enter valid name" })
        }
        if(!fullName || fullName == ""){
            return res.status(400).send({status:false, msg :"please provide the fullName"})
        }
        if (!nameRegex.test(fullName)) {
            return res.status(400).send({ status: false, msg: "please enter valid fullName" })
        }
        if (!logoLink || logoLink == "") {
            return res.status(400).send({ status: false, msg: "please provide the name" })
        }
        if (!logoLinkRrgex.test(logoLink)) {
            return res.status(400).send({ status: false, msg: "please enter valid fullName" })
        }

        let saveData = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: saveData })
    }
    catch (error) {
     res.status(500).send({ msg: error.msg })
    }
}

module.exports.createCollegeData = createCollegeData