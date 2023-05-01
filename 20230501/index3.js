// 내장 모듈 http, fs
const http = require("http");
const fs = require("fs");

const server = http.createServer((req,res)=>{
    // createServer 서버 객체 만들고 
    // 콜백 함수 매개 변수로 req는 요청 내용을 가지고 있는 객체
    // res는 응답 내용을 가지고 있는 객체

    // 응답 헤더 내용 설정
    res.setHeader("Content-Type", "application/json", "charset=utf-8");

    // 요청한 url 확인
    const URL = req.url;

    // 요청한 url이 파비콘이면 무시
    if(URL === "/favicon.ico"){
        res.end();
        // end() 내용을 응답하고 종료하는 메소드
        // 응답을 안 해주면 클라이언트는 요청을 하고 계속 기다림.
        return;
    }

    // 요청한 URL에 따라서 응답
    switch (URL) {
        case "/":
            fs.readFile("./views/main.html",(err,data)=>{
                if(err){
                    res.statusCode = 404;
                    res.end("파일 없음");
                }else{
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "text/html");
                    res.end(data);
                }
            })
            break;
        case "/list":
            fs.readFile("./views/list.html",(err,data)=>{
                if(err){
                    res.statusCode = 404;
                    res.end("파일 없음");
                }else{
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "text/html");
                    res.end(data);
                }
            })
            break;
        case "/add":
            fs.readFile("./views/add.html",(err,data)=>{
                if(err){
                    res.statusCode = 404;
                    res.end("파일 없음");
                }else{
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "text/html");
                    res.end(data);
                }
            })
            break;    
        default:
            break;
    }
});

server.listen(4000,()=>{
    console.log("서버 열려있는 중");
})