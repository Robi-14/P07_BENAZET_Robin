const express = require('express');
const app =express();
const bodyParser = require('body-parser');
const dotEnv= require('dotenv').config()
const mysql= require('mysql');
const db = mysql.createConnection({
    host: process.env.host,
    user : process.env.user,
    password: process.env.password,
    database: process.env.db,
})
db.connect(function(err){
    if (err) throw err;
    console.log("Connecté à la base de donées MySQL");
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const userRoutes =require('./routes/user')
const messageRoutes =require('./routes/message');
const commentairesRoutes = require('./routes/commentaires');




app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin",  '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/api/user', userRoutes)
  app.use('/api/messages', messageRoutes)
  app.use('/api/messages', commentairesRoutes )




  

  module.exports =app