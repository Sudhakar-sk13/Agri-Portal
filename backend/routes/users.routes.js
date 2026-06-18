module.exports = (app) => {
  const users = require("../controllers/users.controller.js");

  app.post("/api/create-user", users.create_user);

  app.get("/api/get-all-users", users.get_all_users);

  app.put("/api/update-users/:id", users.update_users);

  app.delete("/api/delete-users/:id", users.delete_users);

};
