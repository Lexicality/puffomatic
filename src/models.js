const { Schema, model } = require('mongoose');

const bongSchema = new Schema({
	owner: String,
	id: String,
});

const tokeSchema = new Schema({
	length: Number,
	when: Date,
	pressureDrop: Number,
	bongID: String,
});

const Bong = model('Bong', bongSchema);
const Toke = model('Toke', tokeSchema);

module.exports = {
	bongSchema,
	tokeSchema,
	Bong,
	Toke,
};
