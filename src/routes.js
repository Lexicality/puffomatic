const log = require('./logging');

function tokeGET(req, res) {
	res.send("Nice");
}

function tokePOST(req, res) {
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
}

module.exports = {
	tokeGET,
	tokePOST,
};
