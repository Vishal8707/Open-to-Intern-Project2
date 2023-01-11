const InternModel = require("../models/InternModel");
const collegeModel = require("../models/CollegeModel");

let nameRegex = /^[a-zA-Z ]+$/;

let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/;

let mobileRegex =
  /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

const createIntern = async function (req, res) {
  try {
    let data = req.body;
    let { name, email, mobile } = data;
    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide all details" });
    }
    if (!name || name == "") {
      return res
        .status(400)
        .send({ status: false, msg: "please provide the name" });
    }
    if (!nameRegex.test(name)) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter valid name" });
    }
    if (!email || email == "") {
      return res
        .status(400)
        .send({ status: false, msg: "please provide the email" });
    }
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter valid email" });
    }
    if (email) {
      let checkEmail = await InternModel.findOne({ email: email });

      if (checkEmail) {
        return res
          .status(400)
          .send({ status: false, msg: "email is already registere" });
      }
    }
    if (!mobile) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide the Number" });
    }
    let checkmobile = await InternModel.findOne({ mobile: mobile });

    if (checkmobile) {
      return res
        .status(400)
        .send({ status: false, msg: "mobile Number is already registere" });
    }

    if (!mobileRegex.test(mobile)) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter the valid Number" });
    }

    let findCollege = await collegeModel.findOne({ name: data.collegeName });

    if (!findCollege) {
      return res.status(400).send({ status: false, msg: "College Not found" });
    }
    data.collegeId = findCollege._id;
    let createIntern = await InternModel.create(data);
    res.status(201).send({
      status: false,
      msg: "your data is successfully created",
      data: createIntern,
    });
  } catch (error) {
    res.status(500).send({ msg: error.msg });
  }
};
const getCollege = async function (req, res) {
  try {
    let data = req.query.collegeName;

    if (!data || data == "") {
      return res.status(400).send({
        status: false,
        msg: "please enter the college Name",
      });
    }
    if (!nameRegex.test(data)) {
      return res
        .status(400)
        .send({ status: false, msg: "please enter valid collegeName" });
    }

    let findCollege = await collegeModel.findOne({name: data,isDeleted: false,});

    if (!findCollege) {
      return res.status(404).send({status: false,msg: "sorry no collage data found with this collegeName" });
    }
    let{name,fullName,logoLink,_id} = findCollege

    let internCollege = await InternModel.find({
      collegeId: _id,
      isDeleted: false,
    }).select({ name: 1, email: 1, mobile: 1 });
  
    if (internCollege.length == 0)
      return res.status(400).send({
        status: false,
        msg: "Don't have any document with this query data in database.",
      });
    if (internCollege)
      return res.status(200).send({
        status: true,
        data: { name, fullName, logoLink, interns: internCollege },
      });
  } catch (error) {
    res.status(500).send({ errorType: error.name, errorMsg: error.message });
  }
};

module.exports.createIntern = createIntern;
module.exports.getCollege = getCollege;
