const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());

const userRoute = require("./router/userRouter");
const followerRoute = require("./router/followerRoute");

app.use("/user", userRoute);
app.use("/follow", followerRoute);

(async function () {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect to mongodb");
  } catch (err) {
    console.log(err);
  }
})();

app.listen(4000, () => console.log("Listening to port"));
