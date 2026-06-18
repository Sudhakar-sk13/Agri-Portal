const db = require("../models/index.js");
const verifyToken = require("../verifyToken.js");
const Client_Details = db.client_details;

exports.create_client = (req, res) => {
  let token = verifyToken(req.headers.token);
  if (token != 0) {
    res.status(401).send({ message: token, status: 400 });
  } else {
    const client_details = new Client_Details({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      phone_number: req.body.phone_number,
      address: req.body.address,
      gender: req.body.gender,
      is_active: 1,
    });
    client_details.save(client_details).then((data_temp) => {
      if (data_temp) {
        res.status(200).send({
          status: 200,
          message: "Client was Inserted successfully!",
        });
      } else {
        res.status(201).send({
          status: 201,
          message: "Client was Not Inserted",
        });
      }
    });
  }
};

exports.get_all_clients = (req, res) => {
  let token = verifyToken(req.headers.token);
  if (token != 0) {
    res.status(401).send({ message: token, status: 400 });
  } else {
    const page = 1; // specify the page number
    const pageSize = 10; // specify the number of documents per page
    Client_Details.aggregate([
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

exports.update_clients = (req, res) => {
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
      gender: req.body.gender,
    };
    Client_Details.findByIdAndUpdate(id, data, { useFindAndModify: false })
      .then((result) => {
        res.status(200).send({
          status: 200,
          message: "Client updated successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.status(201).send({
          status: 201,
          message: "Client not updated",
        });
      });
  }
};

exports.delete_clients = (req, res) => {
  let token = verifyToken(req.headers.token);
  if (token != 0) {
    res.status(401).send({ message: token, status: 400 });
  } else {
    const id = req.params.id;
    Client_Details.findByIdAndUpdate(id, {
      is_active: 0,
      updated_by: req.body.login_user_id,
      useFindAndModify: false,
    }).then((data) => {
      if (data) {
        res.status(200).send({
          status: 200,
          message: "Client deleted successfully",
        });
      }
    });
  }
};
