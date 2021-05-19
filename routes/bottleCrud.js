const express = require('express');
const bottleModel = require('../models/bottle.js');
const bottleRoute = express.Router();
const {
    validateBottleInput
  } = require("../utils/validator");


  // @POST: Create a bottle
bottleRoute.post('/add', async (req,res) =>{
    //* validate user input
  const {
    quantity,
    date,
    babyID
  } = req.body;
  const { isValid, errors } = validateBottleInput(
    quantity,
    date
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newBottle = bottleModel({
    quantity,
    date,
    babyID
  });
  const createdBottle = await newBottle.save();
  
  return res.status(201).json({ BottleStatus: "Created" });
})


// get: @get all bottles
bottleRoute.get("/all", (req, res) => {
    bottleModel.find((err, result) => {
         if (err)
             return res.status(500)
                 .json({ errorMsg: "error while listing db posts!!" });
         return res.status(200)
         .json(result);
     });
 });

 
// API: update @put
bottleRoute.put("/update/:id", async (req, res) => {
    const { date,quantity }=req.body;
    const updatedBottle= await bottleModel.findByIdAndUpdate(req.params.id, {
        quantity,
      date: Date(date)
      } );
       if (!updatedBottle){
         return res.status(404).json({errors:"Bottle not updated or not there"})
       } 
       return res.status(200).json({userID:updatedBottle._id, ...updatedBottle._doc});
  });


  //GET: @GET bottles by babyID
bottleRoute.get("/find/:babyID", (req, res) => {
    const { babyID } = req.params;
    bottleModel.find({ "babyID": babyID}, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
        .json(result);
    });
});
  

// API: delete @delete bbay
bottleRoute.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    bottleModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});

module.exports = bottleRoute;