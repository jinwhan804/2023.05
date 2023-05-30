// 채팅방 만들기
// 방을 나눠서 만들고 귓말 기능 구현

const express = require('express');
const path = require('path');
const socketIo = require('socket.io');

const app = express();

app.set('views',path.join(__dirname,'page'));
app.set('view engine','ejs');

const server = app.listen(5000,()=>{
    console.log('Server Open!');
})

app.get('/',(req,res)=>{
    res.render('main');
})

const io = socketIo(server);

let userId = [];
let userName = [];

io.on('connection',(socket)=>{
    // 유저 접속 시
    console.log('유저 접속');
    userId.push(socket.id);
    console.log(userId);

    socket.on('joinUser',(name)=>{
        userName.push(name);
        io.sockets.emit('joinUser',userName,userId);
    })

    socket.on('joinRoom',(room,name)=>{
        // 방에 유저가 접속하면 join 메소드로 방에 입장 시킨다.
        socket.join(room);
        // 현재 방에 있는 클라이언트에게 이벤트 푸쉬
        // 어느 방에 누가 접속했는지 고지
        io.to(room).emit('joinRoom',room,name);
    })

    socket.on('leaveRoom',(room,name)=>{
        // 방에서 유저가 나가면 leave 메소드로 방에서 나가게 해준다.
        socket.leave(room);
        // 어느 방에서 나갔는지 해당 방 사람들에게 이벤트 푸쉬
        io.to(room).emit('leaveRoom',room,name);
    })

    socket.on('disconnect',()=>{
        console.log('유저 나감');
        let index = userId.indexOf(socket.id);
        userName.splice(index,1);
        userId = userId.filter((value)=>value != socket.id);
        console.log(userId);
    })

    socket.on('chat',(room,name,msg)=>{
        io.to(room).emit('chat',name,msg);
    })

    socket.on('wisper',(id,name,msg)=>{
        io.to(id).emit('chat',name,"(귓말) : " + msg);
        io.to(socket.id).emit('chat',name,"(귓말) : " + msg);
    })
})