// fs 모듈 : 파일 시스템. 파일 생성, 삭제, 읽기, 쓰기 등의 작업을 할 수 있다.
const fs = require("fs");

// existsSync : 폴더가 있는지 확인하는 메소드
// 반환값은 폴더가 있을 때 true, 없을 때 false. 동기적으로 작동
// 메소드 이름에 Sync가 있을 경우 동기적으로 작동
// 매개변수로 폴더의 경로를 작성해준다.
let folder = fs.existsSync("./Test");
console.log(folder);

// mkdir : 폴더 생성 메소드
// 첫 번째 매개변수는 생성할 폴더의 경로
// 두 번째 매개변수는 폴더 생성 시 호출할 콜백함수
// 콜백 함수의 첫 번째 매개변수는 에러의 내용의 객체를 전달 받는다.
if(!folder){
    // 비동기적으로 실행되는 메소드
    fs.mkdir("./Test",(err)=>{
        if(err){
            console.log(err);
            console.log("에러남")
        }else{
            console.log("Test 폴더 잘 만들어짐")
        }
    })
    
    // 동기적으로 실행되는 메소드
    // fs.mkdirSync("./Test");
    // console.log("폴더 만들었음");
}

// 폴더 안에 파일 추가
// writeFile : 파일 쓰기. 파일에 데이터를 작성할 수 있다.
// 첫 번째 매개 변수는 파일의 이름과 경로
// 두 번째 매개 변수는 파일에 작성할 내용
// 세 번째 매개 변수는 콜백 함수
// 콜백 함수의 매개변수는 에러 내용의 객체를 전달 받는다.
// 메소드 뒤에 Sync를 붙이면 폴더 생성 때처럼 동기적으로 작동한다.
// fs.writeFile("./Test/temp.txt", "Hello nodejs", (err)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("파일이 잘 만들어짐");
//     }
// })

fs.writeFileSync("./Test/temp.txt", "Hello nodjs");
console.log("파일 잘 만들어짐");

// readFile : 파일을 읽어오는 메소드.
// 첫 번째 매개 변수는 파일의 경로
// 두 번째 매개 변수는 인코딩의 내용
// 인코딩 내용을 작성하지 않으면 null로 들어가게되고 buffer 객체로 읽어온다.
// 세 번째 매개 변수는 콜백함수
// 콜백함수의 첫 번째 매개 변수는 에러의 내용 객체
// 두 번째 매개 변수는 읽어온 파일의 내용
// fs.readFile("./Test/temp.txt","utf-8",(err,data)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data);
//     }
// })

// 동기적으로 파일 읽어오기
let data = fs.readFileSync("./Test/temp.txt", "utf-8");
console.log(data);

// rm 메소드 : 파일 제거
// 첫 번째 매개 변수는 삭제할 폴더의 경로
// 두 번째 매개 변수는 옵션 객체 전달 {recursive : true}
// recursive 키의 값에 따라 true나 false를 폴더 안에 내용이 있는지 폴더 안의 내용까지 제거할 것인지 설정.
// 세 번째 매개 변수는 콜백 함수
// 콜백 함수의 매개 변수로 에러 내용의 객체를 전달 받는다.
fs.rm("./Test", {recursive : true}, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("폴더 삭제 완료");
    }
})