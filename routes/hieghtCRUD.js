const express = require('express');
const heightModel = require('../models/height.js');
const heightRoute = express.Router();
const {
    validateHeightInput
  } = require("../utils/validator");

/*measure,
    date,
    babyID/*/
heightRoute.post('/add', async (req,res) =>{
    //* validate user input
  const {
    measure,
    date,
    babyID
  } = req.body;
  const { isValid, errors } = validateHeightInput(
    measure,
    date,
    babyID
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newHeight = heightModel({
    measure,
    date,
    babyID
  });
  const createdHeight = await newHeight.save();
  
  return res.status(201).json({ HeightStatus: "Created" });

})

// get: @get all heights
heightRoute.get("/all", (req, res) => {
    heightModel.find((err, result) => {
         if (err)
             return res.status(500)
                 .json({ errorMsg: "error while listing db posts!!" });
         return res.status(200)
         .json(result);
     });
 });   

 
  //GET: @GET height by babyID
  heightRoute.get("/find/:babyID", (req, res) => {
    const { babyID } = req.params;
    heightModel.find({ "babyID": babyID}, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
        .json(result);
    });
});

// API: update @put
heightRoute.put("/update/:id", async (req, res) => {
    const { date,measure }=req.body;
    const updatedHeight= await heightModel.findByIdAndUpdate(req.params.id, {
        measure,
      date: Date(date)
      } );
       if (!updatedHeight){
         return res.status(404).json({errors:"height not updated or not there"})
       } 
       return res.status(200).json({userID:updatedHeight._id, ...updatedHeight._doc});
  });
  
  
// @delete: delete  food
heightRoute.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    heightModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});
module.exports = heightRoute;