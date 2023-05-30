const {User} = require('../models');
const jwt = require('jsonwebtoken');

exports.Login = async (req,res)=>{
    try {
        const {user_id,user_pw} = req.body;
        const user = await User.findOne({
            where : {user_id}
        })

        if(user == null){
            return res.send('아이디 없음');
        }

        if(user_pw != user.user_pw){
            return res.send('비밀번호 오류');
        }

        const token = jwt.sign({
            id : user.user_id,
            name : user.name,
            img : user.image
        },'accesstoken',{
            expiresIn : '100m'
        })

        req.session.token = token;

        res.send('http://127.0.0.1:5500/frontEnd/mypage.html');
    } catch (error) {
        console.log('로그인 컨트롤러에서 로그인 하다 에러남');
        console.log(error);
    }
}