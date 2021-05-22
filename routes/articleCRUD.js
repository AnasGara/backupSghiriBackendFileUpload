const express = require('express');
const articleModel = require('../models/article.js');
const articleRoute = express.Router();
const {
    validateArticleInput
  } = require("../utils/validator");

  articleRoute.post('/add', async (req,res) =>{
    //* validate user input
    
  const {
    title,
    image,
    content,
    date,
    subject
  } = req.body;
  
  const { isValid, errors } = validateArticleInput(
    title,
    image,
    content,
    date,
    subject
  );
  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const newArticle = articleModel({
    title,
    image,
    content, date:Date(date),
    subject
  });
  const createdArticle= await newArticle.save();
  
  return res.status(201).json({ ArticleStatus: "Created" });

})


// get: @get all article
articleRoute.get("/all", (req, res) => {
    articleModel.find((err, result) => {
         if (err)
             return res.status(500)
                 .json({ errorMsg: "error while listing db posts!!" });
         return res.status(200)
             
            .json(result);
     });
 });   

//GET: @GET by ID 605dc92f9d74634dd8cccdcb
articleRoute.get("/:id", (req, res) => {
  const { id } = req.params;
  articleModel.findById(id, (err, result) => {
      if (!result)
          return res.status(400)
              .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
      return res.status(200)
          .json(result);
  });
});

  //GET: @GET articles by subject
  articleRoute.get("/find/:subject", (req, res) => {
    const { subject } = req.params;
    articleModel.find({ "subject": subject}, (err, result) => {
        if (!result)
            return res.status(400)
                .json({ errorMsg: `post with '${id}' id doesn't exist!!` });
        return res.status(200)
           
        .json(result);
    });
});


// API: update @put
articleRoute.put("/update/:id", async (req, res) => {
    const {   title,subject,
        image,
        content}=req.body;
    const updatedArticle= await articleModel.findByIdAndUpdate(req.params.id, {
        title,
        image,subject,
        content
      } );
       if (!updatedArticle){
         return res.status(404).json({errors:"Article not updated or not there"})
       } 
       return res.status(200).json({userID:updatedArticle._id, ...updatedArticle._doc});
  });
   
// @delete: delete  food
articleRoute.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    articleModel.findByIdAndDelete({ _id: id }, (err, result) => {
        if (err)
            return res.status(400)
                .json({ errorMsg: `id: '${id}' doesn't exist!!`});
        return res.status(200)
            .json({ message: `post with id: '${id}' deleted`});
    });
});

  module.exports = articleRoute;