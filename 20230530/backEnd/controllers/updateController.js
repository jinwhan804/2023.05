const {User} = require('../models');

exports.Update = async(req,res)=>{
    try {
        const {id,name,image} = req;
        await User.update({name,image},{
            where : {user_id : id}
        })
        res.send('저장완료');
    } catch (error) {
        console.log('업데이트 컨트롤러에서 업데이트하다가 에러남');
        console.log(error);
    }
}