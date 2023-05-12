const router = require('express').Router();
const dot = require('dotenv').config();
const jwt = require('jsonwebtoken');

router.post('/login',(req,res)=>{
    const name = "koo";
    const KEY = process.env.KEY;
    let token = jwt.sign({
        // 토큰 타입
        type : 'JWT',
        name: name
    },KEY,{
        // 토큰 유효 시간
        expiresIn : "3m",
        // 토큰 발급자
        issuer : name
    })
    req.session.token = token;
    res.render("page2");
})

// 다른 곳에 로그인했으면 로그인 중복을 방지하는 방법
// 데이터베이스에 엑세스토큰을 저장하고 로그인을 하면 엑세스토큰을 갱신 시켜준다.

module.exports = router;