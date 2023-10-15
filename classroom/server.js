const express = require('express');
const app = express();
const posts = require("./routes/posts.js");
const users = require("./routes/users.js");
// const cookieParser = require("cookie-parser");
const session = require("express-session");

// app.use(cookieParser("secreatcode"));

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made in","india",{signed:true});
//     console.dir(req.signedCookies);
//     res.send("signed cookie is send");
// });

// app.get("/verify",(req,res)=>{
//     res.send(req.signedCookies);
// });

// app.get("/greet",(req,res)=>{
//     let {name = "anonymous"} = req.cookies;
//     res.send(`namasthe ${name}`);
// });

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","namaste");
//     res.cookie("origin","indian");
//     res.send("send some cookies");
// });

// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send('hi i am root');
// });

// app.use("/posts",posts);
// app.use("/users",users);

// app.use(session({secret: "mysupersecretstring",resave:false,saveUninitialized:true}));

const sessionOptions = {
    secret : "mysupersecreatstring",
    resave : false,
    saveUninitialized : true
};

app.use(session(sessionOptions));

app.get("/register",(req,res)=>{
    let {name="anonymous"} = req.query;
    console.log(req.session);
    req.session.name=name;
    console.log(req.session.name);
    // res.send(name);
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.send(`hello ${req.session.name}`);
});;

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         ++req.session.count;
//     }
//     else{
//         req.session.count = 1;
//     }
//     res.send(`you send a request ${req.session.count} times`);
// });

// app.get("/test",(req,res)=>{
//     res.send("test successfull");
// });

app.listen(3000,()=>{
    console.log('server is listening to port 3000');
});

