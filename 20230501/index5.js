// mysql 연결
// 외부 모듈 설치 받아서 사용할 것.
// npm으로 모듈을 설치 받는 방법

// mysql2 모듈 설치
// 설치 명령어 : npm install (모듈명) or npm i (모듈명)

// 프로젝트 진행 중 다른 작업자가 설치한 모듈들이 없을 때 설치 받는 방법
// npm i or npm install

// "dependencies": {
//     "mysql2": "^3.2.4"
//   }
// "^3.2.4" 버전에 ^가 있는 이유 : 해당 버전이 없으면 다른 버전을 찾아서 설치한다는 내용.

// 실제 설치된 버전은 lock.json에 저장되어 있음.

// mysql 모듈도 있지만 mysql 모듈이 콜백 기반이여서 promise 기반으로 사용하기가 힘들어서 mysql2를 사용.
// 공식문서에서도 mysql2를 사용하는 것을 권장함.

// mysql2 모듈 가져오기
const mysql = require("mysql2");

// mysql 연결
// createConnection 메소드로 연결
// 매개 변수로 연결하는 mysql의 옵션을 전달해줘야 한다.
// host : 연결할 호스트
// port : 연결할 포트. 기본적으로 3306 포트에 열림.
// user : 사용자의 이름
// password : 사용자 비밀 번호
// database : 연결할 데이터베이스
const temp = mysql.createConnection({
    user : "root",
    password : "kjw204024!@$",
    database : "test2",
});
// temp에 연결한 mysql 객체를 반환

// 이 객체안에는 쿼리문을 작성해서 데이터베이스 쿼리 작업을 시켜줄 수 있는 메소드가 있다.
// query : 쿼리문을 매개 변수로 전달해서 데이터 베이스의 쿼리 작업을 시킬 수 있다.
temp.query("SELECT * FROM products",(err,res)=>{
    if(err){
        // 테이블이 없는 경우
        console.log("테이블 없음");
        const sql = "CREATE TABLE products(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20), number VARCHAR(20), series VARCHAR(20))";
        // 쿼리문 내용 
        // products라는 이름의 테이블을 만드는데 id 컬럼은 INT 숫자형이고 
        // AUTO_INCREMENT 자동으로 값이 증가하고 PRIMARY KEY 고유 값으로 적용.
        // 테이블에는 고유값을 갖는 컬럼이 무조건 하나가 있어야한다.
        // name, number, series 이 컬럼에서 VARCHAR는 문자열로 적용하는 것이고 ()안의 숫자는 해당 문자열의 최대 글자 수이다.
        temp.query(sql);
        console.log("테이블 새로 생성함");
    }else{
        console.log(res);
        console.log("테이블 존재");
    }
});