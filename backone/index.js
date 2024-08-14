
const express = require("express");

const app = express();

app.get("/",(req,res)=>{
    console.log("hello from chaitanya this is home page..")
    return res.send("hello from chaitanya this is home page..")
})

app.get("/about",(req,res)=>{
    return res.send("hello from dhiraj this is about page..")
})

app.get("/info",(req,res)=>{
    return res.send(`hello my name is ${req.query.name} and my age is ${req.query.age} and i am from ${req.query.vr }`)
})


app.listen(8000,()=>console.log('server start....'))