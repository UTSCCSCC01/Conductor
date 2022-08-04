
//Import models, and server configs.
const { MONGO_DB_URI, PORT } = require("./config/config");

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Set Configs/Mongodb Connection
const app = express();
const port = PORT;
const mongoURI = MONGO_DB_URI;



// DATABASE MODELS
const { EventOrchestrator } = require('../model/EventOrchestrator');
const { EventClockStream } = require('../model/ClockWork');

console.log("Starting ClockWorks and Orchestra")

//Connect to mongodb.
const connect = mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },)
    .then(() => console.log("Connect to the MONGODB server."))
    .catch(err => console.log(err));


//CORS enabled as any ip can ping this microservice. 
//Todo: add authentication middleware. 

app.use(cors());
app.use(express.json());

// Middleware that handles malformed json objects in request body
app.use((err, req, res, next) => {
   if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error(err);
      return res.status(400).send({
         status: 400,
         message: err.message
      }); // Bad request
   }
   next();
});


/**
 * The app is structured from top to bottom. Event Node starts at the start and transistions to the bottom where its complete. 
 */

/*---------------------------------------- HELPERS TO OBTAIN INFORMATION ABOUT EVENT AND SETTING STATES -------------------------*/


/*----------------------------------------START OF EVENT DRIVEN FINITE STATE MACHINE LOGIC----------------------------------------*/


/**
 * Adds a event to the EventOrchestrator DB
 * Adds event to the ClockWorkStream DB
 */


/*----------------------------------------TIME TO EXECUTE SIGNAL STATE REGION----------------------------------------*/
let changeStream;
async function signalWatcher(){
    console.log("Signal watcher has started");
    changeStream = EventClockStream.watch();
    changeStream.on("change", next => {
        //Execution time for an event has passed. 

        
        if(next.operationType == 'delete'){
            console.log(next);
            //handleExecutionDateOccur(next.documentKey._id);
        }
    })
}
//Start the signal watcher.
signalWatcher();

//Function on what to do when the execution date has arrived
async function handleExecutionDateOccur(event_id){


}
//Tells event-builder to send event to dispatcher which sends results to client electron
// which sends to Trigger over ipc to execute the task.
async function send_dispatcher(event_id){
}

async function handle(){
}
/*----------------------------------------TIME TO EXECUTE SIGNAL STATE REGION END----------------------------------- */


/**
 * Required: 
 * {
 *  eventId:String, 
 *  TotalNumberOfPredicates:number, 
 *  DateOfExecution: Date,
 *  RunAfterEventPassed: boolean
 *  HangtillPredicateSatisfied: boolean
 *  ClientFailureRetryEvent: boolean
 * }
 * 
 *  
 */
app.post("/event/add", async (req,res) => {

    let input = req.body;
    console.log("/event/add: Request Body:", req.body);

    let event_id = input.eventId;
    let total_predicate_count = input.TotalNumberOfPredicates;
    let date_of_execute = input.DateOfExecution;
    let run_after_event_passed = input.RunAfterEventPassed;
    let hang_predicate_satisfied = input.HangtillPredicateSatisfied;
    let client_failure_retry_send = input.ClientFailureRetryEvent


    /**
     * Adds an event to the orchestra database along side its default values
     * 
     * Default Values:
     *  TotalPredicateSatisfied: 0
     *  PredicateState: false; true if NumberOfPredicates = true
     *  TimeSatisfied: false
     *  DispatcherAcknowledge: false;
     *  UserSemiAcknowledged: false,
     *  Terminated: false
     *  ExecutionMessage: "Waiting for predicate and/or event satisfaction" 
     */

    let predicate_state = false;
    if(total_predicate_count == 0){
        predicate_state = true;
    }
    try{
        let event_payload = {
            EventId: event_id,
            NumberOfPredicates: total_predicate_count,
            timeToExecute: new Date(date_of_execute),
            RunAfterEventPassed: run_after_event_passed,
            HangtillPredicateSatisfied: hang_predicate_satisfied,
            ClientFailureRetrySignal: client_failure_retry_send,
            //State Default Values:
            ExecutionMessage: "Waiting for predicate and/or execution signals",
            PredicateState: predicate_state //Satisfied if no predicates.
        }

        let events_clockwork = new EventOrchestrator(event_payload);
        await EventOrchestrator.collection.insertOne(events_clockwork);
    }catch(e){
        console.log(e);
        
        return res.status(500).send({status: false, msg: "failed to add event to db"});
    }

    // Add timer to an event. [Add after adding event]
    let addEventTimer = await add_timer_to_event(event_id, date_of_execute);
    if(!addEventTimer){
        return res.status(500).send({status: false, msg: "failed to attach timer to event."});
    }

    return res.status(200).send({status: true, msg: "added event to database."});
})

/**
 *  Add a timer to an event. If the timer has passed, there will be an epsilon transition.
 *  for example it will instantly set the state of the event to passed, by the database.
 */
async function add_timer_to_event(event_id, timetolive){
    try{
        const payload = {
            _id: event_id,
            timeToExecute: new Date(timetolive)
        }
        let events_clockwork = new EventClockStream(payload);
        EventClockStream.collection.insertOne(payload);
    }catch{
        return false;
    }
    return true;
}


