const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// PredicateID = _id
const predicateSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	descriptor: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	satisfaction: {
		type: Boolean,
		default: false
	},
	dateOfSatisfaction: {
		type: Date
	},
	userId: {
		type: String,
		required: true
	}
});
const Predicate = mongoose.model('Predicate', predicateSchema);
module.exports = { Predicate };
