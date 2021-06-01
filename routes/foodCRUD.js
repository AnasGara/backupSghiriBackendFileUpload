const express = require('express');
const foodModel = require('../models/food.js');
const foodRoute = express.Router();
const {
    validateFoodInput
  } = require("../utils/validator");


  // @POST: Create a food
  foodRoute.post('/add', async (req,res) =>{
    //* validate user input
  const {
    descr,
    date,
    foodName,
    babyID
  } = req.body;
  const { isValid, errors } = validateFoodInput(
    date, 
    foodName,
    descr
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newFood = foodModel({
    date, 
    foodName,
    descr,
    babyID
  });
  const createdFood = await newFood.save();
  
  return res.status(201).json({ FoodStatus: "Created" });
})


// get: @get all foods
foodRoute.get("/all", (req, res) => {
    foodModel.find((err, result) => {
         if (err)
             return res.status(500)
                 .json({ errorMsg: "error while listing db posts!!" });
         return res.status(200)
         .json(result);
     });
 });    

// API: update @put
foodRoute.put("/update/:id", async (req, res) => {
    const { date,descr,foodName }=req.body;
    const updatedFood= await foodModel.findByIdAndUpdate(req.params.id, {
      descr,foodName,
      date: Date(date)
      } );
       if (!updatedFood){
         return res.status(404).json({errors:"Food not updated or not there"})
       } 
       return res.status(200).json({userID:updatedFood._id, ...updatedFood._doc});
  });
  

  //GET: @GET food by babyID
  foodRoute.get("/find/:babyID", (req, res) => {
    const { babyID } = req.params;
    foodModel.find({ "babyID": babyID}, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
        .json(result);
    });
});
  

// @delete: delete  food
foodRoute.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    foodModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});

//get by date "12/08/2021"

foodRoute.post("/date/:id", (req, res) => {
  const { date } =  req.body;
  const { id } = req.params;
  foodModel.find({ "date": date, "babyId": id}, (err, result) => {
      if (!result)
          return res.status(400)
              .json({ errorMsg: `post with '${date}' id doesn't exist!!` });
      return res.status(200)
      .json(result);
  });
});
module.exports = foodRoute;