const winston = require('winston');

let log = new winston.Logger({
	level: 'silly',
	transports: [
		new winston.transports.Console({ colorize: true }),
	],
});

module.exports = log;
