var express = require('express');
var router = express.Router();
const auth = require('../controllers/auth');



/* authentication */
router.options('*', function(req,res,next){
  res.send();
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', auth.login);
router.post('/register',auth.registerUser);

module.exports = router;
