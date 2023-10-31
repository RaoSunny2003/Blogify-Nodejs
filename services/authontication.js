const jwt = require("jsonwebtoken");
const secretKey = "Vlogify";

function setUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, secretKey);
  return token;
}

function getUser(token) {
  const userInfo = jwt.verify(token, secretKey);
  return userInfo;
}

module.exports = { setUser, getUser };
