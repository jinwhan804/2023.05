// 비행기 좌석 3개로 나눠서 생성
// 좌석 예약 할 수 있게

const express = require('express');
const path = require('path');
const socketIo = require('socket.io');

const app = express();

// 선택된 자리들을 보여줄 배열
let seats = [];

let temp = [
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
];

let temp2 = [
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
];

let temp3 = [
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1]
];

let seatsArr = [temp, temp2, temp3];
// 선택한 비행기의 인덱스
let index = 0;

app.set('views',path.join(__dirname,'page'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended : false}));

const server = app.listen(5000,()=>{
    console.log('server open');
})

app.get('/',(req,res)=>{
    res.render('main');
})

app.get('/seats/:id',(req,res)=>{
    index = req.params.id;
    seats = seatsArr[index];
    // 요청에 대한 응답으로 seatsArr 배열에서 id로 전달한 인덱스의 배열을 응답
    res.send(seats);
})

const io = socketIo(server);

io.sockets.on('connection',(socket)=>{
    socket.on('reserve',(data)=>{
        console.log('예약');
        let seatTemp = seatsArr[data.selectCount];
        seatTemp[data.y][data.x] = 2;
        io.sockets.emit('reserve',data);
    })
})