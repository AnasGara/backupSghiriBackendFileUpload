const express = require('express');
const allergieModel = require('../models/Allergie.js');
const allergieRoute = express.Router();

allergieRoute.post('/add', async (req,res) =>{
    //* validate user input
  const {
      name,
    date,
    descrption
  } = req.body;
  const { isValid, errors } = validateAllergieInput(
    name,
    date,
    descrption
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newAllergie = allergieModel({
    name,
    date,
    descrption
  });
  const createdAllergie= await newAllergie.save();
  
  return res.status(201).json({ ArticleStatus: "Created" });

})