const InternModel = require("../models/InternModel");
const collegeModel = require("../models/CollegeModel");

let nameRegex = /^[a-zA-Z ]+$/;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

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
    res
      .status(201)
      .send({
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
    let queryParam = req.query;

    if (Object.keys(queryParam).length == 0)
      return res
        .status(400)
        .send({
          status: false,
          msg: "Give the data first for fetching document!!!",
        });

    let findCollege = await collegeModel.findOne({
      name: queryParam.collegeName,
    });
    let { name, fullName, logoLink, _id } = findCollege;

    let internCollege = await InternModel.find({
      collegeId: _id,
      isDeleted: false,
    }).select({ name: 1, email: 1, mobile: 1 });

    if (internCollege.length == 0)
      return res
        .status(400)
        .send({
          status: false,
          msg: "Don't have any document with this query data in database.",
        });

    res
      .status(200)
      .send({
        status: true,
        data: { name, fullName, logoLink, interns: internCollege },
      });
  } catch (error) {
    res.status(500).send({ errorType: error.name, errorMsg: error.message });
  }
};

module.exports.createIntern = createIntern;
module.exports.getCollege = getCollege;
