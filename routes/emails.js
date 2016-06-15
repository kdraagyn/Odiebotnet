var express = require('express');
var router = express.Router();
var Mailer = require('../modules/email.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/homeIpAddress', function(req, res, next) {
  var recipients = [ 'keithanygaard@gmail.com' ]; // cmichaelvincent@gmail.com
  var ip_address = req.body['ip'];

  console.log( "Sending new house IP address:" + ip_address );

  Mailer
    .setRecipients( recipients )
    .setSubject("New Ip Address: " + ip_address)
    .setTemplatePath('/home/keith/code/OdieBotNet/views/newIpEmail.html')
    .setData( { ip_address: ip_address } )
    .send();

  var response = {};
  
  response['status'] = 'SUCCESS';
  response['recipients'] = recipients;

  res.json(response);
});

module.exports = router;
