const {User} = require('../models');

exports.SignUp = async(req,res)=>{
    try {
        const {user_id,user_pw,name} = req.body;
        const user = await User.findOne({
            where : {user_id}
        })

        if(user != null){
            return res.send('아이디 중복');
        }

        await User.create({
            user_id,
            user_pw,
            name
        })

        res.send('http://127.0.0.1:5500/frontEnd/login.html');
    } catch (error) {
        console.log('사인업 컨트롤러 회원가입에서 에러남');
        console.log(error);
    }
}