const express = require("express");
const path = require("path");
const app = express();
const userRoute = require("./routes/user");
const { connect } = require("mongoose");

const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connect("mongodb://127.0.0.1:27017/blogify")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error", err));

app.use("/user", userRoute);

app.get("/", (req, res) => {
  console.log("OK!");
  res.render("home");
});
app.listen(3000, () => console.log(`Server is running on port no. ${PORT}`));
