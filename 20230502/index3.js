// express와 템플릿 엔진을 같이 사용해서 게시판 만들기
// ejs 템플릿 엔진 사용

// 템플릿 엔진은 서버측에서 html을 만들어서 브라우저에 보여주는 것.
// 서버 사이드 렌더링

// ejs : html과 동일하게 js를 같이 추가해서 동적인 웹페이지를 만들 수 있는 템플릿 엔진
// express에서 ejs를 기본적으로 지원한다.
// 서버측에서 html 템플릿을 그려준다.
// 이러한 기법을 서버 사이드 렌더링이라고 한다.
// 검색 기능 및 페이지 로딩이 빠르다.
// ejs 설치 명령어
// npm i ejs

// body-parser는 express 미들웨어
// 요청으로 받은 body의 내용을 req 요청 객체 안에 있는 body 객체로 담아준다.
// req.body로 호출 가능해진다.
// 미들웨어라는 건 쉽게 요청과 응답을 하는 사이 중간에 동작하는 함수.

// 사용할 모듈 : express, ejs, mysql2, body-parser, path

// 모듈을 2개 이상 받는 방법
// npm i 모듈명 모듈명 ... (한 칸씩 띄어서 작성)

const express = require("express");
const mysql2 = require("mysql2");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// express에 set 메소드와 use 메소드가 있다.
// set 메소드 : express의 view 등을 설정할 수 있다.
// 그려줄 파일이 있느 폴더의 경로 같은 설정을 할 수 있다.

// use 메소드 : 요청 또는 응답 시 실행되는 미들웨어를 추가할 수 있다.

// express의 view 속성을 경로로 지정

// view 엔진 : html 등의 템플릿 파일을 보여주는 역할
app.set("views",path.join(__dirname,"views"));

// view 엔진을 ejs로 사용하겠다는 설정
// ejs 설치 필요
// 설정을 ejs로 했기 때문에 확장자를 ejs로 변경해줘야 한다.
app.set("view engine", "ejs");

// app.use(
//     bodyParser.urlencoded({
//         // urlencoded : from 데이터를 파싱을 도와주는 미들웨어
//         extended : false,
//     })
//     // extended의 옵션 : true일 때 쿼리 스트링 모듈의 기능이 조금 더 확장된 qs 모듈을 사용.
//     // false일 때는 express 기본 내장된 쿼리 스트링 모듈을 사용.
//     // 권장은 false.
// )

// express 버전이 올라가면서 bodyParser를 지원해준다.
app.use(express.urlencoded({extended : false}));

// mysql 연결
const _mysql = mysql2.createConnection({
    user : "root",
    password : "kjw204024!@$",
    database : "test2"
})

_mysql.query("SELECT * FROM products",(err,res)=>{
    if(err){
        const sql = "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
        _mysql.query(sql);
    }else{
        console.log(res);
    }
});

app.get("/",(req,res)=>{
    // 루트 경로로 요청 시 처리
    // 메인 페이지
    _mysql.query("SELECT * FROM products",(err,result)=>{
        // render 메소드 : view 엔진이 문자열을 html로 브라우저에 반환해서 랜더링 해준다.
        // 첫 번째 매개 변수가 view로 설정한 폴더 경로에 파일의 이름을 문자열로 전달.
        // 두 번째 매개 변수는 템플릿 엔진에서 사용할 데이터
        res.render("main",{data : result});
    });
});

// 리스트 추가하는 페이지
// get 요청인지 post 요청인지에 따라 라우터가 나누어진다.
app.get("/insert",(req,res)=>{
    res.render("insert");
});

app.post("/insert",(req,res)=>{
    const data = req.body;
    // body 객체 안에 form에서 요청으로 보낸 데이터가 객체로 들어있다.
    // 객체 안에 있는 키값들은 input등의 name으로 정해준 키로 값이 들어있다.
    
    // 요청한 데이터를 데이터베이스에 추가.
    const sql = "INSERT INTO products (name,number,series)VALUES(?,?,?)";
    console.log(data);
    // query 메소드에 두 번째 매개변수로 배열의 형태로 value를 전달할 수 있다.
    // value의 순서대로 배열에 넣어 주어야한다.
    _mysql.query(sql,[data.name,data.number,data.series],()=>{
        // redirect 메소드로 매개 변수로 전달한 url로 페이지 전환 시킨다.
        res.redirect("/");
    });
})

// 삭제 설정
app.get("/delete/:id",(req,res)=>{
    // :id : url 요청에서 파라미터 값 

    // ex) http://localhost:3000/delete/1 => {id : 1} 이라는 요청의 객체가 들어있다.
    // req.params.id === 1

    const sql = "DELETE FROM products WHERE id=?";
    _mysql.query(sql,[req.params.id],()=>{
        res.redirect("/");
    })
})

app.listen(5000,()=>{
    console.log("Server Open.");
})