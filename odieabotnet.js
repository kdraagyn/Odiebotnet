var express = require('express')
var app = express();

app.get('/', function(req, res, next) {
	res.send('hello world');
});

app.post('/api/status', function(req, res) {
	res.send('Email Sent to keithanygaard@gmail.com');
});

app.listen(8080, function() {
	console.log('Odiabotnet has started on port 8080');
});
