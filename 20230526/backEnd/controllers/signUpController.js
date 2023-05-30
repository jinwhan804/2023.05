const {User} = require('../models');
const bcrypt = require('bcrypt');

exports.SignUp = async (req,res)=>{
    try {
        const {name, age, user_id, user_pw} = req.body;
        const user = await User.findOne({
            where : {user_id}
        });

        if(user != null){
            return res.send('아이디가 이미 존재합니다.');
        }

        const hash = bcrypt.hashSync(user_pw,10);
        await User.create({
            name,
            age,
            user_id,
            user_pw : hash
        })

        res.redirect('http://127.0.0.1:5500/frontEnd/login.html');
    } catch (error) {
        console.log(error);
    }
}