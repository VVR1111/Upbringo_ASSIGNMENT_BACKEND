require('dotenv').config();
const { json } = require("express");
const express= require("express");
const app=express();
const mysql=require('mysql');
const apiroutes=require('./routes/index.js');
app.use(express.json());

app.use('/store',apiroutes);
app.listen(process.env.PORT || "8000",()=>{
    console.log(`server connected on: ${process.env.PORT || '8000'} `);
});