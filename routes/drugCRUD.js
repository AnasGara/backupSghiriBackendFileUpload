const express = require('express');
const drugModel = require('../models/drug.js');
const drugRoute = express.Router();
const {
    validateDrugInput
  } = require("../utils/validator");


  // @POST: Create a drug
  drugRoute.post('/add', async (req,res) =>{
    //* validate user input
  const {
    name,
    date,
    babyID
  } = req.body;
  const { isValid, errors } = validateDrugInput(
    name,
    date
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newDrug = drugModel({
    name,
    date,
    babyID
  });
  const createdDrug = await newDrug.save();
  
  return res.status(201).json({ DrugStatus: "Created" });
})


// get: @get all drugs
drugRoute.get("/all", (req, res) => {
   drugModel.find((err, result) => {
         if (err)
             return res.status(500)
                 .json({ errorMsg: "error while listing db posts!!" });
         return res.status(200)
         .json(result);
     });
 });

 
// API: update @put drug
drugRoute.put("/update/:id", async (req, res) => {
    const { date,name }=req.body;
    const updatedDrug= await drugModel.findByIdAndUpdate(req.params.id, {
        name,
      date: Date(date)
      } );
       if (!updatedDrug){
         return res.status(404).json({errors:"Drug not updated or not there"})
       } 
       return res.status(200).json({userID:updatedDrug._id, ...updatedDrug._doc});
  });


  //GET: @GET drug by babyID
  drugRoute.get("/find/:babyID", (req, res) => {
    const { babyID } = req.params;
    drugModel.find({ "babyID": babyID}, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
        .json(result);
    });
});
  

// API: delete @delete baby
drugRoute.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    drugModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});

module.exports = drugRoute;