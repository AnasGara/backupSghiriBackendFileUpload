const express = require('express');
const tempModel = require('../models/temperature.js');
const tempRoute = express.Router();
const {
    validateTempInput
  } = require("../utils/validator")

  tempRoute.post('/add', async (req,res) =>{
    //* validate user input
  const {
    measure,
    date,
    babyID
  } = req.body;
  const { isValid, errors } = validateTempInput(
    measure,
    date,
    babyID
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newTemp = tempModel({
    measure,
    date,
    babyID
  });
  const createdTemp = await newTemp.save();
  
  return res.status(201).json({ TempStatus: "Created" });

})



// get: @get all temps
tempRoute.get("/all", (req, res) => {
  tempModel.find((err, result) => {
       if (err)
           return res.status(500)
               .json({ errorMsg: "error while listing db posts!!" });
       return res.status(200)
       .json(result);
   });
});   


//GET: @GET height by babyID
tempRoute.get("/find/:babyID", (req, res) => {
  const { babyID } = req.params;
  tempModel.find({ "babyID": babyID}, (err, result) => {
      if (!result)
          return res.status(400)
              .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
      return res.status(200)
      .json(result);
  });
});

// API: update @put
tempRoute.put("/update/:id", async (req, res) => {
  const { date,measure }=req.body;
  const updatedTemp= await tempModel.findByIdAndUpdate(req.params.id, {
      measure,
    date: Date(date)
    } );
     if (!updatedTemp){
       return res.status(404).json({errors:"Temp not updated or not there"})
     } 
     return res.status(200).json({userID:updatedTemp._id, ...updatedTemp._doc});
});


// @delete: delete  food
tempRoute.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  tempModel.findByIdAndDelete({ _id: id }, (err, result) => {
      if (err)
          return res.status(400)
              .json({ errorMsg: `id: '${id}' doesn't exist!!`});
      return res.status(200)
          .json({ message: `post with id: '${id}' deleted`});
  });
});

  module.exports = tempRoute;