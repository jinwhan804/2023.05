const {userInit,userList,userInsert,userSelect,userPwUpdate,userRefresh,userDelete} = require('./usersModel');

userInit();

// async function test(){
//     userDelete('aaa');
// }

// test();

module.exports = {userList,userInsert,userSelect,userPwUpdate,userRefresh,userDelete};