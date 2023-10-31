const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { setUser } = require("../services/authontication");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImageUrl: {
    type: String,
    default: "images/userImage.webp",
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

userSchema.static("matchPassword", async function (email, password) {
  const loginUser = await this.findOne({ email });

  if (!loginUser) throw new Error("User Not Found");
  const loginSalt = loginUser.salt;

  loginHashedPassword = createHmac("sha256", loginSalt)
    .update(password)
    .digest("hex");

  if (loginHashedPassword !== loginUser.password)
    throw new Error("Invaild Password");
  const token = setUser(loginUser);
  return token;
});

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();

  const hashedpassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  console.log(hashedpassword);

  this.salt = salt;
  this.password = hashedpassword;

  next();
});

const User = model("user", userSchema);

module.exports = User;
