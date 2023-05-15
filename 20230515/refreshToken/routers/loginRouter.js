const router = require('express').Router();
const {Login, VerifyLogin} = require('../controllers/usersController');

router.get('/',(req,res)=>{
    res.render('login');
})

router.post('/',Login);

// 로그인 상태에서 요청해야 하는 작업은
router.get('/mypage',VerifyLogin,(req,res)=>{
    res.send('로그인 상태고 마이페이지로 이동');
})

module.exports = router;