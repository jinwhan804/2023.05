const {User} = require('../models');
const bcrypt = require('bcrypt');

exports.SignUp = async(req,res)=>{
    try {
        const {name, age, user_id, user_pw} = req.body;
        const user = await User.findOne({
            where : {user_id}
        });
        // 중복 체크를 위해 유저를 조회
        if(user != null){
            return res.send('중복된 ID 입니다.');
        }

        // 회원 가입
        // hashSync : 동기적으로 실행할 수 있는 메소드
        const hash = bcrypt.hashSync(user_pw,10);
    User.create({
        name,
        age,
        user_id,
        user_pw : hash
    });

    res.redirect('/login');
    } catch (error) {
        console.log(error);
    }
}