const jwt = require('jsonwebtoken');

const {userList, userSelect, userInsert, userPwUpdate, userRefresh, userDelete} = require('../models');

exports.UserList = async(req,res)=>{
    try {
        const data = await userList();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// 회원 가입
exports.SignUp = async(req,res)=>{
    const {user_id,user_pw} = req.body;
    try {
        await userInsert(user_id,user_pw);
        res.redirect('/login');
    } catch (error) {
        console.log(error);
    }
}

// 로그인
exports.Login = async (req,res)=>{
    const {user_id,user_pw} = req.body;
    try {
        const data = await userSelect(user_id);
        // 유저 조회가 되었으면 아이디가 있는지 확인
        if(!data?.user_id){
            // 아이디가 없으면
            return res.send('아이디 없음');
        }

        if(data.user_pw !== user_pw){
            return res.send('비밀번호 틀림');
        }

        // 여기까지 넘어오면 로그인 성공
        // access token 발급
        const accessToken = jwt.sign({
            user_id : data.user_id,
            mail : "user1@naver.com",
            nick : "user1"
        },process.env.ACCESS_TOKEN_KEY,{
            expiresIn : "5s"
        });

        // refresh token 발급
        const refreshToken = jwt.sign({
            user_id : data.user_id
        },process.env.REFRESH_TOKEN_KEY,{
            expiresIn: "5m"
        })

        await userRefresh(user_id,refreshToken);
        req.session.access_token = accessToken;
        req.session.refresh_token = refreshToken;
        res.send({access : accessToken, refresh : refreshToken});
    } catch (error) {
        console.log(error);
    }
}

// 유저 토큰 검증
exports.VerifyLogin = async(req,res,next)=>{
    // next 함수를 실행시켜주면 다음 미들웨어로 이동
    // next();
    const {access_token, refresh_token} = req.session;
    jwt.verify(access_token,process.env.ACCESS_TOKEN_KEY,(err,acc_decode)=>{
        if(err){
            jwt.verify(refresh_token,process.env.REFRESH_TOKEN_KEY,async(err,ref_decode)=>{
                if(err){
                    console.log("refresh token 만료");
                    res.send("다시 로그인 하세요");
                }else{
                    const data = await userSelect(ref_decode.user_id);
                    if(data.refresh == refresh_token){
                        const accessToken = jwt.sign({
                            user_id : ref_decode.user_id
                        },process.env.ACCESS_TOKEN_KEY,{
                            expiresIn: "5s"
                        })
                        req.session.access_token = accessToken;
                        console.log("access token 재발급 완료");
                        next();
                    }else{
                        res.send('중복 로그인 방지')
                    }
                }
            })
        }else{
            console.log('로그인 정상 유지 중');
            next();
        }
    })
}