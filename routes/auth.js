const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const authRoute = express.Router();
const {
  validateSignupInput,
  validateSignInInput,
} = require("../utils/validator");

authRoute.get("/hello", (req, res) => {
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.send('{"hello world":"wa"}')
})

authRoute.post("/signup", async (req, res) => {
  //* validate user input
  const x={
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
  } = req.body;
  console.log("hethom el values ow"+firstName+lastName+email+ phoneNumber+ password+confirmPassword);
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

  return res.status(201).json({ user: {token, userID: createdUser._id } });
  return res.status(201).json(
    { user: { token, userID: createdUser._id, firstName,lastName, email, phoneNumber, password}});

});

authRoute.post("/login", async (req, res) => {
  //* validate user input
  const { email, password } = req.body;
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
    return res.status(201).json({ user: { token, userID: user._id } });
});

// 3ibara bch t5alaha public bch tnajm test3mlha  

module.exports = authRoute;
