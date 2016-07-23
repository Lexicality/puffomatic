const mongoose = require('mongoose');

const { Schema } = mongoose;

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

const Bong = mongoose.model('Bong', bongSchema);
const Toke = mongoose.model('Toke', tokeSchema);

module.exports = {
	bongSchema,
	tokeSchema,
	Bong,
	Toke,
};
