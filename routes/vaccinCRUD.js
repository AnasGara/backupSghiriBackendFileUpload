const express = require('express');
const vaccinModel = require('../models/vaccin.js');
const vaccinRoute = express.Router();
const {
    validateVaccinInput
  } = require("../utils/validator");

  vaccinRoute.post('/add', async (req,res) =>{
    //* validate user input
  const {
    vaccinName,
    date,
    babyID
  } = req.body;
  const { isValid, errors } = validateVaccinInput(
    vaccinName,
    date,
    babyID
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newVaccin = vaccinModel({
    vaccinName,
    date,
    babyID
  });
  const createdVaccin = await newVaccin.save();
  
  return res.status(201).json({ VaccinStatus: "Created" });

})

// get: @get all heights
vaccinRoute.get("/all", (req, res) => {
    vaccinModel.find((err, result) => {
         if (err)
             return res.status(500)
                 .json({ errorMsg: "error while listing db posts!!" });
         return res.status(200)
         .json(result);
     });
 });   


  //GET: @GET height by babyID
  vaccinRoute.get("/find/:babyID", (req, res) => {
    const { babyID } = req.params;
    vaccinModel.find({ "babyID": babyID}, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
        .json(result);
    });
});


// API: update @put
vaccinRoute.put("/update/:id", async (req, res) => {
    const { date,vaccinName }=req.body;
    const updatedVaccin= await vaccinModel.findByIdAndUpdate(req.params.id, {
        vaccinName,
      date: Date(date)
      } );
       if (!updatedVaccin){
         return res.status(404).json({errors:"Vaccin not updated or not there"})
       } 
       return res.status(200).json({userID:updatedVaccin._id, ...updatedVaccin._doc});
  });
   
// @delete: delete  food
vaccinRoute.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    vaccinModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});
  module.exports = vaccinRoute;