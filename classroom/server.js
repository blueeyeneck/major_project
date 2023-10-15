const express = require('express');
const app = express();
const posts = require("./routes/posts.js");
const users = require("./routes/users.js");

app.get("/",(req,res)=>{
    res.send('hi i am root');
});

app.use("/posts",posts);
app.use("/users",users);

app.listen(3000,()=>{
    console.log('server is listening to port 3000');
});

