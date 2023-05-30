const router = require('express').Router();

const {Update} = require('../controllers/updateController');
const {Upload} = require('../mid/imgUpload');
const {IsLogin} = require('../mid/loginVerfiy');

router.get('/',IsLogin,(req,res)=>{
    const {acc_decoded} = req;
    console.log(acc_decoded);
    res.json(acc_decoded);
});

router.post('/',Upload.single('image'),Update);

module.exports = router;