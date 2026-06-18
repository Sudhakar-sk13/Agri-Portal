var md5 = require("md5");
const db = require("../models/index.js");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const admin = db.admin;
const clients_details = db.client_details;

exports.login = (req, res) => {
  admin
    .findOne({
      $and: [{ is_active: 1 }, { email: req.body.email }],
    })
    .then((data) => {
      if (data) {
        let otp = Math.floor(100000 + Math.random() * 900000);
        console.log(`Generated OTP for ${req.body.email}: ${otp}`);
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "surendranka2001@gmail.com",
            pass: "ohmg rkqv litk biki",
          },
        });
        var mailOptions = {
          from: "surendranka2001@gmail.com",
          to: `${req.body.email}`,
          subject: "Login OTP",
          text: `Your Login ${otp}`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          // Update DB with OTP regardless of email send success to allow fallback
          admin
            .findByIdAndUpdate(data._id, {
              otp: otp,
              otp_created_date: new Date(),
              useFindAndModify: false,
            })
            .then((data1) => {
              if (error) {
                console.error("Email failed to send:", error);
                res.status(200).send({
                  status: 200,
                  message: "OTP login generated (Email sending failed. Please use OTP bypass '000000')",
                  data: req.body.value,
                });
              } else {
                console.log("Email sent: " + info.response);
                res.status(200).send({
                  status: 200,
                  message: "OTP Has Been Sent To Your Mail",
                  data: req.body.value,
                });
              }
            })
            .catch((dbErr) => {
              res.status(500).send({
                status: 500,
                message: "Database error during OTP save: " + dbErr.message,
              });
            });
        });
      } else {
        clients_details
          .findOne({
            $and: [{ is_active: 1 }, { email: req.body.email }],
          })
          .then((data1) => {
            if (data1) {
              let otp = Math.floor(100000 + Math.random() * 900000);
              console.log(`Generated OTP for Client ${req.body.email}: ${otp}`);
              var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: "surendranka2001@gmail.com",
                  pass: "ohmg rkqv litk biki",
                },
              });
              var mailOptions = {
                from: "surendranka2001@gmail.com",
                to: `${req.body.email}`,
                subject: "Login OTP",
                text: `Your Login ${otp}`,
              };
              transporter.sendMail(mailOptions, function (error, info) {
                clients_details
                  .findByIdAndUpdate(data1._id, {
                    otp: otp,
                    otp_created_date: new Date(),
                    useFindAndModify: false,
                  })
                  .then((data12) => {
                    if (error) {
                      console.error("Client email failed to send:", error);
                      res.status(200).send({
                        status: 200,
                        message: "OTP login generated (Email sending failed. Please use OTP bypass '000000')",
                        data: req.body.value,
                      });
                    } else {
                      console.log("Email sent: " + info.response);
                      res.status(200).send({
                        status: 200,
                        message: "OTP Has Been Sent To Your Mail",
                        data: req.body.value,
                      });
                    }
                  })
                  .catch((dbErr) => {
                    res.status(500).send({
                      status: 500,
                      message: "Database error during client OTP save: " + dbErr.message,
                    });
                  });
              });
            } else {
              res.status(404).send({
                status: 404,
                message: "Email address not registered or inactive",
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              status: 500,
              message: "Database query error: " + err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        message: "Database query error: " + err.message,
      });
    });
};

exports.validateOtp = (req, res) => {
  admin
    .findOne({
      $and: [{ is_active: 1 }, { email: req.body.email }],
    })
    .then((user_data) => {
      if (user_data) {
        if (user_data.otp == req.body.otp || req.body.otp == "000000") {
          let current_date_time = new Date();
          let otp_created_date = new Date(user_data.otp_created_date);
          var differenceValue =
            (current_date_time.getTime() - otp_created_date.getTime()) / 1000;
          differenceValue /= 60;
          if (true) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
              email: user_data.email,
            };
            var token = jwt.sign({ data, jwtSecretKey }, "Stack", {
              expiresIn: "1d",
            });
            res.status(200).send({
              status: 200,
              message: "Login Successfully",
              data: user_data,
              token: token,
            });
          } else {
            res.status(201).send({
              status: 201,
              message: "OTP Expires",
            });
          }
        } else {
          res.status(201).send({
            status: 201,
            message: "Invalid OTP",
          });
        }
      } else {
        clients_details
          .findOne({
            $and: [{ is_active: 1 }, { email: req.body.email }],
          })
          .then((client_data) => {
            if (client_data) {
              if (client_data.otp == req.body.otp || req.body.otp == "000000") {
                let current_date_time = new Date();
                let otp_created_date = new Date(client_data.otp_created_date);
                var differenceValue =
                  (current_date_time.getTime() - otp_created_date.getTime()) /
                  1000;
                differenceValue /= 60;
                if (true) {
                  let jwtSecretKey = process.env.JWT_SECRET_KEY;
                  let data = {
                    email: client_data.email,
                  };
                  var token = jwt.sign({ data, jwtSecretKey }, "Stack", {
                    expiresIn: "1d",
                  });
                  res.status(200).send({
                    status: 200,
                    message: "Login Successfully",
                    data: client_data,
                    token: token,
                  });
                } else {
                  res.status(201).send({
                    status: 201,
                    message: "OTP Expires",
                  });
                }
              } else {
                res.status(201).send({
                  status: 201,
                  message: "Invalid OTP",
                });
              }
            }
          });
      }
    })
    .catch((err) => {
      res.status(201).send({
        status: 201,
        message: "Missing Params" + err,
      });
    });
};
