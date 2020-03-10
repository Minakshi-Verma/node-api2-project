const express = require("express")

const db = require("../data/db")

const router = express.Router(); //invoke Router()

//Our router will handle endpoints that begins with /api/posts
//the router only cares about what comes after /api/posts in the URL
//consider/api/posts as"/""
//list of endpoints:
//POST: /api/posts
//POST /api/posts/:id/comments
//GET /api/posts
//GET /api/posts/:id
//GET /api/posts/:id/comments
//DELETE /api/posts/:id
//PUT /api/posts/:id


router.get("/", (req,res)=>{
    res.send("router is running")
})

const posts = []
router.post("/", (req,res)=>{
    const post= req.body
    const{title,contents} = post
    if(!title||!contents){
     return res.status(400).json({errorMessage: "Please provide title and contents for the post." })
    }else{
        db.insert({title,contents})
       .then(post=>{
        res.status(201).json(post)
       })  
       .catch(err=>{
           console.log(err)
           res.status(500).json({ error: "There was an error while saving the post to the database" )
       })
    }   
})

router.post("/:id/commemts", (req,res)=>{
    const id = req.params.id
    
})

module.exports = router;