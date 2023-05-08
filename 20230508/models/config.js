const mysql2 = require("mysql2/promise");

// 이전 시간에 사용했던 createConnection 메소드는 콜백함수 기반이고 promise를 반환하지 않음.
// createConnection : 기본적인 연결을 해주는 메소드 테스트를 할 때 사용. 단일 클라이언트 접속에 용이.
// createPool : 커넥션 풀을 생성하고 관리할 수 있는 메소드. promise 객체도 반환해준다.
// 많은 클라이언트가 데이터베이스와 통신할 때 요청이 많이 들어와도 성능이 유지되고 처리하는데 유리하다.

const mysql = mysql2.createPool({
    user : "root",
    password : "kjw204024!@$",
    multipleStatements : true,
    database : "test3"
})

// 연결 확인 메소드
mysql.getConnection((err,res)=>{
    // 연결이 정상적으로 되지 않으면 err로 전달된다.
    console.log(err);
    // 정상적으로 연결되면 res객체에 연결 인스턴스가 넘어온다.
})

module.exports = mysql;