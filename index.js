const express = require('express');
const bodyParser = require('body-parser');
const expressWinston = require('express-winston');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const http = require('http');

const log = require('./src/logging');
const {
	tokeGET,
	tokePOST,
	tokesGET,
} = require('./src/routes');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(expressWinston.logger({
	winstonInstance: log,
	level: 'silly',
	colorStatus: true,
	expressFormat: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/toke', tokeGET);
app.post('/toke', tokePOST);
app.get('/tokes/:bongID', tokesGET);

const httpPort = 8080;

// Fucking dumbass shit
mongoose.Promise = Promise;

// mongoose.connect(
// 	'mongodb://localhost/mean-dev',
// 	{
// 		user: '',
// 		pass: '',
// 	}
// )
// .then(
// 	() => {
// 		log.info("Connected to MongoDB");
		server.listen(httpPort, () => {
			log.info(`Listening on port ${ httpPort }`);
		});
// 	},
// 	(err) => {
// 		log.error(`Unable to connect to mongo! ${ err }`);
// 	}
// );
