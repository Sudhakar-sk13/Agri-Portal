module.exports = (app) => {
  const invoice = require("../controllers/invoice.controller.js");

  app.post("/api/create-invoice", invoice.create_invoice);
  app.get("/api/get-all-invoice", invoice.get_all_invoice);
};
