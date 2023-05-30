const multer = require('multer');
const path = require('path');

// multer 함수 안에 매개 변수로 객체 형태의 인자를 전달
// storage 속성을 통해서 업로드 된 파일을 어디에 저장시킬지 지정할 수 있다.
exports.Upload = multer({
    storage : multer.diskStorage({
        // diskStorage : 서버 컴퓨터의 하드 디스크에 업로드 파일을 저장하는 메소드
        // 객체로 인자값 전달

        // destination : 파일이 저장될 폴더를 설정하는 속성
        destination : (req, file, done)=>{
            // done : 콜백 함수. 두 번째 인자값으로 폴더의 이름을 설정해주면 된다.
            // 서버 컴퓨터 폴더명
            // 오류 내용이 있으면 작성
            done(null,"uploads/");
            // 첫 번째 매개 변수는 에러 처리 부분
            // 두 번째 매개 변수는 파일이 저장될 폴더 이름
        },

        filename : (req, file, done)=>{
            // filename 속성 값에서 매개 변수 file.originalname은 클라이언트가 업로드한 파일의 이름을 나타낸다.
            // file.originalname : 사용자가 업로드한 파일 원본명
            // extname : 파일의 결로를 매개 변수로 받고 파일의 확장자를 추출해준다.
            const ext = path.extname(file.originalname);

            // 파일을 저장할 때 이름을 다르게 해주기 위해 저장 시간을 이름에 포함시켜서 저장해준다.
            // 파일 관리를 위해 이름 설정
            // basename : 확장자를 추가, 제거할 수 있다.
            // 1.js => 1
            // 첫 번째 매개 변수로 파일의 경로
            // 두 번째 매개 변수로 옵션
            const filename = path.basename(file.originalname, ext) + "_" + Date.now() + ext;
            done(null, filename);
            // 첫 번째 매개 변수는 에러 처리 부분
            // 두 번째 매개 변수는 서버 컴퓨터에 저장할 파일명
        }
    }),

    // 파일의 사이즈 설정(최대 사이즈 설정)
    limits : {fileSize : 5 * 1024 * 1024}  // 5 MB
});