const express = require('express');
const croissanceModel = require('../models/croissance.js');
const croissanceRoute = express.Router();
const {
  validateCroissanceInput
} = require("../utils/validator");

croissanceRoute.post('/add', async (req,res) =>{
    //* validate user input
  const {
    poids,
    taille,
    perimetre,
    time,
    date,
    babyId
  } = req.body;
  const { isValid, errors } = validateCroissanceInput(
    poids,
    taille,
    perimetre,
    time,
    date,
    babyId
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newCroissance = croissanceModel({
    poids,
    taille,
    perimetre,
    time,
    date,
    babyId
  });
  const createdCroissance= await newCroissance.save();
  
  return res.status(201).json({ CroissanceStatus: "Created" });

})

// get: @get all Croissance
croissanceRoute.get("/all", (req, res) => {
    croissanceModel.find((err, result) => {
       if (err)
           return res.status(500)
               .json({ errorMsg: "error while listing db posts!!" });
       return res.status(200)
           
          .json(result);
   });
});   

//GET: @GET by ID 605dc92f9d74634dd8cccdcb
croissanceRoute.get("/:id", (req, res) => {
const { id } = req.params;
croissanceModel.findById(id, (err, result) => {
    if (!result)
        return res.status(400)
            .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
    return res.status(200)
        .json(result);
      });
});


// API: update @put
croissanceRoute.put("/update/:id", async (req, res) => {
  const { 
    poids,
    taille,
    perimetre,
    time,
    date,
    babyId
  }=req.body;
  const updatedCroissance= await croissanceModel.findByIdAndUpdate(req.params.id, {
    poids,
    taille,
    perimetre,
    time,
    date,
    babyId
    } );
     if (!updatedCroissance){
       return res.status(404).json({errors:"Croissance not updated or not there"})
     } 
     return res.status(200).json({userID:updatedCroissance._id, ...updatedCroissance._doc});
});
// @delete: delete  
croissanceRoute.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  croissanceModel.findByIdAndDelete({ _id: id }, (err, result) => {
      if (err)
          return res.status(400)
              .json({ errorMsg: `id: '${id}' doesn't exist!!`});
      return res.status(200)
          .json({ message: `post with id: '${id}' deleted`});
  });
});

//get by date "12/08/2021"

croissanceRoute.post("/date/:id", (req, res) => {
  const { date } =  req.body;
  const { id } = req.params;
  croissanceModel.find({ "date": date, "babyId": id}, (err, result) => {
      if (!result)
          return res.status(400)
              .json({ errorMsg: `post with '${date}' id doesn't exist!!` });
      return res.status(200)
      .json(result);
  });
});


module.exports = croissanceRoute;