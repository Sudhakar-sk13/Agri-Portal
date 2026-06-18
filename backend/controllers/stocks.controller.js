const multer = require("multer");
const path = require("path");
const db = require("../models/index.js");
const verifyToken = require("../verifyToken.js");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const Stock_Details = db.stock_details;
const stock_type = db.stock_type;

exports.create_stock = (req, res) => {
  let token = verifyToken(req.headers.token);
  if (token != 0) {
    res.status(401).send({ message: token, status: 400 });
  } else {
    const stock_details = new Stock_Details({
      user_id: req.body.user_id,
      stock_type: req.body.stock_type,
      stock_type_description: req.body.stock_type_description,
      estimated_amount: req.body.estimated_amount,
      total_kg: req.body.total_kg,
      is_sold: 0,
      is_active: 1,
    });
    stock_details.save(stock_details).then((data_temp) => {
      if (data_temp) {
        res.status(200).send({
          status: 200,
          message: "Stock was Inserted successfully!",
        });
      } else {
        res.status(201).send({
          status: 201,
          message: "Stock was Not Inserted",
        });
      }
    });
  }
};

exports.get_all_stocks = (req, res) => {
  let token = verifyToken(req.headers.token);
  if (token != 0) {
    res.status(401).send({ message: token, status: 400 });
  } else {
    const page = 1; // specify the page number
    const pageSize = 10; // specify the number of documents per page
    Stock_Details.aggregate([
      { $match: { $and: [{ is_active: 1 }] } },
      {
        $lookup: {
          from: "users_details",
          localField: "user_id",
          foreignField: "_id",
          as: "users_details",
        },
      },
      { $unwind: "$users_details" },
      {
        $lookup: {
          from: "stock_types",
          localField: "stock_type",
          foreignField: "_id",
          as: "stock_types",
        },
      },
      { $unwind: "$stock_types" },
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

exports.update_stocks = (req, res) => {
  let token = verifyToken(req.headers.token);
  if (token != 0) {
    res.status(401).send({ message: token, status: 400 });
  } else {
    const id = req.params.id;
    var data = {
      user_id: req.body.user_id,
      stock_type: req.body.stock_type,
      stock_type_description: req.body.stock_type_description,
      estimated_amount: req.body.estimated_amount,
      total_kg: req.body.total_kg,
    };
    Stock_Details.findByIdAndUpdate(id, data, { useFindAndModify: false })
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

exports.delete_stocks = (req, res) => {
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

exports.get_stock_type = (req, res) => {
  let token = verifyToken(req.headers.token);
  if (token != 0) {
    res.status(401).send({ message: token, status: 400 });
  } else {
    stock_type.find({ is_active: 1 }).then((data) => {
      if (data.length == 0) {
        res.status(201).send({
          status: 201,
          message: "No Records Found",
        });
      } else {
        res.status(200).send({
          status: 200,
          data: data,
        });
      }
    });
  }
};

exports.get_all_unsold_stocks = (req, res) => {
  let token = verifyToken(req.headers.token);
  if (token != 0) {
    res.status(401).send({ message: token, status: 400 });
  } else {
    Stock_Details.aggregate([
      { $match: { $and: [{ is_sold: 0 }] } },
      {
        $lookup: {
          from: "users_details",
          localField: "user_id",
          foreignField: "_id",
          as: "users_details",
        },
      },
      { $unwind: "$users_details" },
      {
        $lookup: {
          from: "stock_types",
          localField: "stock_type",
          foreignField: "_id",
          as: "stock_types",
        },
      },
      { $unwind: "$stock_types" },
      {
        $sort: { created_at: -1 },
      },
    ]).then((data) => {
      if (data.length == 0) {
        res.status(201).send({
          status: 201,
          message: "No Records Found",
        });
      } else {
        res.status(200).send({
          status: 200,
          data: data,
        });
      }
    });
  }
};
