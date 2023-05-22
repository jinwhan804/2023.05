const router = require('express').Router();
const {IsLogin} = require('../middleware/login');
const {boarderMain,boarderView,boarderDel,createBoarder,updateBoarder} = require('../controllers/boarderController');

router.get('/',IsLogin,boarderMain);

router.get('/view/:id',IsLogin,boarderView);

router.post('/create_boarder',IsLogin,createBoarder);

router.post('/view_update/:id',IsLogin,updateBoarder);

router.get('/delete/:id',IsLogin,boarderDel);

module.exports = router;