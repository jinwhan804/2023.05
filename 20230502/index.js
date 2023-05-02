// http 요청과 응답을 조금 더 편하게 사용할 수 있도록 도와주는 모듈
// express : nodejs에서 가장 많이 사용되는 모듈. nodejs 프레임워크
// http 요청과 응답을 더 쉽게 작성할 수 있도록 도와준다.
// 기본적인 기능만 포함하고 있어서 자유도가 높고 라우팅 미들웨어 등 개발자가 원하는 방식으로 구성할 수 있다.
// 본인만의 보일러 플레이팅이 가능.

// 보일러 플레이팅 : 반복적인 작업을 피할 수 있도록 미리 개발자가 작성을 하고 개발의 생산성을 향상 시킬 수 있는 기술

// express 모듈은 설치를 해야한다.(npm 사용)
// npm i express로 node에서 설치 가능

const express = require("express");

// 서버 객체 생성
const app = express();

// 메소드를 사용해서 라우팅을 설정
// 요청의 내용이 get 메소드인지 post 메소드인지 확인하여 작용
// app.get();
// app.post();

app.get("/",(req,res)=>{
    // send 메소드로 응답하고 종료
    res.send("Hello nodejs.");
})

app.listen(5000,()=>{
    console.log("서버 열림");
});

// package json에서 스크립트 명령어 작성
// "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
//     "start" : "node index.js",
//     "dev" : "node index.js"
//   },

// start 명령어로 작성될 경우 npm start로 실행이 가능하지만
// 별도의 네이밍을 사용하는 경우 npm run 명령어로 실행해야 한다.
// ex) dev 명령어 => npm run dev 로 실행.