const router = require('express').Router();
const dot = require('dotenv').config();
const jwt = require('jsonwebtoken');

router.post("/",(req,res)=>{
    const token = req.session.token;
    // 토큰이 유효한지 검증
    // verify : 토큰이 유효한지 검증하는 메소드
    // 첫 번째 매개 변수로 토큰을 전달
    // 두 번째 매개 변수로 key 전달
    // 세 번째 매개 변수로 콜백함수 전달
    // 콜백의 첫 번째 매개 변수로 에러 내용 전달
    // 콜백의 두 번째 매개 변수로 해석된 객체 전달
    const KEY = process.env.KEY;
    jwt.verify(token,KEY,(err,decoded)=>{
        if(err){
            console.log('토큰이 썩음');
            res.send('토큰 이상함요')
        }else{
            // 해석된 객체
            console.log(decoded);
            res.send(decoded);
        }
    })
})

module.exports = router;