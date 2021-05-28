const express = require('express');
const allergieModel = require('../models/Allergie.js');
const allergieRoute = express.Router();
const {
  validateAllergieInput
} = require("../utils/validator");

allergieRoute.post('/add', async (req,res) =>{
    //* validate user input
  const {
      name,
    date,
    time,
    babyId
  } = req.body;
  const { isValid, errors } = validateAllergieInput(
    name,
    date,
    time,
    babyId
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newAllergie = allergieModel({
    name,
    date,
    time,
    babyId
  });
  const createdAllergie= await newAllergie.save();
  
  return res.status(201).json({ AllergieStatus: "Created" });

})

// get: @get all allergie
allergieRoute.get("/all", (req, res) => {
  allergieModel.find((err, result) => {
       if (err)
           return res.status(500)
               .json({ errorMsg: "error while listing db posts!!" });
       return res.status(200)
           
          .json(result);
   });
});   

//GET: @GET by ID 605dc92f9d74634dd8cccdcb
allergieRoute.get("/:id", (req, res) => {
const { id } = req.params;
allergieModel.findById(id, (err, result) => {
    if (!result)
        return res.status(400)
            .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
    return res.status(200)
        .json(result);
      });
});


// API: update @put
allergieRoute.put("/update/:id", async (req, res) => {
  const { 
     name,
    date,
    time,
    babyId
  }=req.body;
  const updatedArticle= await allergieModel.findByIdAndUpdate(req.params.id, {
    name,
    date,
    time,
    babyId
    } );
     if (!updatedArticle){
       return res.status(404).json({errors:"Allergie not updated or not there"})
     } 
     return res.status(200).json({userID:updatedAllergie._id, ...updatedAllergie._doc});
});
// @delete: delete  
allergieRoute.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  allergieModel.findByIdAndDelete({ _id: id }, (err, result) => {
      if (err)
          return res.status(400)
              .json({ errorMsg: `id: '${id}' doesn't exist!!`});
      return res.status(200)
          .json({ message: `post with id: '${id}' deleted`});
  });
});

module.exports = allergieRoute;