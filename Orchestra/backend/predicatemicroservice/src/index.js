const express = require('express');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const {Predicate} = require('../models/Predicate');
const cors = require('cors');
const app = express();
app.use(express.json());
const { MONGO_DB_URI, PORT } = require("./config/config");
const connect = mongoose.connect(MONGO_DB_URI, {
	useNewUrlParser: true
})
.then(() => console.log("predicatemicroservice's MongoDB connected"))
.catch(err => console.log(err));



//CORS enabled as any ip can ping this microservice.

app.use(cors());
app.use(express.json());

// // Middleware that handles malformed json objects in request body
// app.use((err, req, res, next) => {
// 	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
// 		console.error(err);
// 		return res.status(400).send({
// 			status: 400,
// 			message: err.message
// 		}); // Bad request
// 	}
// 	next();
// });

// app.post('/api/devices', (req, res) => {
// 	res.send("This is the device service. If working through port 8080 nginx working");
// });

// app.options('/api/devices/addDevice', function (req, res) {
// 	res.setHeader("Access-Control-Allow-Origin", "*");
// 	res.setHeader('Access-Control-Allow-Methods', '*');
// 	res.setHeader("Access-Control-Allow-Headers", "*");
// 	res.end();
// });



/*
API Operations Endpoints. Use post for [easier]:
1. ‘create_predicate’ -> uses the above information. To create a new entry.
2. ‘delete_predicate’ -> by id
3. ‘satisfy_predicate’-> flips the predicate satisfaction variable from false to true, and log
   It's. Make sure u take in predicate id, and userid and make sure they match with db.
4. ‘get_predicate_by_id’-> Returns the predicate info by its id.

5. ‘get_predicate_by_userid’-> returns a list of predicates, that have userid=userid as field
> the date this occurred in date of satisfaction
*/

app.post('/api/predicates', (req, res) => {
    res.send("This is the predicate service. If working through port 8080 nginx working");
});

app.options('/api/predicates/addPredicate', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
});

// create_predicate:
// curl -v -X POST http://localhost:8080/api/predicates/addPredicate -H "Content-Type: application/json" -d '{"name": "s", "descriptor": "o", "userId": "f", "eventId": "w"}'
// curl -v -X POST http://localhost:8080/api/predicates/addPredicate -H "Content-Type: application/json" -d '{"name": "n", "descriptor": "o", "userId": "f", "eventId": "w"}'
// curl -v -X POST http://localhost:8080/api/predicates/addPredicate -H "Content-Type: application/json" -d '{"name": "s", "descriptor": "o", "userId": "n", "eventId": "w"}'
// curl -v -X POST http://localhost:8080/api/predicates/addPredicate -H "Content-Type: application/json" -d '{"name": "n", "descriptor": "o", "userId": "n", "eventId": "w"}'
app.post('/api/predicates/addPredicate', (req, res) => {
	const name = req.body.name; // = String
	const descriptor = req.body.descriptor; // = String
	const userId = req.body.userId; // = String
	const eventId = req.body.eventId; // = String
	const newPredicate = new Predicate({
		name: name,
		descriptor: descriptor,
		userId: userId,
		eventId: eventId
	});
	Predicate.updateOne({name: name, descriptor: descriptor, userId: userId, eventId: eventId}, {$setOnInsert: newPredicate}, {upsert: true}, function (err, predicateData) {
		if (err) return res.status(500).json({success: false, err});
		if (predicateData.acknowledged) {
			return res.status(200).json({success: true, predicateData});
		} else {
			return res.status(404).json({success: false, predicateData});
		}
	});
});

app.post('/api/predicates/updatePredicate', (req, res) => {
	const predicateId = req.body.predicateId.trim();
	const userId = req.body.userId.trim();
	const updatePredicate = {
		name: req.body.name.trim(),
		descriptor: req.body.descriptor.trim()
	};
	Predicate.updateOne({_id: predicateId, userId: userId}, updatePredicate, {upsert: true}, function (err, predicateData) {
		if (err) return res.status(500).json({success: false, err});
		if (predicateData.acknowledged) {
			return res.status(200).json({success: true, predicateData});
		} else {
			return res.status(404).json({success: false, predicateData});
		}
	});
});

// delete_predicate:
// curl -v -X DELETE http://localhost:8080/api/predicates/deletePredicate -H "Content-Type: application/json" -d '{"_id":""}'
app.delete('/api/predicates/deletePredicate/:_id', (req, res) => {
	const id = req.params._id; // = String
	const oid = new ObjectId(id);
	Predicate.deleteOne({_id: oid}, function (err, doc) {
		if (err) return res.status(500).json({success: false, err});
		if (doc.acknowledged && doc.deletedCount == 1) {
			return res.status(200).json({success: true, doc});
		} else {
			return res.status(404).json({success: false, doc});
		}
	});
});

// satisfy_predicate:
// curl -v -X PATCH http://localhost:8080/api/predicates/satisfyPredicate/f -H "Content-Type: application/json" -d '{"_id":""}'
// curl -v -X PATCH http://localhost:8080/api/predicates/satisfyPredicate/n -H "Content-Type: application/json" -d '{"_id":""}'
app.patch('/api/predicates/satisfyPredicate/:userId', (req, res) => {
	const id = req.body._id; // = String
	const oid = new ObjectId(id);
	const userId = req.params.userId;
	const date = Date.now();
	Predicate.updateOne({_id: oid, userId: userId}, {'$set': {satisfaction: true, dateOfSatisfaction: date}}, function (err, doc) {
		if (err) return res.status(500).json({success: false, err});
		if (doc.acknowledged && doc.matchedCount == 1 && doc.modifiedCount == 1) {
			return res.status(200).json({success: true, doc});
		} else {
			return res.status(404).json({success: false, doc});
		}
	});
});

// get_predicate_by_id
// curl -v -X GET http://localhost:8080/api/predicates/getViaId/:_id
app.get('/api/predicates/getViaId/:id', (req, res) => {
	const id = req.params.id;
	const oid = new ObjectId(id);
	Predicate.findOne({_id: oid}, (err, predicateData) => {
		if (err) return res.status(500).json({success: false, err});
		if (predicateData !== null) {
			return res.status(200).json({success: true, predicateData});
		} else {
			return res.status(404).json({success: false, predicateData});
		}
	});
});

// get_predicate_by_userid
// curl -v -X GET http://localhost:8080/api/predicates/getViaUserId/:_userId
app.get('/api/predicates/getViaUserId/:userId', (req, res) => {
	const userId = req.params.userId;
	Predicate.find({userId: userId}, (err, predicatesData) => {
		if (err) return res.status(500).json({success: false, err});
		if (predicatesData.length != 0) {
			return res.status(200).json({success: true, predicatesData});
		} else {
			return res.status(404).json({success: false, predicatesData});
		}
	});
});

// // delete_all_predicates:
// // curl -v -X DELETE http://localhost:8080/api/predicates/deleteAllPredicates
// app.delete('/api/predicates/deleteAllPredicates', (req, res) => {
// 	Predicate.remove({}, function (err, doc) {
// 		if (err) return res.status(500).json({success: false, err});
// 		if (doc.acknowledged && doc.deletedCount >= 1) {
// 			return res.status(200).json({success: true, doc});
// 		} else {
// 			return res.status(404).json({success: false, doc});
// 		}
// 	});
// });



app.listen(PORT, () => console.log("predicatemicroservice's MongoDB server running..."));
