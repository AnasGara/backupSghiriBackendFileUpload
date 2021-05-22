const express = require("express");
const userModel = require("../models/user");
const userRoute = express.Router();


// get: @get all
userRoute.get("/all", (req, res) => {
   userModel.find((err, result) => {
        if (err)
            return res.status(500)
                .json({ errorMsg: "error while listing db posts!!" });
        return res.status(200)
        .json(result);
    });
     //res.send('hello world')
});


//GET: @GET by ID 605dc92f9d74634dd8cccdcb
userRoute.get("/:id", (req, res) => {
    const { id } = req.params;
    userModel.findById(id, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
        .json(result);
    });
});



// API: update @put
userRoute.put("/update/:id", async (req, res) => {
  const { description,firstName,lastName,phoneNumber,address,town,password,email}=req.body;
  const updatedUser= await userModel.findByIdAndUpdate(req.params.id, {description,
    firstName,
    lastName,
    phoneNumber,
    address,
    town,
    password,
    email} );
     if (!updatedUser){
       return res.status(404).json({errors:"User not updated or not there"})
     } 
     return res.status(200).json({userID:updatedUser._id, ...updatedUser._doc});
});


// API: delete @delete
userRoute.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    userModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});


//upload image



module.exports = userRoute;
