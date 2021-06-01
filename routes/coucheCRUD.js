const express = require('express');
const coucheModel = require('../models/couche.js');
const coucheRoute = express.Router();
const {
    validateCoucheInput
  } = require("../utils/validator");


  // @POST: Create a couche
coucheRoute.post('/add', async (req,res) =>{
    //* validate user input
  const {
    etat,
    couleur,
    date,
    babyID
    
  } = req.body;
  const { isValid, errors } = validateCoucheInput( etat, date);
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newCouche = coucheModel({
    etat,
    couleur,
    date,
    babyID
  });
  const createdCouche = await newCouche.save();
  
  return res.status(201).json({ CoucheStatus: "Created" });
})


// get: @get all couche
coucheRoute.get("/all", (req, res) => {
    coucheModel.find((err, result) => {
         if (err)
             return res.status(500)
                 .json({ errorMsg: "error while listing db posts!!" });
         return res.status(200)
         .json(result);
     });
 });

 
// API: update @put couche
coucheRoute.put("/update/:id", async (req, res) => {
    const { date,etat }=req.body;
    const updatedCouche= await coucheModel.findByIdAndUpdate(req.params.id, {
        etat,
      date: Date(date)
      } );
       if (!updatedCouche){
         return res.status(404).json({errors:"Couche not updated or not there"})
       } 
       return res.status(200).json({userID:updatedCouche._id, ...updatedCouche._doc});
  });


  //GET: @GET couche by babyID
coucheRoute.get("/find/:babyID", (req, res) => {
    const { babyID } = req.params;
    coucheModel.find({ "babyID": babyID}, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
        .json(result);
    });
});
  

// API: delete @delete couche
coucheRoute.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
     coucheModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});
//get by date "12/08/2021"

coucheRoute.post("/date/:id", (req, res) => {
  const { date } =  req.body;
  const { id } = req.params;
  coucheModel.find({ "date": date, "babyId": id}, (err, result) => {
      if (!result)
          return res.status(400)
              .json({ errorMsg: `post with '${date}' id doesn't exist!!` });
      return res.status(200)
      .json(result);
  });
});
module.exports = coucheRoute;