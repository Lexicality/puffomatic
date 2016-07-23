const log = require('./logging');
const { Toke } = require('./models');

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

function tokesGET(req, res) {
	const { bongID } = req.query;

	const tokes = Toke.find({ bongID });

	res.send(tokes);
}

module.exports = {
	tokeGET,
	tokePOST,
	tokesGET,
};
