const express = require('express');
const weightModel = require('../models/weight.js');
const weightRoute = express.Router();
const {
    validateWeightInput
  } = require("../utils/validator");

/*measure,
    date,
    babyID/*/
weightRoute.post('/add', async (req,res) =>{
    //* validate user input
  const {
    measure,
    date,
    babyID
  } = req.body;
  const { isValid, errors } = validateWeightInput(
    measure,
    date,
    babyID
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newWeight = weightModel({
    measure,
    date,
    babyID
  });
  const createdWeight = await newWeight.save();
  
  return res.status(201).json({ WeightStatus: "Created" });

})

// get: @get all weights
weightRoute.get("/all", (req, res) => {
    weightModel.find((err, result) => {
         if (err)
             return res.status(500)
                 .json({ errorMsg: "error while listing db posts!!" });
         return res.status(200)
         .json(result);
     });
 });   

 
  //GET: @GET weight by babyID
  weightRoute.get("/find/:babyID", (req, res) => {
    const { babyID } = req.params;
    weightModel.find({ "babyID": babyID}, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
        .json(result);
    });
});

// API: update @put
weightRoute.put("/update/:id", async (req, res) => {
    const { date,measure }=req.body;
    const updatedWeight= await weightModel.findByIdAndUpdate(req.params.id, {
        measure,
      date: Date(date)
      } );
       if (!updatedWeight){
         return res.status(404).json({errors:"Weight not updated or not there"})
       } 
       return res.status(200).json({userID:updatedWeight._id, ...updatedWeight._doc});
  });
  
  
// @delete: delete  food
weightRoute.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    weightModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});
module.exports = weightRoute;