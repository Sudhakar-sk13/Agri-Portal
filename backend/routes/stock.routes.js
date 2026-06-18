module.exports = (app) => {
  const stocks = require("../controllers/stocks.controller.js");

  app.post("/api/create-stock", stocks.create_stock);

  app.get("/api/get-all-stocks", stocks.get_all_stocks);

  app.put("/api/update-stocks/:id", stocks.update_stocks);

  app.delete("/api/delete-stocks/:id", stocks.delete_stocks);

  app.get("/api/get-stock-type", stocks.get_stock_type);

  app.get("/api/get-unsold-stocks",stocks.get_all_unsold_stocks);
};
