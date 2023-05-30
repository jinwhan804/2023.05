const router = require('express').Router();
const {Upload} = require('../mid/imgUpload');

// single : 매개 변수로 form에서 이미지 파일을 가지고 있는 input의 name을 작성해준다.
router.post('/',Upload.single('upload'),(req,res)=>{
    const {file, body} = req;
    console.log(file,body);
    // 데이터 베이스에 이미지의 경로를 추가
    // /img/git.bp_1685410781636.png
    res.send('파일 저장됨');
})

module.exports = router;