// 입장 토큰 만들어서 로그인 검증

// 엑세스 토큰만 사용한 방식
// 1. 이용자가 로그인 시도하고
// 2. 서버에서 이용자 확인 후 입장권 발급
// 3. JWT 인증 정보를 payload에 할당하고 생성
// 4. 생성한 토큰을 클라이언트에 반환해주고 클라이언트는 이 입장권을 보유한다.
// 5. 클라이언트가 서버에 요청을 할 때 이 입장권도 같이 보내서 요청을 시도한다.
// 6. 서버는 요청을 받아서 입장권이 유효한지 확인하고 유효할 경우 요청을 처리해서 응답한다.
// 7. 입장권이 정상적이지 않으면 재 로그인을 시킨다. (입장권을 다시 생성시킨다.)

// 엑세스 토큰만 사용하면 인증 보안이 취약할 수 있어서 다른 사람이 엑세스 토큰을 탈취했을 때 유효 기간이 끝날 때까지 막을 수 없다.
// 그래서 유효 기간을 짧게 주는데 이럴 경우 로그인을 계속해야한다.
// 그래서 refresh 토큰과 같이 사용하며 refresh 토큰의 유효기간을 길게 해주고 엑세스 토큰을 짧게 해서 refresh 토큰이 존재할 때
// 엑세스 토큰이 만료될 때 마다 재발급해준다. 쉽게 말해서 JWT를 2개 사용하는 개념
// refresh 토큰은 유효기간을 길게해서 엑세스 토큰의 유효기간이 끝날 때마다 갱신해주는 역할만 담당

// 엑세스 토큰과 refresh 토큰을 같이 사용하는 방식
// 1. 클라이언트 로그인
// 2. 서버에서 사용자 확인 후 입장권 권한 인증정보를 payload에 할당하고 생성
// 3. refresh 토큰을 만들어서 데이터베이스에 저장해두고 2개의 토큰 전부 클라이언트에 전달해준다.
// 4. 클라이언트도 두 토큰을 보유. 
// 5. 클라이언트가 요청을 진행할 때 엑세스 토큰을 전달해서 요청한다.
// 6. 서버는 전달 받은 토큰을 확인하고 엑세스 토큰을 디코드해서 사용자 정보를 확인한다.
// 7. 토큰이 정상적인지 확인. 정상적이지 않으면 새로 로그인 시킨다.
// 8. 날짜가 지난 토큰이면 refresh 토큰으로 재발급해준다.

// 사용할 모듈 : dotenv express cookie-parser jsonwebtoken ejs

const express = require('express');
const path = require('path');
const dot = require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

const app = express();

app.set('views',path.join(__dirname,'page'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended : false}));
app.use(cookie());

// 더미로 회원가입한 사람의 정보 객체
const user = {
    id : 'koo',
    pw : '1234'
}

app.get("/",(req,res)=>{
    res.render('login');
})

app.post("/login",(req,res)=>{
    // 요청 객체의 body에 user_id와 user_pw
    const {user_id,user_pw} = req.body;
    if(user_id === user.id && user_pw === user.pw){
        // access token 발급
        const accessToken = jwt.sign({
            id : user.id            
        },process.env.ACCESS_TOKEN_KEY,{
            expiresIn : "20S"
        });
        const refreshToken = jwt.sign({
            id : user.id
        },process.env.REFRESH_TOKEN_KEY,{
            expiresIn:"1d"
        });
        // 쿠키 생성
        res.cookie('refresh',refreshToken,{maxAge : 24 * 60 * 60 * 1000});
        res.render('join',{accessToken});
    }
})

app.post("/refresh",(req,res)=>{
    // 옵션 체이닝 : 뒤에 오는 키 값이 있는지 먼저 확인하고 값을 호출해서 반환. crash 방지
    if(req.cookies?.refresh){
        const refreshToken = req.cookies.refresh;
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY,(err,decode)=>{
            // err가 있으면 다시 로그인 시킴
            if(err){
                res.send('다시 로그인 해주세요');
            }else{
                const accessToken = jwt.sign({
                    id: user.id
                },process.env.ACCESS_TOKEN_KEY,{
                    expiresIn:'20s'
                });
                res.render('join',{accessToken})
            }
        })
    }else{
        res.send('로그인 해주세요');
    }
})

app.listen(5000,()=>{
    console.log('Server Open');
})