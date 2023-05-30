// 로그인 페이지 제작하는데 프론트와 백을 나눠서 작성
// 배포 후 프론트 수정 시 프론트에만 푸쉬하고 백 수정 시 백만 푸쉬
// 깃 레파지토리를 2개 나눠서 생성하여 관리

const express = require('express');
const cors = require('cors');
const dot = require('dotenv').config();
const session = require('express-session');
const {sequelize} = require('./models');
const app = express();

const loginRouter = require('./routers/login');
const signupRouter = require('./routers/signUp');
const postRouter = require('./routers/post');

app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(session({
    secret : process.env.SESSION_KEY,
    resave : false,
    saveUninitialized : false
}))

sequelize.sync({force : false}).then(()=>{
    console.log('연결 성공');
}).catch((err)=>{
    console.log(err);
})

// 다른 도메인에서 악의적으로 접근할 수 없도록 도메인 접근 시 발생하는 보안 정책
// 다른 도메인과 통신을 안전하게 유지 시키기 워해서 보안 정책이 존재
// cors 모듈을 통해 도메인을 허용
// Access-controll-Allow-origin을 헤더에 포함하여 접근을 허용하고 응답하고 브라우저에서 응답을 받은 뒤 
// 헤더 값을 확인한 후 접근을 허용 또는 차단한다.

// 미들웨어로 추가
app.use(cors({
    // 도메인 허용 옵션
    // 접근을 허용할 도메인
    // 여러개의 도메인을 허용하고 싶다면 배열의 형태로 넣어주면 된다.
    origin : 'http://127.0.0.1:5500',
    // 클라이언트의 요청에 쿠키를 포함할지 속성
    credentials : true,
}))

app.use('/login',loginRouter);
app.use('/signUp',signupRouter);
app.use('/post',postRouter);


// test
app.get('/',(req,res)=>{
    res.send('응답완료');
})

app.listen(5000,()=>{
    console.log('Server Open!');
})