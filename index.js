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
	const {
		data,
		coreid,
		published_at,
	} = req.body;
	const [ duration, pressure ] = data.split(',');

	log.debug(`Got a toke from ${ coreid } for ${ duration }ms at ${ published_at }`);

	if (pressure < -500) {
		res.send("nice");
	} else {
		res.send("blaze it harder bitch");
	}
});

app.listen(8080);
