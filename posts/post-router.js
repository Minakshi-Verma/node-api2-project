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


// router.get("/", (req,res)=>{
//     res.send("router is running")
// })
//--------------------------
const posts = []
router.post("/", (req,res)=>{
    const post= req.body
    const{title,contents} = post
    if(!title||!contents){
     return res.status(400).json({errorMessage: "Please provide title and contents for the post." })
    }else if(title,contents){
        db.insert({title,contents})
       .then(post=>{
           posts.push(post)          
           res.status(201).json(posts)
       })  
       .catch(err=>{
           console.log(err)
           res.status(500).json({ error: "There was an error while saving the post to the database" })
       })
    }   
})
//----------------------
router.post("/:id/comments", (req,res)=>{
    const {id} = req.params
    const comment = req.body    
    db.findCommentById(id)
    .then(comments=>{
       if(!id){
        res.status(404).json({message: "The post with the specified ID does not exist."})  
       }if(!text){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
       }else{
           comments.push(comment)
        res.status(201).json(comments) 
       }
    })
    .catch(err=>{
        console.log(err)
    })     

})
//------------------------------
router.get("/", (req,res)=>{ 
      const post = req.body
      db.find(post)
      .then(post=>{          
        res.status(500).json({error: "The posts information could not be retrieved."})
      })
      .catch(err=>{        
       console.log(err)
      })    
})
//---------------------------
router.get("/:id", (req,res)=>{
    const{id} = req.params
    findById(id)
    .then(id=>{
        res.status(204).end()
  })
  .catch(err=>{
    res.status(500).json({error: "The post information could not be retrieved"})
  })
    
})
//------------------------
router.delete("/:id", (req,res)=>{
    const {id}= req.params

    db.remove(id)
    .then(removed=>{
       if(removed){
        res.status(204).end()          
       }else{
        res.status(500).json({ message: "The post with the specified ID does not exist."}) 
       } 
    })
    .catch(error=>{
        res.status(500).json({error: "The post could not be removed" })
    })
})

//---------------------------
router.put("/:id", (req,res)=>{
    const{id} = req.params;
    const post = req.body
    const {title, contents} = post
    if(!id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })  
    }if(!title||!contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })  
    }
    db.update(id,post)
    .then(updatePost=>{
        if(!updatePost){
        res.status(500).json({ error: "The post information could not be modified."})   
        }else{
        posts.push(post)
        res.status(200).json({message: "successful"})   
        }
    })
})

module.exports = router;