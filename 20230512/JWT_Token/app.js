const express = require('express');
const path = require('path');
const pageRouter = require('./routers/page');
const tokenRouter = require('./routers/token');
const verifyRouter = require('./routers/verify');

const app = express();

// 세션 사용을 위해 필요한 모듈 : express-session
const session = require('express-session');

app.set('views',path.join(__dirname,'page'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended : false}));
app.use(session({
    // 세션을 발급할 때 사용할 키, 나중에 소스코드에 노출되지 않도록 변경 필요.
    secret : process.env.KEY2,
    // 세션이 변경되거나 저장할 때나 불러올 때 다시 저장할 지 여부
    resave : false,
    // 세션을 저장할 때 초기화 여부
    saveUninitialized : true,
}))

app.use(pageRouter);
app.use(tokenRouter);
app.use('/userVerify',verifyRouter);

const PORT = 5000;

app.listen(PORT,()=>{
    console.log('Server Open!');
})