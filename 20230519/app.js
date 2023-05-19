// 시퀄라이즈 ORM 모듈(Object Relational Mapping)
// 객체와 데이터 베이스를 ORM 라이브러리가 매핑을 시켜줘서 자바스크립트 구문으로 sql을 제어할 수 있다.
// 자바스크립트로만 sql 작업을 할 수 있도록 도와주는 라이브러리

// 설치 모듈 : express ejs sequelize mysql2

const express = require('express');
const dot = require('dotenv').config();
const {sequelize, User, Post} = require('./models');
const path = require('path');

const app = express();

app.set("views", path.join(__dirname, 'page'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : false}));

// 시퀄라이즈 구성 연결 매핑
// sync 함수 : 데이터 베이스를 동시화 시켜주는 메소드
sequelize.sync({focus : true}).then(()=>{
    // 연결 성공
    console.log('연결 성공');
}).catch((err)=>{
    // 연결 실패
    console.log(err);
})

app.get("/",(req,res)=>{
    res.render("create");
})

app.post('/create',(req,res)=>{
    const {name, age, msg} = req.body;
    // create 메소드는 쿼리문 중 INSERT 문을 실행시켜주는 메소드
    // 매개 변수로 컬럼의 내용을 객체로 만들어서 전달한다.
    User.create({
        name : name,
        age : age,
        msg : msg
    })
    res.send("값 추가 완료");
})

app.get('/main',(req,res)=>{
    // 유저 전체 조회
    // findAll 메소드의 매개 변수로 검색 조건을 객체로 추가할 수 있다.
    User.findAll({}).then((e)=>{
        // 성공 시
        res.render('main',{data : e});
    }).catch((e)=>{
        // 실패 시
        res.send('유저 조회 실패');
    });
})

app.post('/create_post',(req,res)=>{
    const {name,value} = req.body;
    console.log(name,value);
    // findOne : 하나의 값을 조회하는 메소드
    User.findOne({
        // 검색 조건 추가
        where : {name : name}
    }).then((e)=>{
        Post.create({
            msg : value,
            user_id : e.id
        })
    })
    res.send();
})

app.get('/view/:name',(req,res)=>{
    // 해당 유저를 조회하고 가지고 있는 글 호출
    User.findOne({
        // 해당 이름의 유저를 조회
        where : {name : req.params.name},
        // raw 속성을 주면 관계형으로 불러온 값을 다 풀어서 볼 수 있다.
        // raw : true,
        // 해당 유저의 id로 참조된 user_id가 있는 post 테이블의 값을 같이 조회한다.
        include : [
            // 조회할 모듈
            {model : Post}
        ]
    }).then((e)=>{
        console.log(e);
        e.dataValues.Posts = e.dataValues.Posts.map((i)=> i.dataValues);
        const Posts = e.dataValues;
        console.log(Posts)
        res.render('view',{data : Posts})
    })
})

app.listen(5000, ()=>{
    console.log("Server Open!!");
})