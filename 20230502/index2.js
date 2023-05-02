// 사용할 모듈 : express, path
// path : 내장 모듈. 경로에 대한 조작을 도와주는 모듈
// 파일 시스템의 경로들을 상대경로나 절대경로로 설정할 수 있도록 도와준다.
// 즉, 상대경로나 절대경로를 쉽게 연결할 수 있도록 메소드를 지원해준다.

const express = require("express");
const path = require("path");

// 서버 인스턴스 생성
const app = express();

// 요청해서 데이터를 가져오는 메소드
// 
app.get("/",(req,res)=>{ // 루트 경로의 처리
    // 전달 받은 경로를 합쳐준다.
    const body = path.join(__dirname,"views", "index.html");
    console.log(body);
    // res.send("");
    // sendFile : html 파일을 브라우저에서 읽을 수 있도록 보내준다.
    res.sendFile(body);
});

app.get("/list",(req,res)=>{
    const body = path.join(__dirname,"views", "list.html");
    res.sendFile(body);
});

app.get("/mypage",(req,res)=>{
    const body = path.join(__dirname,"views", "mypage.html");
    res.sendFile(body);
});

app.listen(5000,()=>{
    console.log("Server Open.");
});