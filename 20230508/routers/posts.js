// 게시글의 라우터만 모아놓을 파일
const express = require("express");

// 라우팅을 관리할 수 있게 도와주는 메소드
// 라우팅의 내용을 작성해놓고 app.use로 추가
const router = express.Router();
// 컨트롤러에 작성한 내용 가져오기
const {ViewPostAll,SelectPost,Insert,Update,Delete} = require("../controllers/posts");

router.get("/",async (req,res)=>{
    try {
        const data = await ViewPostAll(req,res);
        res.render("main",{data});
    } catch (error) {
        console.log("게시글 리스트 화면 호출에서 에러남");
    }
})

// 글 상세 페이지
router.get("/view/:id",async (req,res)=>{
    try {
        const data = await SelectPost(req,res);
        res.render('detail',{data});
    } catch (error) {
        console.log("상세 페이지 그리다가 에러남");
    }
})

// 글 추가 페이지
router.get("/insert",async (req,res)=>{
    res.render('insert');
})

// 글 추가 요청 들어왔을 때
router.post('/insert',async (req,res)=>{
    try {
        await Insert(req,res);
        res.redirect("/posts");
    } catch (error) {
        console.log("글 추가하다 에러남. 프론트");
    }
})

// 글 수정 페이지
router.get("/edit/:id",async (req,res)=>{
    try {
        const data = await SelectPost(req,res);
        res.render("edit",{data});
    } catch (error) {
        console.log("수정 페이지 그리다 에러남");
    }
})

// 글 수정 요청 들어왔을 때
router.post("/edit/:id",async (req,res)=>{
    try {
        await Update(req,res);
        res.redirect("/posts");
    } catch (error) {
        console.log("글 수정하다 에러남. 프론트");
    }
})

// 글 삭제 처리
router.get("/delete/:id",async (req,res)=> {
    try {
        await Delete(req,res);
        res.redirect("/posts");
    } catch (error) {
        console.log("글 삭제하다가 에러남. 프론트");
    }
})

module.exports = router;