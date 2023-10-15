const express = require('express');
const app = express();
const posts = require("./routes/posts.js");
const users = require("./routes/users.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser("secreatcode"));

app.get("/getsignedcookie",(req,res)=>{
    res.cookie("made in","india",{signed:true});
    console.dir(req.signedCookies);
    res.send("signed cookie is send");
});

app.get("/verify",(req,res)=>{
    res.send(req.signedCookies);
});

app.get("/greet",(req,res)=>{
    let {name = "anonymous"} = req.cookies;
    res.send(`namasthe ${name}`);
});

app.get("/getcookies",(req,res)=>{
    res.cookie("greet","namaste");
    res.cookie("origin","indian");
    res.send("send some cookies");
});

app.get("/",(req,res)=>{
    console.dir(req.cookies);
    res.send('hi i am root');
});

app.use("/posts",posts);
app.use("/users",users);

app.listen(3000,()=>{
    console.log('server is listening to port 3000');
});

