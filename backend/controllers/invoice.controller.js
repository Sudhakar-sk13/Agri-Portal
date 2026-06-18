const db = require("../models/index.js");
const verifyToken = require("../verifyToken.js");
const Invoice = db.invoice;
const client_details = db.client_details;
const sotck_details = db.stock_details;
const fs = require("fs");
var moment = require("moment");
const { ObjectId } = require("mongodb");
const pdf = require("pdf-creator-node");

exports.create_invoice = async (req, res) => {
  let token = verifyToken(req.headers.token);
  if (token != 0) {
    res.status(401).send({ message: token, status: 400 });
  } else {
    const invoice = new Invoice({
      client_id: req.body.client_id,
      stock_id: req.body.stock_id,
      payment_method: req.body.payment_method,
      is_active: 1,
    });
    invoice.save(invoice).then(async (data_temp) => {
      if (data_temp) {
        var data = {};
        var client_data = await client_details.findOne({
          _id: new ObjectId(req.body.client_id),
        });
        data.client_name = client_data.name;
        var stock_data = await sotck_details.aggregate([
          {
            $match: {
              $and: [
                { is_active: 1 },
                { _id: new ObjectId(req.body.stock_id) },
              ],
            },
          },
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
        ]);
        data.stock = stock_data[0].stock_types.name;
        data.stock_descritpion = stock_data[0].stock_type_description;
        data.amount = stock_data[0].estimated_amount;
        data.user_name = stock_data[0].users_details.name;
        const count = await Invoice.countDocuments();
        const invoiceNumber = `INV-${count + 1}`;
        data.invoiceNumber = invoiceNumber;
        var html = await fs.promises.readFile("invoice-template.html", "utf8");
        var options = {
          format: "A4",
          orientation: "portrait",
        };
        var document = {
          html: html,
          data,
          path: "./invoice/" + data_temp._id + ".pdf",
          type: "",
        };

        try {
          await pdf.create(document, options).then((respdf_data) => {
            const id = data_temp._id;
            var data = {
              invoice_path: document.path,
            };
            Invoice.findByIdAndUpdate(id, data, { useFindAndModify: false })
              .then(async (result) => {
                // Update the stock_details document
                await sotck_details.findByIdAndUpdate(
                  req.body.stock_id,
                  { is_sold: 1 },
                  { useFindAndModify: false }
                );

                res.status(200).send({
                  status: 200,
                  message: "Invoice Created successfully",
                  data: data,
                });
              })
              .catch((err) => {
                res.status(201).send({
                  status: 201,
                  message: "User not updated",
                });
              });
          });
        } catch (error) {
          console.error("Error creating PDF:", error);
        }
      } else {
        res.status(201).send({
          status: 201,
          message: "Stock was Not Inserted",
        });
      }
    });
  }
};

exports.get_all_invoice = async (req, res) => {
  let token = verifyToken(req.headers.token);
  if (token != 0) {
    res.status(401).send({ message: token, status: 400 });
  } else {
    const { startDate } = req.query;
    let matchStage = {};

    if (startDate) {
      const dateObj = new Date(startDate);
      if (!isNaN(dateObj.getTime())) {
        matchStage = {
          createdAt: { $gte: dateObj }
        };
      }
    }

    Invoice.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "clients_details",
          localField: "client_id",
          foreignField: "_id",
          as: "clients_details",
        },
      },
      { $unwind: "$clients_details" },
      {
        $lookup: {
          from: "stock_details",
          localField: "stock_id",
          foreignField: "_id",
          as: "stock_details",
        },
      },
      { $unwind: "$stock_details" },
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
