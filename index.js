const express = require('express');
const bodyParser = require('body-parser');
const expressWinston = require('express-winston');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const log = require('./src/logging');
const { tokeGET, tokePOST } = require('./src/routes');

const dbPromise = mongoose.connect(
	'mongodb://localhost/mean-dev',
	{
		user: '',
		pass: '',
	}
);
const app = express();

app.use(expressWinston.logger({
	winstonInstance: log,
	level: 'silly',
	colorStatus: true,
	expressFormat: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/toke', tokeGET);
app.post('/toke', tokePOST);

app.use(session({
	secret: '420 BlAzE IT!!!',
	store: new MongoStore({ dbPromise }),
}));

const httpPort = 8080;

// Fucking dumbass shit
mongoose.Promise = Promise;


dbPromise.then(
	() => {
		log.info("Connected to MongoDB");
		app.listen(httpPort, () => {
			log.info(`Listening on port ${ httpPort }`);
		});
	},
	(err) => {
		log.error(`Unable to connect to mongo! ${ err }`);
	}
);
