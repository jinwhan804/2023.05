// 지난 시간 만들었던 게시판은 한 파일에 모든 코드가 다 들어갔었음.
// MVC 패턴으로 다시 만들어 보기
// MVC 패턴 : 가장 많이 사용되고 기본적인 디자인 패턴, 유지 보수와 확장성을 고려하여 개발할 수 있다.
// 협업 시 코드의 표준화에도 용이하다.
// Model-View-Controller의 줄임말

// Model : 데이터를 다루는 로직. 글 선택, 글 작성 등의 기능들의 어플리케이션 동작을 관리하는 폴더
// View : 사용자가 볼 수 있는 화면의 데이터를 표시하는 파일을 관리하는 역할
// Controller : Model과 View 사이에서 동작을 제어하는 역할. Model의 상태를 가지고 View에 반영 시켜주는 것.
// 이런 패턴으로 작업하면 유지 보수와 코드의 표준화를 유지할 수 있다.

const express = require("express");
const path = require("path");
const postRouter = require("./routers/posts");

const app = express();

PORT = 8080;

// view 엔진으로 ejs을 사용
// 다수의 모듈을 설치할 때
// npm i express ejs mysql2

// 기본 view 경로를 page 폴더로 설정
app.set("views",path.join(__dirname,"page"));

// 기본 view engine을 ejs로 설정
app.set("view engine", "ejs");

// body 객체 사용하기 위해 미들웨어 추가
app.use(express.urlencoded({extended : false}));

// 정적인 파일을 사용하기 위해 미들웨어 추가
// 정적인 파일을 모아놓은 폴더를 경로로 지정
// 앞에 매개변수로 경로를 지정하지 않으면 기본적으로 루트 경로를 지정한다.
app.use(express.static(path.join(__dirname,"public")));

// app.use("/css",express.static(path.join(__dirname,"public")));
// 이렇게 지정한 경우 ejs단에 /css/파일명으로 접근하면 된다.
// 예 : <link rel="stylesheet" href="/css/main.css">

// postRouter 객체에 get 메소드로 루트 경로를 지정했을 때 "/posts"가 경로로 추가되어서 라우팅된다.
// 게시글은 /posts가 붙어야 요청이 된다.
app.use("/posts",postRouter);

app.listen(PORT,()=>{
    console.log("Server Open.");
})