// crypto : 암호화

// 암호화에는 단방향, 양방향 방식이 존재
// 단방향 암호화는 복호화가 불가능하다.(원본값을 알 수 없다. 안전성이 높다.)
// 양방향 암호화는 복호화가 가능하다.(데이터를 전송할 때 암호화해서 전달할 때 사용한다.)
// 복호화란 암호문을 원본으로 돌려놓는 것.

// 일반적으로 사용되는 (ex. 네이버) 비밀번호 찾기를 시도하면 알려주는게 아니라 변경이 가능하게 해준다. 원본 비밀번호를 알 수 없기 때문이다.

// 단방향 암호화는 원래 값을 알 수 없게 복잡한 알고리즘으로 암호화 시켜주기 때문에 원본값으로 복호화할 수 없다.

// crypto 모듈을 사용해 암호화 진행 : 내장 모듈, 기본적인 암호화 알고리즘 기능을 제공.
const crypto = require('crypto');

const pw = 'admin123';

// 해시화 : 알고리즘을 통해 데이터를 고정된 크기의 고유한 값으로 바꿔주는 것.
// 해시 객체 생성
let hashA = crypto.createHash('sha256');
// 사용할 알고리즘은 sha256 암호 알고리즘 사용
// 데이터를 256 비트의 고정 크기 해시 값으로 변환해주는알고리즘
// 원본 데이터의 길이와 상관없이 항상 256비트(32바이트)의 해시 값을 생성한다. => 64자리 16진수로 표현
// 포토샵 색상 코드 같은 곳에서 사용된다.

// 비밀번호를 해시객체에 넣는다
let hashing = hashA.update(pw);  // 매개 변수로 암호화 시킬 문자열을 전달한다.

// console.log(hashing);

// 객체를 확인해보면 인코딩이 완료되지 않아 false가 호출된다.
// digest : 해시값을 반환하는 메소드, 매개 변수로 반환 받을 인코딩 방식 지정

let hashString = hashing.digest('hex');
// 해시값을 16진수의 문자열로 반환
// console.log(hashString);

// 해시화를 하면 일정한 문자열이 나오는데 salt 값을 사용해서 예측이 불가한 데이터를 만들어준다.
// salt : 랜덤한 값을 만들어서 원본의 데이터에 추가하여 암호화 시켜주는 메소드

// crypto.randomBytes(32, (err,result)=>{
//     // 32bite의 랜덤한 데이터 생성
//     if(err){
//         console.log(err);
//     }else{
//         // result를 16진수로 변경
//         console.log(result.toString('hex'));
//     }
// })

// 회원가입할 때 계정마다 salt값을 주고 사용하는 방법도 존재. (salt 값을 데이터 베이스에 같이 저장)
// 모든 패스워드가 고유의 salt값을 가지고 있게 만들 수 있다.

// salt값을 만들어주는 함수
const createSalt = ()=>{
    // 암호화에 시간이 좀 걸리기 때문에
    return new Promise((resolve,reject)=>{
        crypto.randomBytes(64,(err,result)=>{
            if(err) reject(err);
            // 실패 시 err 객체 reject 메소드로 반환
            // 성공하면 resolve 메소드로 결과를 16진수 변환해서 반환
            resolve(result.toString('hex'));
        })
    })
}

// 키 스트레칭 기법 : 해시 함수를 여러번 반복 시켜서 시간을 일부러 오래 걸리게 만드는 기법
// 비밀번호를 대입해서 해킹을 시도하는 경우 암호화 작업을 일부러 오래 걸리게 만들어서 어렵게 만드는 기법

// pbkdf2 메소드를 사용해 키 스트레칭 기법 적용

const createHash = (salt,password)=>{
    return new Promise((resolve,reject)=>{
        crypto.pbkdf2(
            password,  // 해싱할 값을 문자열로 전달
            salt, 
            20000,      // 키 스트레칭 반복 횟수
            64,         // 해시값의 바이트
            "sha256",   // 해시화 알고리즘
            (err,hash)=>{
                if(err) reject(err);
                resolve(hash.toString('hex'));
            }
        )
    })
}

const test = async ()=>{
    const salt = await createSalt();
    const hash = await createHash(salt,pw);
    console.log(hash);
}

// test();


// 간단한 회원가입 만들기

const express = require('express');
const mysql2 = require('mysql2/promise');
const path = require('path');

const mysql = mysql2.createPool({
    user : 'root',
    password : 'kjw204024!@$',
    database: 'test5',
    multipleStatements : true
})

const app = express();

app.set('views',path.join(__dirname,"page"));
app.set('view engine', "ejs");
app.use(express.urlencoded({extended : false}));

const usersInit = async ()=>{
    try {
        await mysql.query('SELECT * FROM users');
    } catch (error) {
        await mysql.query('CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY,user_id VARCHAR(20),user_pw VARCHAR(128),salt VARCHAR(128))');
    }
}

usersInit();

app.get('/',(req,res)=>{
    res.render('join');
})

app.post('/join',async (req,res)=>{
    const {user_id,user_pw} = req.body;
    const salt = await createSalt();
    const hash = await createHash(salt,user_pw);
    await mysql.query('INSERT INTO users (user_id,user_pw,salt)VALUES(?,?,?)',[user_id, hash, salt]);
    res.redirect('/login');
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.post('/login',async(req,res)=>{
    const {user_id,user_pw} = req.body;
    const [result] = await mysql.query('SELECT * FROM users WHERE user_id=?',[user_id]);
    if(result[0]?.salt){
        const salt = result[0].salt;
        const hash = await createHash(salt,user_pw);
        if(hash == result[0].user_pw){
            res.send('로그인 됨');
        }else{
            res.send('비밀번호 오류');
        }
    }else{
        res.send('유저 없음');
    }
})

app.listen(5000,()=>{
    console.log("Server Open!!");
})