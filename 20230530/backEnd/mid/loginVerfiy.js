const jwt = require('jsonwebtoken');
const {User} = require('../models');

exports.IsLogin = (req,res,next)=>{
    const {token} = req.session;
    jwt.verify(token,'accesstoken',(err,acc_decoded)=>{
        if(err){
            res.send('세션만료');
        }else{
            req.acc_decoded =acc_decoded;
            next();
        }
    })
}