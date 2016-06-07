var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport('smtps://odieabotnet%40gmail.com:odieabodie@smtp.gmail.com');

var mailOptions = {
  from: '"OdieBotNet" <odieabotnet@gmail.com>',
  to: 'keithanygaard@gmail.com, cmichaelvincent@gmail.com',
  subject: 'Test',
  text: 'Test nodemailer',
  html: '<p>Test nodemailer</p>'
};

transporter.sendMail(mailOptions, function(error, info){
  if(error){
    return console.log(error);
  }
  console.log('Message sent: ' + info.response);
});
