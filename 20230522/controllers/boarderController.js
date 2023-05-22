const {User, Post} = require('../models');

exports.boarderMain = async(req,res)=>{
    // 해당 유저의 마이 페이지
    const {acc_decoded} = req;
    const user = await User.findOne({where : {name : acc_decoded.name}});
    res.render('main',{data : user});
}

exports.createBoarder = async(req,res)=>{
    const {acc_decoded} = req;
    const {user_post} = req.body;
    await Post.create({
        msg : user_post,
        user_id : acc_decoded.id
    });
    // 해당 유저가 작성한 글들을 볼 수 있는 페이지로 이동
    res.redirect(`/boarder/view/${acc_decoded.id}`);
}

exports.boarderView = (req,res)=>{
    User.findOne({
        where : {id : req.params.id},
        include : [{model : Post}]
    }).then((e)=>{
        // 화살표 함수는 중괄호가 빠지면 바로 반환 시킨다. return 문 생략 가능
        e.dataValues.Posts = e.dataValues.Posts.map((i)=> i.dataValues);
        const Posts = e.dataValues;
        res.render('boarder',{data : Posts});
    })
}

exports.updateBoarder = async (req,res)=>{
    const {acc_decoded} = req;
    const {msg} = req.body;
    const {id} = req.params;
    // 수정 메소드 사용
    // 첫 번째 매개 변수는 객체로 수정할 값
    // 두 번째 매개 변수는 객체로 조건 수정할 내용
    await Post.update({msg},{where : {id}});
    res.redirect(`/boarder/view/${acc_decoded.id}`);
}

exports.boarderDel = async (req,res)=>{
    // 삭제 메소드 사용
    await Post.destroy({
        where : {id : req.params.id}
    });
    res.redirect('/boarder');
}