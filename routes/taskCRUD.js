const express = require('express');
const task = require('../models/task.js');
const taskModel = require('../models/task.js');
const taskRoute = express.Router();
const {
    validateTaskInput
  } = require("../utils/validator");

  taskRoute.post('/add', async (req,res) =>{
    //* validate user input
  const {
    title,
    date,
    parentID
  } = req.body;
  const { isValid, errors } = validateTaskInput(
      title,
      date,
      parentID
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newTask = taskModel({
    title,
    date,
    status:false,
    parentID
  });
  const createdTask= await newTask.save();
  
  return res.status(201).json({ TaskStatus: "Created" });

})


// get: @get all tasks
taskRoute.get("/all", (req, res) => {
    taskModel.find((err, result) => {
         if (err)
             return res.status(500)
                 .json({ errorMsg: "error while listing db posts!!" });
         return res.status(200)
         .json(result);
     });
 });   


  //GET: @GET tasks by babyID
  taskRoute.get("/find/:parentID", (req, res) => {
    const { parentID } = req.params;
    taskModel.find({ "parentID": parentID}, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
        .json(result);
    });
});


// API: update @put
taskRoute.put("/update/:id", async (req, res) => {
    const { title,date,status }=req.body;
    const updatedTask= await taskModel.findByIdAndUpdate(req.params.id, {
        title,status,
      date
      } );
       if (!updatedTask){
         return res.status(404).json({errors:"Task not updated or not there"})
       } 
       return res.status(200).json({userID:updatedTask._id, ...updatedTask._doc});
  });
   
// @delete: delete  food
taskRoute.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    taskModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});
taskRoute.post("/date/:id", (req, res) => {
  const { date } =  req.body;
  const { id } = req.params;
  taskModel.find({ "date": date, "babyId": id}, (err, result) => {
      if (!result)
          return res.status(400)
              .json({ errorMsg: `post with '${date}' id doesn't exist!!` });
      return res.status(200)
      .json(result);
  });
});

module.exports = taskRoute;