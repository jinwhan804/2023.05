const router = require('express').Router();
const {Login} = require('../controllers/loginController');
const {IsLogin,viewUser} = require('../middleware/loginMiddleware');

router.post('/',Login);

router.get('/view',IsLogin,viewUser);

module.exports = router;