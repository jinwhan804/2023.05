// 로그인 할 때 필요한 기능
// JWT 토큰 사용
// JWT (JSON Web Token) : 웹 표준으로 두 객체의 JSON객체를  사용해서 정보를 안정성 있게 전달해준다.
// 사용할 정보를 자체적으로 보유하고 있다.(유저 정보 같은 것.)
// JWT으로 발급한 토큰은 기본정보(유저의 프로필)를 넣고 토큰이 정상인지 검증(서명을 포함하고 있음 signature)
// 주로 로그인이 정상적인지 회원 인증 권한에서 사용한다.

// JWT은 유저가 로그인을 요청하면 서버에서 유저의 정보를 가지고 정상적인 루트로 로그인을 요청한 유저면 토큰을 발급해서 전달해준다.
// 유저가 서버에 요청을 할 때 JWT토큰을 포함해서 요청을 하면 서버가 요청을 받고 토큰이 썩은 토큰인지 검사를 해서 착한 토큰이면
// 유저가 요청한 작업을 처리해주고 응답해준다.

// JWT를 쓰는 이유는 안정성 있게 정보를 전달해서 요청하기 위해
// JWT를 생성하면 사용할 모듈이 인코딩과 해싱 작업을 해준다.
// HMAC : 해싱 기법을 적용해서 메시지의 위변조를 방지하는 기법
// SHA256 : 임의의 길이 메시지를 256비트의 축약된 메시지로 만들어내는 해시 알고리즘

// JWT의 구조
//------------------------------------------------------------------------------------------------------------------------
// let header = {
//     // 사용하는 해싱 알고리즘
//     alg : "SHA256",
//     // 사용하는 토큰의 타입
//     type : "JWT"
// }

// let payload = {
//     // 토큰의 이름, 제목
//     sub : '546534',
//     // 유저의 이름(프로필)
//     name : 'asdqw',
//     // 토큰 발급된 시간, 발급 후 지난 시간
//     lat : '1234'
// }
//------------------------------------------------------------------------------------------------------------------------

// 비밀키 생성
// let signature = HMACSHA256(BASE64URL(header) + BASE64URL(payload));

// header : 타입과 알고리즘의 정보를 가지고 있다.
// paylosd : 유저의 정보와 만료 기간이 포함된 객체를 가지고 있다.
// signature : header와 payload를 인코팅하고 합쳐서 해싱해 비밀키로 만든다.

// 사용할 모듈 express, jsonwebtoken, dotenv
// dotenv : 어플리케이션을 만들면서 설정값을 담아두는 것
// 보안에 민감한 정보를 .env 파일에 작성해둔다.
// 비밀 키, 암호, API 토큰 등을 저장해둔다.

const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

// dotenv 가져오면서 config 메소드 실행
// .env 파일을 읽어서 적용
const dot = require('dotenv').config();

// JWT토큰을 만들면서 비밀키를 가지고 토큰을 만들어서 암호화할 예정. 이 비밀키를 .env에 보관할 예정

// process.env 객체에 우리가 .env 파일에 설정한 이름으로 키값이 들어 있다.
const KEY = process.env.KEY;

const app = express();

app.set('views',path.join(__dirname,"page"));
app.set('view engine','ejs');
app.use(express.urlencoded({extended : false}));

app.get('/',(req,res)=>{
    res.render('main');
})

app.post('/login',(req,res)=>{
    // 로그인을 정상적으로 한다 가정하고 토큰 발급
    // 유저 정보 변수로 생성
    const name = "user1"
    const KEY = process.env.KEY;

    // sign 메소드롤 JWT 토큰 생성
    // 첫 번째 매개 변수는 header 객체
    // 두 번째 매개 변수는 비밀 키
    // 세 번째 매개 변수는 payload 객체
    let token = jwt.sign({
        // type은 JWT
        type : 'jwt',
        // 유저 이름
        user : name
    },KEY,{
        // 토큰을 유지시킬 유효 시간
        expiresIn : '5m',
        // 토큰발급자
        issuer : 'user1'
    })
    res.send(JSON.stringify(token));

    // 토큰은 .으로 내용 구분
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiand0IiwidXNlciI6InVzZXIxIiwiaWF0IjoxNjgzODU4NTc1LCJleHAiOjE2ODM4NTg4NzUsImlzcyI6InVzZXIxIn0.xv4mvjyMnwR97MSqMkExoS93fLRVK5If5fa9YoFcbt8"
    // header 부분 : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    // payload 부분 : eyJ0eXBlIjoiand0IiwidXNlciI6InVzZXIxIiwiaWF0IjoxNjgzODU4NTc1LCJleHAiOjE2ODM4NTg4NzUsImlzcyI6InVzZXIxIn0
    // 서명 부분 : xv4mvjyMnwR97MSqMkExoS93fLRVK5If5fa9YoFcbt8
})

const PORT = 5000;

app.listen(PORT,()=>{
    console.log('Server Open!');
})

