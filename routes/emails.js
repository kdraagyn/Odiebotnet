var express = require('express');
var router = express.Router();
var Mailer = require('../modules/email.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/homeIpAddress/:ipAddress', function(req, res, next) {
  Mailer.sendTestMail( req.param("ipAddress") );
  res.send('sending test email');
});

module.exports = router;
