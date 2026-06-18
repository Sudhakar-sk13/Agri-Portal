module.exports = (app) => {
  const login = require("../controllers/login.controller.js");
  app.post("/api/login", login.login);
  app.post("/api/validate-otp", login.validateOtp);
};
