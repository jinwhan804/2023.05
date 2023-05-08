// 경로를 폴더까지만 지정하면 index.js를 기본적으로 찾는다.
// 이렇게 되면 경로에 폴더 명까지만 작성하면 알아서 index.js를 찾아서 작업을 진행한다.
const {posts} = require("../models");

// 전체 글 조회 함수
exports.ViewPostAll = async function(req,res){
    try {
        const data = await posts.viewPostAll();
        return data;
    } catch (error) {
        console.log("전체 글 조회 컨트롤러에서 에러남");
    }
}

// 글 하나 조회 함수
exports.SelectPost = async function(req,res){
    // req 요청 객체를 매개변수로 전달해 줄 예정
    const {id} = req.params;
    try {
        const data = await posts.selectPost(id);
        return data;
    } catch (error) {
        console.log("글 하나 조회 컨트롤러 에러남");
    }
}

// 글 추가 함수
exports.Insert = async function(req,res){
    // req 요청 객체를 매개변수로 전달해 줄 예정
    const {title,content} = req.body;
    try {
        await posts.insert(title,content);
    } catch (error) {
        console.log("글 추가 컨트롤러 에러남");
    }
}

// 글 수정 함수
exports.Update = async function(req,res){
    const {id} = req.params;
    const {title,content} = req.body;
    try {
        await posts.update(id,title,content);
    } catch (error) {
        console.log("글 수정 컨트롤러 에러남");
    }
}

// 글 삭제 함수
exports.Delete = async function(req,res){
    const {id} = req.params;
    try {
        await posts.delete(id);
    } catch (error) {
        console.log("글 삭제 컨트롤러 에러남");
    }
}