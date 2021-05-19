const express = require('express');
const headModel = require('../models/head.js');
const headRoute = express.Router();
const {
    validateHeadInput
  } = require("../utils/validator");

  headRoute.post('/add', async (req,res) =>{
    //* validate user input
  const {
    measure,
    date,
    babyID
  } = req.body;
  const { isValid, errors } = validateHeadInput(
    measure,
    date,
    babyID
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newHead = headModel({
    measure,
    date,
    babyID
  });
  const createdHead = await newHead.save();
  
  return res.status(201).json({ HeadStatus: "Created" });

})


// get: @get all heads
headRoute.get("/all", (req, res) => {
    headModel.find((err, result) => {
         if (err)
             return res.status(500)
                 .json({ errorMsg: "error while listing db posts!!" });
         return res.status(200)
         .json(result);
     });
 });   


  //GET: @GET heads by babyID
  headRoute.get("/find/:babyID", (req, res) => {
    const { babyID } = req.params;
    headModel.find({ "babyID": babyID}, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
        .json(result);
    });
});


// API: update @put
headRoute.put("/update/:id", async (req, res) => {
    const { date,measure }=req.body;
    const updatedHead= await headModel.findByIdAndUpdate(req.params.id, {
        measure,
      date: Date(date)
      } );
       if (!updatedHead){
         return res.status(404).json({errors:"head not updated or not there"})
       } 
       return res.status(200).json({userID:updatedHead._id, ...updatedHead._doc});
  });
   
// @delete: delete  food
headRoute.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    headModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});

  module.exports = headRoute;