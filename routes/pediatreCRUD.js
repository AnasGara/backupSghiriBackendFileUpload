const express = require("express");
const pediatreModel = require("../models/pediatre");
const pediatreRoute = express.Router();
const {
    validatePediatreInput
  } = require("../utils/validator");

//POST: Create a pediatre
pediatreRoute.post('/add', async (req, res) => {
  
    //* validate user input
  const {
    firstName,    
    lastName,   
    town,
    adress,
    telephone
  } = req.body;
  const { isValid, errors } = validatePediatreInput(
    firstName,    
    lastName,   
    town,
    adress,
    telephone
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newPediatre = pediatreModel({
    firstName,    
    lastName,   
    town,
    adress,
    telephone
  });
  const createdPediatre = await newPediatre.save();
  
  return res.status(201).json({ PediatreStatus: "Created" });

})

// get: @get all
pediatreRoute.get("/all", (req, res) => {
  
    pediatreModel.find((err, result) => {
        if (err)
            return res.status(500)
                .json({ errorMsg: "error while listing db posts!!" });
        return res.status(200).json(result);
    });
     //res.send('hello world')
});


//GET: @GET by ID 605dc92f9d74634dd8cccdcb
pediatreRoute.get("/:id", (req, res) => {
    const { id } = req.params;
    pediatreModel.findById(id, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
            .json(result);
    });
});

/*firstName
lastName
adres
s
telephone/*/
 
  //GET: @GET pediatre by town
  pediatreRoute.get("/find/:town", (req, res) => {
    const { town } = req.params;
    pediatreModel.find({ "town": town}, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
        .json(result);
    });
});

// API: update @put
pediatreRoute.put("/update/:id", async (req, res) => {
  const { firstName,lastName,adress,town,telephone}=req.body;
  const updatedPediatre= await pediatreModel.findByIdAndUpdate(req.params.id, {
    firstName,
    lastName,
    adress,town,
    telephone
} );
     if (!updatedPediatre){
       return res.status(404).json({errors:"Pediatre not updated or not there"})
     } 
     return res.status(200).json({PediatreID:updatedPediatre._id, ...updatedPediatre._doc});
});


// API: delete @delete
pediatreRoute.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    pediatreModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err) 
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});

module.exports = pediatreRoute;
