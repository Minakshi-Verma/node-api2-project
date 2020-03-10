const express = require("express");
const postsRouter = require('../posts/post-router')
const server = express()
server.use(express.json())

server.get("/", (req,res)=>{
    res.json("server is running") //you can write "send" inplace of json
})
//connection between server and router
//Our router will handle endpoints that begins with /api/posts
server.use("/api/posts", postsRouter)

module.exports = server