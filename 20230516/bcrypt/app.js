const express = require('express');
const path = require('path');
const loginRouter = require('./routers/loginRouter');
const joinRouter = require('./routers/joinRouter');

const app = express();

app.set('views',path.join(__dirname,"page"));
app.set('view engine','ejs');
app.use(express.urlencoded({extended : false}));
app.use('/login',loginRouter);
app.use('/join',joinRouter);

app.listen(5000,()=>{
    console.log("Server Open!!");
})