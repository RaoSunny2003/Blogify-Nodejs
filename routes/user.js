const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  await User.create({
    username,
    email,
    password,
  });
  res.redirect("/");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPassword(email, password);
    console.log("Token", token);
    res.cookie("token", token).redirect("/");
  } catch (err) {
    return res.render("login", {
      error: "Invaild Email or Password ",
    });
  }
});

module.exports = router;
