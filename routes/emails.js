var express = require('express');
var router = express.Router();
var Mailer = require('../modules/email.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/test', function(req, res, next) {
  Mailer.sendTestMail();
  res.send('sending test email');
});

module.exports = router;
