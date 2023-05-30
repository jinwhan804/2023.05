// 웹 소켓 : 양 방향 통신을 위해 사용

// 장점 : 한 번 연결할 때 헤더값을 같이 전송해서 많은 데이터가 전송되어 부하가 걸리는 경우가 발생하는데
// 소켓을 사용하면 많은 데이터를 사용하지 않는다.
// 실시간 채팅 등 실시간 작업이 필요한 경우 사용.
// 데이터 전송이 자주 일어날 경우 소켓을 사용하는 것이 좋다.

// socket.io 라이브러리 사용

const express = require('express');
const path = require('path');
const socketIo = require('socket.io');

const app = express();

app.set('views',path.join(__dirname,'page'));
app.set('view engine','ejs');

// 유저가 여러명 접속했을 때 유저끼리 실시간으로 채팅을 할 수 있게
app.get('/',(req,res)=>{
    res.render('main');
})

const server = app.listen(5000,()=>{
    console.log('server open');
})

// 대기 시켜둔 서버 객체를 매개변수로 전달
const io = socketIo(server);
// 소켓 연결 완료

let userId = [];

// 소켓들에 이벤트 등록
io.sockets.on('connection',(socket)=>{
    // connection : 접속 시 실행되는 이벤트
    // 현재 접속한 클라이언트의 socket이 매개변수로 들어온다.
    console.log('유저 접속');
    console.log(socket.id);
    // 유저 아이디를 배열로 담아둔다.
    userId.push(socket.id);
    console.log(userId);

    // 클라이언트 측에서 이벤트가 푸쉬되면 실행 시킬 이벤트
    socket.on('hi',(data)=>{
        // 본인에게 이벤트 푸쉬
        console.log(data,'이벤트를 클라이언트에서 보냄');
        
        // 모든 대상에게 이벤트 푸쉬
        // io.sockets.emit('hi','모두에게');

        // 본인 제외 모든 대상에게 이벤트 푸쉬
        // socket.broadcast.emit('hi',data.msg);

        // 비밀 대화 (추후 추가로 공부 예정)

        // 이벤트를 푸쉬할 유저의 아이디 값을 to의 매개 변수로 적용
        io.socket.to(data.id).emit('hi',data.msg);
    })
    // 유저가 나갔을 때
    socket.on('disconnect',()=>{
        // 유저가 접속을 해제했을 때 실행되는 이벤트
        console.log('유저 나감');
        userId = userId.filter((value) => value != socket.id);
    })
})