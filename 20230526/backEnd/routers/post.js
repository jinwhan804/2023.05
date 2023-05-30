const router = require('express').Router();
const {PostViewSelect,PostViewAll,PostInsert,PostViewData} = require('../controllers/postController');
const {IsLogin,viewUser} = require('../middleware/loginMiddleware');

router.get('/',IsLogin,PostViewAll);

router.post('/detail',IsLogin,PostViewSelect);

router.get('/detail',IsLogin,PostViewData);

router.get('/insert',IsLogin,viewUser);

router.post('/insert',IsLogin,PostInsert);

module.exports = router;