const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Login = async (req,res)=>{
    try {
        const {user_id,user_pw} = req.body;
        const user = await User.findOne({
            where : {user_id}
        });

        if(user == null){
            return res.send('유저 정보가 없습니다. 회원가입을 진행해주세요.');
        }

        const same = bcrypt.compareSync(user_pw, user.user_pw);
        if(same){
            let token = jwt.sign({
                id : user.id,
                name : user.name,
                age : user.age
            },process.env.ACCESS_TOKEN_KEY,{
                expiresIn : "5m"
            });
            req.session.access_token = token;
            res.redirect('/boarder');
        }else{
            res.send('비밀번호가 일치하지 않습니다.');
        }
    } catch (error) {
        console.log(error);
    }
}