const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const authRoute = express.Router();
const {
  validateSignupInput,
  validateSignInInput,
} = require("../utils/validator");
const { v4: uuid } = require("uuid");
const sendEmail = require("../utils/sendEmail");
 
authRoute.get("/hello", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
 
  res.send('{"hello world":"wa"}');
});
 
authRoute.post("/signup", async (req, res) => {
  //* validate user input
  const { firstName, lastName, email, phoneNumber, password, confirmPassword } =
    req.body;
 
  const { isValid, errors } = validateSignupInput(
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
 
  //* check if user already exist in the db
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(400).json({ errors: { user: "user already exist" } });
  }
 
  //* generate hashed password
  const SALT = process.env.SALT;
  const hashedPassword = await bcrypt.hash(password, 12);
 
  //* create new user in the db
  const newUser = userModel({
    firstName,
    lastName,
    email,
    phoneNumber,
    password: hashedPassword,
  });
 
  const createdUser = await newUser.save();
 
  //* generate jwt
  const JWT_PASSWORD = process.env.JWT_PASSWORD;
  const token = await jwt.sign({ id: createdUser._id, email }, JWT_PASSWORD);
 
  return res.status(201).json({  token, userID: createdUser._id, email,firstName,lastName,phoneNumber } );
});
 
authRoute.post("/login", async (req, res) => {
  //* validate user input
  const { email, password } = req.body;
 
  /*
      email = req.body.user;
      password = req.body.password;
  */
  console.log("1");
  const { isValid, errors } = validateSignInInput(email, password);
  if (!isValid) {
    return res.status(400).json({ errors });
  }
 
  //* check if user already exist in the db
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ errors: { user: "user doesn't exist" } });
  }
 
  //* verify password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ errors: { user: "invalid credentials" } });
  }
 
  //* generate jwt
  const JWT_PASSWORD = process.env.JWT_PASSWORD;
 
  const token = await jwt.sign({ id: user._id, email }, JWT_PASSWORD);
  return res.status(201).json({ token, userID: user._id, email });
});
 
authRoute.post("/requestReset", async (req, res) => {
  const { email } = req.body;
  const resetPasswordCode = uuid();
  const resetPasswordCodeExpiry = new Date(
    Date.now() + parseInt(process.env.RESET_PASSWORD_CODE_EXPIRY) * 1000
  );
 
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      error: { email: "user doesn't exist in the db -- check your email" },
    });
  }
 
  const updatedUser = await userModel.updateOne(
    { email },
    {
      resetPasswordCode,
      resetPasswordCodeExpiry,
    }
  );
 
  await sendEmail(
    email,
    "baby care reset password code",
    `hello ${email} this is your code ${resetPasswordCode}`
  );
 
  return res.status(200).json({ expiry: resetPasswordCodeExpiry });
});
 
authRoute.post("/resetPassword", async (req, res) => {
  const { email, password, resetCode } = req.body;
  // TODO: check user input
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      errors: { email: "user doesn't exist in the db -- check your email" },
    });
  }
 
  if (user.resetPasswordCode !== resetCode) {
    return res.status(400).json({
      errors: {
        resetCode: "invalid reset code",
      },
    });
  }
 
  if (Date.now() > user.resetPasswordCodeExpiry) {
    return res.status(400).json({
      errors: {
        resetCode: "expired reset code",
      },
    });
  }
 
  const newHashedPassword = await bcrypt.hash(password, 12);
  const updatedUser = await userModel.updateOne(
    { email },
    {
      password: newHashedPassword,
    }
  );
 
  return true;
});
 
module.exports = authRoute;
 

