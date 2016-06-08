var nodemailer = require('nodemailer');

var Mailer = (function() {

  var transporter = nodemailer.createTransport('smtps://odieabotnet%40gmail.com:odieabodie@smtp.gmail.com');
  var mailOptions = {
    from: '"OdieBotNet" <odieabotnet@gmail.com>',
    to: 'keithanygaard@gmail.com',
    subject: 'Test',
    text: 'Test nodemailer',
    html: '<p>Test nodemailer</p>'
  };

// , cmichaelvincent@gmail.com 

  var sendTestMail = function ( ipAddress ) {
	// TODO: render email html
	// TODO: Build mailOptions on the fly (N number of recipients

    mailOptions.subject = "New Ip Address: " + ipAddress;

    console.log( "Sending new adobie IP address: " + ipAddress );
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });
  };

  return {
    sendTestMail: sendTestMail
  };

})();

module.exports = Mailer;
