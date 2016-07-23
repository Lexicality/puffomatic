const express = require('express');
const winston = require('winston');
const bodyParser = require('body-parser')
const expressWinston = require('express-winston');
const mongoose = require('mongoose');

let log = new winston.Logger({
	level: 'silly',
	transports: [
		new winston.transports.Console({ colorize: true }),
	],
});
const app = express();

app.use(expressWinston.logger({
	winstonInstance: log,
	level: 'silly',
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

	log.info(`Got a toke from ${ coreid } for ${ duration }ms at ${ published_at }`);

	if (pressure < -500) {
		res.send("nice");
	} else {
		res.send("blaze it harder bitch");
	}
});


const httpPort = 8080;

mongoose.connect(
	'mongodb://localhost/mean-dev',
	{
		user: '',
		pass: '',
	}
)
.then(
	() => {
		log.info("Connected to MongoDB");
		app.listen(httpPort, (...args) => {
			log.debug("Arguments:");
			console.dir(args);
			log.info(`Listening on port ${ httpPort }`);
		});
	},
	(err) => {
		log.error(`Unable to connect to mongo! ${ err }`);
	}
);
