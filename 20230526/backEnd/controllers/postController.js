const {Post} = require('../models');

exports.PostViewAll = async (req,res)=>{
    try {
        const post = await Post.findAll();
        res.json(post);
    } catch (error) {
        console.log('포스트 컨트롤러에서 전체 글 보여주다가 에러남');
        console.log(error);
    }
}

exports.PostViewSelect = (req,res)=>{
    try {
        const id = req.body.data;     
        req.session.pageId = id;
        console.log(req.session);
        res.send('http://127.0.0.1:5500/frontEnd/detail.html');
    } catch (error) {
        console.log('포스트 컨트롤러에서 글 하나 보여주다가 에러남');
        console.log(error);
    }
}

exports.PostViewData = async (req,res)=>{
    const {pageId} = req.session;
    const post = await Post.findOne({where : {id : pageId}});
    res.json(post);
}

exports.PostInsert = async(req,res)=>{
    try {
        const {acc_decoded} = req;
        const {title, content} = req.body;
        console.log(req.body)
        await Post.create({
            title,
            content,
            user_name : acc_decoded.name,
            userId : acc_decoded.id
        })

        res.redirect('http://127.0.0.1:5500/frontEnd/post.html');
    } catch (error) {
        console.log('포스트 컨트롤러에서 글 추가하다가 에러남');
        console.log(error);
    }
}