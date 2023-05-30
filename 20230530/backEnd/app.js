// 이미지 업로드
// 서버측 컴퓨터에 폴더에 저장이후 이미지 파일의
// 파일의 경로를 설정하고 서버측에서 이미지 파일을 가져와서 보여준다.


// express path multer
// multer 모듈을 사용해서 이미지 업로드할것. 파일이 저장될 경로나 파일의 확장자
// 이름등을 설정해서 파일을 저장한다.

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();
const {sequelize} = require('./models');
const uploadRouter = require('./routers/upload');
const loginRouter = require('./routers/login');
const signupRouter = require('./routers/signUp');
const updateRouter = require('./routers/update');

app.use(cors({
    origin : "http://127.0.0.1:5500",
    credentials : true
}))

app.use(express.urlencoded({extended : false}));

// 정적 파일 경로 추가
app.use('/img',express.static(path.join(__dirname,'uploads')));

app.use(express.json());

app.use(session({
    secret : 'sessionkey',
    resave : false,
    saveUninitialized : false
}))

sequelize.sync({force : false}).then(()=>{
    console.log('연결 성공');
}).catch((err)=>{
    console.log(err);
})

app.use('/upload',uploadRouter);
app.use('/signup',signupRouter);
app.use('/login',loginRouter);
app.use('/mypage',updateRouter);

app.listen(5000,()=>{
    console.log('Server Open');
})