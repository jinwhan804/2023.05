const express = require('express');
const path = require('path');
const dot = require('dotenv').config();
const jwt = require('jsonwebtoken');
const session = require('express-session');

const joinRouter = require('./routers/joinRouter');
const loginRouter = require('./routers/loginRouter');

const app = express();

app.set("views",path.join(__dirname,'page'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended : false}))
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized:false
}))

app.use('/join',joinRouter);
app.use('/login',loginRouter);

app.listen(5000,()=>{
    console.log("server open");
})