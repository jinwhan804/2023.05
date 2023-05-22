// 로그인 후 게시판에 글작성 수정, 삭제

const express = require('express');
const session = require('express-session');
const dot = require('dotenv').config();
const path = require('path');
const { sequelize } = require('./models');
const signUpRouter = require('./routers/signUp');
const loginRouter = require('./routers/login');
const boarderRouter = require('./routers/boarder');

const app = express();

app.set('views',path.join(__dirname,"page"));
app.set('view engine','ejs');
app.use(express.urlencoded({extended : false}));
app.use(session({
    secret : process.env.SESSION_KEY,
    resave : false,  // 다시 저장할 지 여부
    saveUninitialized : false // 초기화 여부
}))

app.use('/signUp',signUpRouter);
app.use('/login',loginRouter);
app.use('/boarder',boarderRouter);

// force : 초기화 여부
sequelize.sync({force : false}).then((e)=>{
    console.log("연결 성공");
}).catch((err)=>{
    console.log(err);
})

app.listen(5000,()=>{
    console.log('Server Open');
})