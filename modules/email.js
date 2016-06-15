var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');

var Mailer = (function() {

  var transporter = nodemailer.createTransport('smtps://odieabotnet%40gmail.com:odieabodie@smtp.gmail.com');
  var mailOptions = {
    from: '"OdieBotNet" <odieabotnet@gmail.com>',
    to: '',
    subject: '',
    text: '',
    html: ''
  };

  var templatePath = "";
  var data = {};

  var renderTemplate = function( templatePath, data, callback ) {

    fs.readFile(templatePath, 'utf-8', function( error, source ) {

      var template = handlebars.compile( source ); 
      var html = template( data ); 

      callback( html );
    });
  };

  var send = function () {
    renderTemplate(this.templatePath, this.data, function( html ) { 
      mailOptions.html = html;
  
      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          return console.log(error);
        }
        console.log('Message sent: ' + info.response);
      });
    });
 };

  var setRecipients = function( recipients ) {
    var toField = "";

    for( recipient in recipients ) {
      toField += recipients[ recipient ];
      toField += ',';
    }
    toField = toField.slice(0, -1);
    mailOptions['to'] = toField;

    return this;
  }

  var setSubject = function( subjectString ) {
    mailOptions['subject'] = subjectString;
    return this;
  }

  var setTemplatePath = function( templatePath ) {
    this.templatePath = templatePath;
    return this;
  }

  var setData = function( data ) {
    this.data = data;
    return this;
  }

  return {
    setRecipients: setRecipients,
    setSubject: setSubject,
    setTemplatePath: setTemplatePath,
    setData: setData,
    send: send
  };

})();

module.exports = Mailer;
