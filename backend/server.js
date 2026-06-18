const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models/index.js");

app.use("/uploads", express.static("./uploads"));
app.use("/invoice", express.static("./invoice"));
app.use(express.json());
app.use(cors());

require("./routes/login.routes")(app);
require("./routes/users.routes.js")(app);
require("./routes/stock.routes.js")(app);
require("./routes/clients.routes.js")(app);
require("./routes/invoice.routes.js")(app);

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
app.listen(3011, () => {
  console.log(`Server is running on port 3011.`);
});
