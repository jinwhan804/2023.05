const jwt = require('jsonwebtoken');
const {User} = require('../models');

exports.IsLogin = async(req,res,next)=>{
    try {
        const {access_token} = req.session;
        jwt.verify(access_token,process.env.ACCESS_TOKEN_KEY,(err,acc_decoded)=>{
            if(err){
                res.send('세션 만료. 다시 로그인 해주세요.');
            }else{
                req.acc_decoded = acc_decoded;
                next();
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.viewUser = async (req,res)=>{
    const {acc_decoded} = req;
    console.log(acc_decoded);
    const user = await User.findOne({
        where : {name : acc_decoded.name}
    });

    // json 형태로 데이터를 응답
    res.json(user);
}