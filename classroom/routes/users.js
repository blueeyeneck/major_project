const express = require('express');
const router = express.Router();

// index - users
router.get("/",(req,res)=>{
    res.send('get for users');
});

// show - users
router.get("/:id",(req,res)=>{
    res.send("Get for users id");
});

// post - users
router.post("/",(req,res)=>{
    res.send("post for users");
});

// delete - users
router.post("/:id",(req,res)=>{
    res.send("delete for users");
});


module.exports = router;
