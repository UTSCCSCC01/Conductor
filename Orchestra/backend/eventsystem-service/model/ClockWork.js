const mongoose = require('mongoose');

// Note: MongoDB automatically creates each document's identifier as "_id".
const EventClock = mongoose.Schema({
    //Application Lists

    _id: { type: String, unique: true },

    //To to live: erases the document in the database after certain time
    // Exploits this to determine when time has run out.
    
    //Remove the document after Date + 3600 seconds.
    timeToExecute: { type: Date }
});

const EventClockStream = mongoose.model('EventClock', EventClock);
EventClockStream.collection.createIndex({ "timeToExecute": 1 }, { expireAfterSeconds: 0 });

module.exports = { EventClockStream };