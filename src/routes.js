const log = require('./logging');
const { Toke } = require('./models');
const _ = require('lodash');

function tokeGET(req, res) {
	res.send("Nice");
}

function tokePOST(req, res, next) {
	const {
		data,
		coreid,
		published_at,
	} = req.body;
	const [ duration, pressure ] = data.split(',');

	log.info(`Got a toke from ${ coreid } for ${ duration }ms at ${ published_at }`);
	const toke = new Toke({
		length: parseInt(duration, 10),
		when: new Date(published_at),
		pressureDrop: parseInt(pressure, 10),
		bongID: coreid,
	});

	return toke
		.save()
		.then(() => {
			if (toke.get('pressureDrop') < -500) {
				res.send("nice");
			} else {
				res.send("blaze it harder bitch");
			}
		})
		.catch(next);
}

function no_s(key) {
	return key.indexOf('_') != 0;
}

function tokesGET(req, res, next) {
	const { bongID } = req.params;

	log.info(`We\'re trying to find out about ${ bongID }`);

	const search = { bongID };

	return Toke.find(search)
		.lean()
		.then((results) => {
			log.info(`${ results.length } results!`);

			res.send(results.map((toke) => _.omitBy(toke, no_s)));
		})
		.catch(next);
}

module.exports = {
	tokeGET,
	tokePOST,
	tokesGET,
};
