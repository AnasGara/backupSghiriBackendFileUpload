const express = require('express');
const babyModel = require('../models/babies.js');
const babyRoute = express.Router();
const {
    validateBabyInput,
    validateBottleInput
  } = require("../utils/validator");


//POST: Create a baby
babyRoute.post('/add', async (req, res) => {
    //* validate user input
  const {
    firstName,
    image,
    gender,
    birthday,
    parentID
  } = req.body;
  const { isValid, errors } = validateBabyInput(
    firstName,
    gender,
    birthday
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newBaby = babyModel({
    firstName,
    image,
    gender,
    birthday,
    parentID
  });
  const createdbaby = await newBaby.save();
  
  return res.status(201).json({ baby:{firstName,gender,birthday,parentID}});

})


// get: @get all babies
babyRoute.get("/all", (req, res) => {
    babyModel.find((err, result) => {
         if (err)
             return res.status(500)
                 .json({ errorMsg: "error while listing db posts!!" });
         return res.status(200)
         .json(result);
     });
 });

 
//GET: @GET by name
babyRoute.get("/name/:name", (req, res) => {
    const { name } = req.params;
    babyModel.find({ "firstName": name}, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
        .json(result);
    });
});


// API: update @put
babyRoute.put("/update/:id", async (req, res) => {
  const { description,firstName,gender,birthday,image,babyBottle}=req.body;
  const updatedBaby= await babyModel.findByIdAndUpdate(req.params.id, {description,
    firstName,
    gender,
    birthday: Date(birthday),
    image,babyBottle} );
     if (!updatedBaby){
       return res.status(404).json({errors:"Baby not updated or not there"})
     } 
     return res.status(200).json({userID:updatedBaby._id, ...updatedBaby._doc});
});

//GET: @GET by parentID
babyRoute.get("/parent/:parentID", (req, res) => {
    const { parentID } = req.params;
    babyModel.find({ "parentID": parentID}, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
            .json({ post: result });
    });
});


// API: delete @delete bbay
babyRoute.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    babyModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});


module.exports = babyRoute;