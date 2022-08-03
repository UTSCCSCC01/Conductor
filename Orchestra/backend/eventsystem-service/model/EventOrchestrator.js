const mongoose = require('mongoose');

// Note: MongoDB automatically creates each document's identifier as "_id".
const eventExecutionSchema = mongoose.Schema({
    //Application Lists

    EventId: { type: String, required: true}, //EventID stored in the event-builder microservice


    NumberOfPredicates: {type: Number, required: true}, //predicate microserivce length. 

    TotalPredicateSatisfied: {type: Number, required: true}, //Increment, signal sent by predicate microservice: Initally 0

    PredicateState: {type: Boolean, required: true}, //Finite State switch: switches to true iff NumberOfPredicates == TotalPredicateSatisfied.
    
    TimeSatisfied: {type: Boolean, required: true}, // Finite State switch: switches to true iff mongodb stream sends trigger of eventid

    //Did the dispatcher see this event job, and try to process it
    DispatcherAcknowledged: {type: Boolean, required: true},

    //Did the dispatcher send this event to the user. 
    SentToUser: {type: Boolean, required: true},

});

const EventOrchestrator = mongoose.model('EventOrchestrator', eventExecutionSchema);

module.exports = { EventOrchestrator };