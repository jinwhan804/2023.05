const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Login = async(req,res)=>{
    try {
        const {user_id,user_pw} = req.body;
        const user = await User.findOne({
            where : {user_id}
        });
        
        if(user == null){
            return res.send('아이디가 존재하지 않습니다.');
        }

        const same = bcrypt.compareSync(user_pw, user.user_pw);
        const {id, name, age} = user;

        if(same){
            let token = jwt.sign({
                id,
                name,
                age
            },process.env.ACCESS_TOKEN_KEY,{
                expiresIn : "20m"
            });
            req.session.access_token = token;
            // 여기서의 / 경로는 백엔드의 도메인 경로 루트
            // 그렇기 때문에 프론트의 경로를 작성
            return res.redirect('http://127.0.0.1:5500/frontEnd/main.html');
            // 이렇게 redirect를 할게 아니면 프론트에서 응답 받은 값으로 조건 분기 처리해서 페이지를 전환시켜주면 된다.
            // 이 경우에는 배포된 프론트의 경로
        }else{
            return res.send('비밀번호 오류');
        }
    } catch (error) {
        console.log(error);
    }
}