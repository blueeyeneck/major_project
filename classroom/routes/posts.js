const express = require('express');
const router = express.Router();

// posts
// index 
router.get("/",(req,res)=>{
    res.send('get for posts');
});

// show 
router.get("/:id",(req,res)=>{
    res.send("Get for posts id");
});

// post 
router.post("/",(req,res)=>{
    res.send("post for posts");
});

// delete 
router.post("/:id",(req,res)=>{
    res.send("delete for post");
});

module.exports = router;