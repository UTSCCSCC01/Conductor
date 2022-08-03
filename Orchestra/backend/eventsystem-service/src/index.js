
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

console.log("init ClockWorks and EventOrchestrator")

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


let changeStream;
async function signalWatcher(){
    changeStream = EventClockStream.watch();

    changeStream.on("change", next => {
        console.log("RESULT:", next);
    })
}

//Start the signal watcher.
signalWatcher();


/**
 *  This is the event system: core of orchestra.
 *  This is a event based finite state system.
 *  Triggers are provided from 2 sources: Mongodb change stream[augmented by TTL], and 
 */



app.post("/clockworks/add", async (req,res) => {
    const check_query = [req.body.eventid]
    for (const element of check_query){
        if((typeof element != "string")){
            return res.status(400).send({success: false, status: "invalid response"});
        }
    }

    let eventid = req.body.eventid;
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