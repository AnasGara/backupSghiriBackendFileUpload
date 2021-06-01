const express = require('express');
const sleepModel = require('../models/sleep.js');
const sleepRoute = express.Router();
const {
    validateSleepInput
  } = require("../utils/validator");


  // @POST: Create a sleep
  sleepRoute.post('/add', async (req,res) =>{
    //* validate user input
  const {
    //duree,
    dateDebut,
    dateFin,
    babyID
  } = req.body;
  const { isValid, errors } = validateSleepInput(
    dateDebut,
    dateFin,
    babyID
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newSleep = sleepModel({
    dateDebut,
    dateFin,
    babyID
  });
  const createdSleep = await newSleep.save();
  
  return res.status(201).json({ SleepStatus: "Created" });
})


// get: @get all sleep
sleepRoute.get("/all", (req, res) => {
    sleepModel.find((err, result) => {
         if (err)
             return res.status(500)
                 .json({ errorMsg: "error while listing db posts!!" });
         return res.status(200)
         .json(result);
     });
 });

 
// API: update @put sleep
sleepRoute.put("/update/:id", async (req, res) => {
    const { dateDebut,dateFin,babyID }=req.body;
    const updatedSleep= await sleepModel.findByIdAndUpdate(req.params.id, {
        dateDebut,
    dateFin,
    babyID
      } );
       if (!updatedSleep){
         return res.status(404).json({errors:"Sleep not updated or not there"})
       } 
       return res.status(200).json({userID:updatedSleep._id, ...updatedSleep._doc});
  });


  //GET: @GET sleep by babyID
sleepRoute.get("/find/:babyID", (req, res) => {
    const { babyID } = req.params;
    sleepModel.find({ "babyID": babyID}, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
        .json(result);
    });
});
  

// API: delete @delete sleep
sleepRoute.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    sleepModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});

sleepRoute.post("/date/:id", (req, res) => {
  const { date } =  req.body;
  const { id } = req.params;
  sleepModel.find({ "date": date, "babyId": id}, (err, result) => {
      if (!result)
          return res.status(400)
              .json({ errorMsg: `post with '${date}' id doesn't exist!!` });
      return res.status(200)
      .json(result);
  });
});
module.exports = sleepRoute;