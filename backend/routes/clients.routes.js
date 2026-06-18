module.exports = (app) => {
  const clients = require("../controllers/clients.controller.js");

  app.post("/api/create-client", clients.create_client);

  app.get("/api/get-all-clients", clients.get_all_clients);

  app.put("/api/update-clients/:id", clients.update_clients);

  app.delete("/api/delete-clients/:id", clients.delete_clients);
};
