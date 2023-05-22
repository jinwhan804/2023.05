const jwt = require('jsonwebtoken');

exports.IsLogin = (req,res,next)=>{
    const {access_token} = req.session;
    jwt.verify(access_token,process.env.ACCESS_TOKEN_KEY,(err,acc_decoded)=>{
        if(err){
            res.send('세션 만료. 로그인을 다시해주세요.');
        }else{
            // acc_decoded 키를 추가해서 값을 전달
            req.acc_decoded = acc_decoded;
            // 토큰이 유효한 동안 로그인이 되어있느 것이고
            // 유저의 필요한 정보로
            // 다음 미들웨어 실행
            next();
        }
    })
}