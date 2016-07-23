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

function tokesGET(req, res, next) {
	const { bongID } = req.params;

	log.info(`We\'re trying to find out about ${ bongID }`);

	const search = { bongID };

	return Toke.count(search)
		.then((num) => {
			log.info(`There are ${ num } results!`);
			return Toke.find(search);
		})
		.then((results) => {
			console.dir(results);
		})
		.then(() =>
			res.send("It probs worked!")
		)
		.catch(next);
}

module.exports = {
	tokeGET,
	tokePOST,
	tokesGET,
};
