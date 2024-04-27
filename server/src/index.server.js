const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const env = require("dotenv");

//Server Initialization
const app = express();

//Configuring Environment Variable
env.config();

//Route Configuration
const userRoute = require("./routes/user");
const kitchenRoute = require("./routes/kitchen");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

//Database Initialization
mongoose
  .connect(
    `mongodb+srv://admin:${process.env.DB_PASS}@project299.ftgozek.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Server Configuration
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use("/api/v1", userRoute);
app.use("/api/v1", kitchenRoute);
app.use("/api/v1", cartRoute);
app.use("/api/v1", orderRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server Running On PORT ${process.env.PORT}`);
});
