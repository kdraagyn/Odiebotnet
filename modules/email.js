var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');

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

  var renderTemplate = function( templatePath, data ) {

    fs.readFile(templatePath, 'utf-8', function( error, source ) {

      var template = handlebars.compile( source ); 
      var html = template( data ); 

      return html;
    });
  };

  var sendTestMail = function ( ipAddress ) {
	// TODO: render email html
	// TODO: Build mailOptions on the fly (N number of recipients

    mailOptions.subject = "New Ip Address: " + ipAddress;

    var html = renderTemplate( '/home/keith/code/OdieBotNet/oldBashScripts/config/template.html', { ip_address : ipAddress } );
    mailOptions.html = html;

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
