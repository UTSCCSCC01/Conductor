const mongoose = require('mongoose');

// Note: MongoDB automatically creates each document's identifier as "_id".
const eventExecutionSchema = mongoose.Schema({
    //Given By the user
    EventId: { type: String, required: true}, //EventID stored in the event-builder microservice
    NumberOfPredicates: {type: Number, required: true}, //predicate microserivce length. 
    timeToExecute: { type: Date },
    RunAfterEventPassed: {type: Boolean, required: true},
    HangtillPredicateSatisfied: {type: Boolean, required: true},
    ClientFailureRetrySignal: {type: Boolean, required: true},

    /*State Variables for event system */
    TotalPredicateSatisfied: {type: Number, default: 0}, //Increment, signal sent by predicate microservice: Initally 0
    PredicateState: {type: Boolean, default: false}, //Finite State switch: switches to true iff NumberOfPredicates == TotalPredicateSatisfied.
    TimeSatisfied: {type: Boolean, default: false}, // Finite State switch: switches to true iff mongodb stream sends trigger of eventid
    TimeTooLate: {type: Boolean, default: false}, //

    RunUponSignIn: {type: Boolean, default: false}, 


    //Did the dispatcher see this event job, and try to process it
    DispatcherAcknowledged: {type: Boolean, default: false},
    //Return Value from the dispatcher: True=Sent, False=Offline
    UserSemiAcknowledged: {type: Boolean, default: false},


    //Is the event system done with this event.
    Terminated: {type: Boolean, default: false},

    
    ExecutionMessage: {type:String, required: true},

    

});

const EventOrchestrator = mongoose.model('EventOrchestrator', eventExecutionSchema);

module.exports = { EventOrchestrator };