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
  res.render("signup");
});

module.exports = router;
