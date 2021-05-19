const express = require('express');
const rappelModel = require('../models/rappel.js');
const rappelRoute = express.Router();
const {
    validateRappelInput
  } = require("../utils/validator");

  rappelRoute.post('/add', async (req,res) =>{
    //* validate user input
  const {
    title,
    desc,
    date,
    parentID
  } = req.body;
  const { isValid, errors } = validateRappelInput(
    title,
    desc,
    date,
    parentID
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newRappel = rappelModel({
    title,
    date,
    desc,
    parentID
  });
  const createdRappel= await newRappel.save();
  
  return res.status(201).json({RappelStatus: "Created" });

})


// get: @get all rappels
rappelRoute.get("/all", (req, res) => {
    rappelModel.find((err, result) => {
         if (err)
             return res.status(500)
                 .json({ errorMsg: "error while listing db posts!!" });
         return res.status(200)
         .json(result);
     });
 });   


  //GET: @GET rappels by parent
  rappelRoute.get("/find/:parentID", (req, res) => {
    const { parentID } = req.params;
    rappelModel.find({ "parentID": parentID}, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
        .json(result);
    });
});


// API: update @put
rappelRoute.put("/update/:id", async (req, res) => {
    const { 
        title,
        desc,
        date 
    }=req.body;
    const updatedRappel= await rappelModel.findByIdAndUpdate(req.params.id, {
        title,
      desc, 
      date
      } );
       if (!updatedRappel){
         return res.status(404).json({errors:"Rappel not updated or not there"})
       } 
       return res.status(200).json({userID:updatedRappel._id, ...updatedRappel._doc});
  });
   
// @delete: delete  food
rappelRoute.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    rappelModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});

  module.exports = rappelRoute;