// 프로젝트 시작 시 npm 설정부터
// npm init -y

// 사용할 모듈 : express, ejs, mysql2, path
const express = require("express");
const mysql2 = require("mysql2");
const path = require("path");

const app = express();

const _mysql = mysql2.createConnection({
    user : "root",
    password : "kjw204024!@$",
    database : "test2",
    // 다중 쿼리문 사용할 수 있는 옵션
    // multipleStatements : true
    multipleStatements : true
});

// console.log(app);

// express의 views 속성을 설정 (파일들의 경로 설정)
// express에서 서버 사이드 렌더링을 지원하기 위해 view 엔진을 사용한다.
// view 엔진이 템플릿 파일을 보여주는 역할을 한다.
// 기본값은 'C:\\Users\\Koo\\Desktop\\coding\\5월\\20230504\\views'로 지정되어 있다.
app.set("views",path.join(__dirname,"page"));
// console.log(app);
// set 메소드를 통해 'C:\\Users\\Koo\\Desktop\\coding\\5월\\20230504\\page'로 바꿔줄 수 있다.

// view 엔진으로 ejs를 사용할 수 있게 설정
app.set("view engine","ejs");

// express에서 bodyparser를 기본적으로 지원한다.
// extended : 깊은 객체를 지원할지에 대한 설정
app.use(express.urlencoded({extended : false}));

app.get("/",(req,res)=>{
    // render 메소드로 view 엔진이 문자열을 html로 브라우저에 전달해준다.
    // 첫 번째 매개변수가 파일의 이름
    // 두 번째 매개변수가 전달할 데이터
    res.render("main");
})

app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.post("/login",(req,res)=>{
    // 요청에 대한 내용은 req 객체에 들어있다.
    // body 객체의 안에 들어 있다.
    const {user_id, user_pw} = req.body;

    // 데이터베이스에 아이디와 비밀번호가 동일한 내용이 있는지 확인하고 데이터가 있다면
    // 사용자가 회원가입을 진행했다는 내용이니 로그인 시켜준다.

    // user_id와 user_pw를 가지고 데이터를 조회
    const sql = "SELECT * FROM users WHERE user_id = ? AND user_pw = ?";
    _mysql.query(sql,[user_id,user_pw],(err,result)=>{
        if(err){
            // 로그인 실패
            res.render("mypage");
        }else{
            // 로그인 성공
            console.log(result);
            res.render("mypage",{data : result[0]});
        }
    })

    // res.send("user_id : " + user_id + "user_pw : " + user_pw);
})

// 회원 가입
app.post("/signup",(req,res)=>{
    const {user_id, user_pw} = req.body;
    console.log(user_id,user_pw);
    const sql = 'INSERT INTO users (user_id, user_pw)VALUES(?,?)';

    _mysql.query(sql,[user_id,user_pw],(err)=>{
        // 에러 발생 시 에러의 내용이 들어오는 객체
        if(err){
            res.render("signUpErr");
        }else{
            res.redirect("login");
        }
    })
})

// 게시판 목록 페이지
app.get("/list",(req,res)=>{
    const sql = "SELECT * FROM products";
    _mysql.query(sql,(err,result)=>{
        res.render("list",{data : result});

    })
})

// 게시판 등록 페이지
app.get("/insert",(req,res)=>{
    res.render("insert");
})

app.post("/insert",(req,res)=>{
    const {name, number, series} = req.body;
    const sql = "INSERT INTO products (name,number,series)VALUES(?,?,?)";
    _mysql.query(sql,[name,number,series],()=>{
        res.redirect("/list");
    })
})

// 게시글 삭제
app.get("/delete/:id",(req,res)=>{
    // /delete/1 == req.params = {id : 1}
    // 글의 아이디를 조회해서 글의 내용을 찾을 수 있다.
    const sql = "DELETE FROM products WHERE id = ?; SET @CNT = 0; UPDATE products SET products.id = @CNT:=@CNT+1; ALTER TABLE products AUTO_INCREMENT = 0;";
    
    // DELETE FROM products WHERE id = ? : 값을 제거하는 쿼리문. 테이블 내에서 ?에 들어간 값을 가지고 있는 행을 찾아 제거.
    
    // SET @CNT = 0 : 카운트를 0으로 초기화
    
    // UPDATE products SET products.id = @CNT:=@CNT+1 : products의 id를 갱신시켜준다.

    // ALTER TABLE products AUTO_INCREMENT = 0 : AUTO_INCREMENT을 증가된 상태를 0으로 초기화.

    _mysql.query(sql,[req.params.id],()=>{
        res.redirect("/list");
    })
})

// 수정하는 페이지
app.get("/edit/:id",(req,res)=>{
    const sql = "SELECT * FROM products WHERE id = ?";
    const id = req.params.id;
    _mysql.query(sql,[id],(err,result)=>{
        res.render("edit",{data : result[0]});
    })
})

app.post("/edit/:id",(req,res)=>{
    const {name,number,series} = req.body;
    const sql = "UPDATE products SET name=?, number=?, series=? WHERE id=?";
    const id = req.params.id;
    _mysql.query(sql,[name,number,series,id],(err,result)=>{
        res.redirect("/list");
    })
})

// 포트 지정
const PORT = 8080;

app.listen(PORT,()=>{
    console.log("Server Open.");
})