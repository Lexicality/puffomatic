const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser')
const expressWinston = require('express-winston');

let log = new winston.Logger({
	level: 'silly',
	transports: [
		new winston.transports.Console({ colorize: true }),
	],
});
const app = express();

app.use(expressWinston.logger({
	winstonInstance: log,
	level: 'debug',
	colorStatus: true,
	expressFormat: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/toke', (req, res) => {
	res.send("Nice");
});

app.post('/toke', (req, res) => {
	console.log(req.get('Content-Type'), req.body);
	if (Math.random() > 0.5) {
		res.send("nice");
	} else {
		res.send("blaze it");
	}
});

app.listen(8080);
