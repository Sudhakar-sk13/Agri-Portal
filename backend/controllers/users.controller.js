const multer = require("multer");
const path = require("path");
const db = require("../models/index.js");
const verifyToken = require("../verifyToken.js");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const User_Details = db.user_details;
const stock_type = db.stock_type;

exports.create_user = (req, res) => {
  let token = verifyToken(req.headers.token);
  if (token != 0) {
    res.status(401).send({ message: token, status: 400 });
  } else {
    const user_details = new User_Details({
      name: req.body.name,
      age: req.body.age,
      phone_number: req.body.phone_number,
      address: req.body.address,
      description: req.body.description,
      gender: req.body.gender,
      is_active: 1,
    });
    user_details.save(user_details).then((data_temp) => {
      if (data_temp) {
        res.status(200).send({
          status: 200,
          message: "User was Inserted successfully!",
        });
      } else {
        res.status(201).send({
          status: 201,
          message: "User was Not Inserted",
        });
      }
    });
  }
};

exports.get_all_users = (req, res) => {
  let token = verifyToken(req.headers.token);
  if (token != 0) {
    res.status(401).send({ message: token, status: 400 });
  } else {
    const page = 1; // specify the page number
    const pageSize = 10; // specify the number of documents per page
    User_Details.aggregate([
      { $match: { $and: [{ is_active: 1 }] } },
      {
        $sort: { created_at: -1 },
      },
      { $skip: (page - 1) * pageSize },
      { $limit: pageSize },
    ]).then((data) => {
      if (data) {
        res.status(200).send({
          status: 200,
          data: data,
        });
      } else {
        res.status(201).send({
          status: 201,
          message: "No Records Found",
        });
      }
    });
  }
};

exports.update_users = (req, res) => {
  let token = verifyToken(req.headers.token);
  if (token != 0) {
    res.status(401).send({ message: token, status: 400 });
  } else {
    const id = req.params.id;
    var data = {
      name: req.body.name,
      age: req.body.age,
      phone_number: req.body.phone_number,
      address: req.body.address,
      description: req.body.description,
      gender: req.body.gender,
      is_active: 1,
    };
    User_Details.findByIdAndUpdate(id, data, { useFindAndModify: false })
      .then((result) => {
        res.status(200).send({
          status: 200,
          message: "User updated successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.status(201).send({
          status: 201,
          message: "User not updated",
        });
      });
  }
};

exports.delete_users = (req, res) => {
  let token = verifyToken(req.headers.token);
  if (token != 0) {
    res.status(401).send({ message: token, status: 400 });
  } else {
    const id = req.params.id;
    User_Details.findByIdAndUpdate(id, {
      is_active: 0,
      useFindAndModify: false,
    }).then((data) => {
      if (data) {
        res.status(200).send({
          status: 200,
          message: "User deleted successfully",
        });
      }
    });
  }
};