app.post("/event/get", async (req,res) => {
    const check_query = [req.body.eventId]
    for (const element of check_query){
        if((typeof element != "string")){
            return res.status(400).send({success: false, status: "invalid request object"});
        }
    }

    let input = req.body;
    console.log("/event/get: Request Body:", req.body);
    let event_id = input.eventId;
    
    try{
        EventOrchestrator.findOne({EventId: event_id}, (error, event) => {
            if (error){
                return res.status(500).send({success: false, status: "error", result: undefined});
            }
        // console.log(deviceData);
            if(event == undefined){
                return res.status(404).send({success: false, status: "not found", result: undefined});
            }
            return res.status(200).json({success: true, status: "found", result: event});
        });
    }catch{
        return res.status(500).send({success: false, status: "error", result: undefined});
    }
});


app.post("/event/delete", async (req,res) => {
    const check_query = [req.body.eventId]
    for (const element of check_query){
        if((typeof element != "string")){
            return res.status(400).send({success: false, status: "invalid request object"});
        }
    }

    let input = req.body;
    console.log("/event/delete: Request Body:", req.body);
    let event_id = input.eventId;
    console.log(event_id);
    
    try{
        // Delete its event timer.
        await EventClockStream.deleteOne({_id: event_id});

        EventOrchestrator.deleteOne({EventId: event_id}, (error, event) => {
            console.log("delete here");

            if (error){
                return res.status(500).send({success: false, status: "server error"});
            }
        // console.log(deviceData);
            if(event == undefined){
                return res.status(404).send({success: false, status: "not found"});
            }
            return res.status(200).json({success: true, status: "deleted"});
        });


    }catch{
        return res.status(500).send({success: false, status: "server error"});
    }
});


/*----------------------------------------PREDICATE SIGNAL STATE REGION----------------------------------------*/

app.post("/event/satisifypredicate", async (req,res) => {
    const check_query = [req.body.eventId]
    for (const element of check_query){
        if((typeof element != "string")){
            return res.status(400).send({success: false, status: "invalid request object"});
        }
    }

    let input = req.body;
    console.log("/event/get: Request Body:", req.body);
    let event_id = input.eventId;
    
    let event_result;
    try{
        event_result = await EventOrchestrator.findOne({EventId: event_id});
    }catch{
        return res.status(500).send({success: false, status: "error", event_result: undefined});
    }
    
    if(!event_result["Terminated"] && event_result["TotalPredicateSatisfied"] < event_result["NumberOfPredicates"]){
        console.log(event_result["TotalPredicateSatisfied"],  event_result["NumberOfPredicates"])
        const query = {EventId: event_id}
        const updateExecutionDateFlag = {
            $inc: {"TotalPredicateSatisfied": 1}
        }
        try{
            await EventOrchestrator.updateOne(query,updateExecutionDateFlag);
        }catch{
            console.log("Critical Error has occured! Unable to increment PredicateSatisfyCount.");
            console.log("EventID: ", event_id, " is now in an undefined state. -1 predicate");
            console.log("SEND THIS TO STATUS REPORT MODULE INSTANTLY");
        }
    }


    return res.status(500).send({success: true, status: "success", result: event_result});
})



/*--------------------------------------- PREDICATE SIGNAL STATE REGION----------------------------------------/*




/*--------------------------------------------------DISPATCHER STATE REGION---------------------------------------------- */

/*--------------------------------------------------DISPATCHER STATE REGION---------------------------------------------- */






/*------------------------------------------------- ERROR HANDLING STATE REGION------------------------------------------ */
/*------------------------------------------------- ERROR HANDLING STATE REGION------------------------------------------ */



/*------------------------------------------------ EVENT TERMINATION STATE REGION--------------------------------------- */
/*------------------------------------------------ EVENT TERMINATION STATE REGION--------------------------------------- */
//Send to STATUS MICROSERVICE
async function setEventLifeCycleComplete(event, status, messag, send_to_user){
    const query = {EventId: eventid}
    const updateExecutionDateFlag = {
        $set: {
            EventStatus: status,
            ExecutionMessage: message,
            SendToUser: send_to_user, 
        },
    }
}


/**
 * 
 *  eventid:
 *   
 *  returns
 * {
 *     status: true/false
 *     predicateSatisfiedIncremented: true/false
 *     message: ""
 *      
 * }
 * 
 */

/**
 *  This is the event system: core of orchestra.
 *  This is a event based finite state system.
 *  Triggers are provided from 2 sources: Mongodb change stream[augmented by TTL], and 
 */
app.post("/debug/clockworks/add", async (req,res) => {
    const check_query = [req.body.eventId]
    for (const element of check_query){
        if((typeof element != "string")){
            return res.status(400).send({success: false, status: "invalid response"});
        }
    }

    let eventid = req.body.eventId;
    let timetolive = req.body.timetolive;

    if(!timetolive){
        return res.status(400).send({success: false, status:"invalid time object"});
    }

    try{
        let date_test = new Date(timetolive);
    }catch{
        return res.status(400).send({success: false, status:"invalid time object"});
    }

    //var t = new Date();
    //t.setSeconds(t.getSeconds() + 10);

    const payload = {
        _id: eventid,
        timeToExecute: new Date(timetolive)
    }

    //Generate a new clockwork event.
    //Event will delete itself in the specified time in the payload.
    //This will generate a signal which the event driven fsm will detect
    //and update the event object.

    let events_clockwork = new EventClockStream(payload);
    EventClockStream.collection.insertOne(payload);

    res.status(200).json({message: "saved"});

});


// Server Port
app.listen(port, () => {
   console.log(`Orchestra backend listening on port ${port}`)
});