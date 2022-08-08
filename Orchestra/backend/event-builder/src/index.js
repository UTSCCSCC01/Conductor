
//Import models, and server configs.
const { MONGO_DB_URI, PORT, RUN_EVENT_ENDPOINT } = require("./config/config");
const { EventBuilder } = require('../model/EventBuilder');
const { v4: uuidv4 } = require('uuid');

const {send_event} = require('./utils/sendEvent')

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const axios = require('axios')

// Set Configs/Mongodb Connection
const app = express();
const port = PORT;
const mongoURI = MONGO_DB_URI;

console.log("Mongodb URI");
console.log(mongoURI);

//Connect to mongodb.
const connect = mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},)
    .then(() => console.log("Connect to the MONGODB server."))
    .catch(err => console.log(err));

// CORS enabled as any ip can ping this microservice. 
// Todo: add authentication middleware. 
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

app.post('/api/eventbuilder', (req, res) => {
    res.send("This is the event service. If working through port 8080 nginx working");
});

app.options('/api/eventbuilder/addEvent', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
});

// Adds a new device to the DB
app.post('/api/eventbuilder/addEvent', async (req, res) => {
    // Check if nonempty variable
    if (!req.body.eventConfig || req.body.eventConfig === undefined || req.body.eventConfig.length === 0) {
        return res.status(400).send({ success: false, status: "invalid response" });
    }
    if ((!req.body.predicate || req.body.predicate === undefined) && req.body.predicate !== 0) {
        return res.status(400).send({ success: false, status: "invalid response" });
    }

    // Check if nonempty string
    const stringQuery = [req.body.deviceId, req.body.applet, req.body.eventName, 
        req.body.description, req.body.eventName, req.body.userId];
    for (const element of stringQuery) {
        if (!element || typeof element !== "string" || element === "") {
            return res.status(400).send({ success: false, status: "invalid response" });
        }
    }

    // Perform checks on query.
    const reqUserId = req.body.userId.trim();
    const reqDeviceId = req.body.deviceId.trim();
    const eventId = uuidv4();

    // Generate the payload
    const payload = {
        eventConfig: req.body.eventConfig,
        deviceId: reqDeviceId,
        appletType: req.body.appletType,
        applet: req.body.applet.trim(),
        appletArg: req.body.appletArg.trim(),
        eventName: req.body.eventName.trim(),
        description: req.body.description.trim(),
        executionDate: req.body.executionDate,
        predicate: req.body.predicate,
        userId: reqUserId,
        created: req.body.created,
        eventId:eventId
    }

    console.log(payload);

    // Verify if the generate payload matches EventBuilder
    let eventBuilder = null;
    try {
        eventBuilder = new EventBuilder(payload);
        eventBuilder.save((error, eventBuilderData) => {
            if (error) {
                console.log(error);
                return res.status(409).send(error);
            }
        });
    } catch (err) {
        return res.status(400).send({ success: false, status: "payload corrupted" });
    }    

      // Send the result to the event-manager
      let result = await send_event(payload);
      if(result){
        return res.status(200).json({ success: true, eventBuilderData });
      }

      return res.status(400).send({ success: false, status: "Cannot send event to the event builder" });
      
});

app.get('/api/eventbuilder/getUserEvents', (req, res) => {
    // Check if userId is nonempty string
    const userId = req.query.userId;
    if (!userId || typeof userId !== "string" || userId === "") {
        return res.status(400).send({ success: false, status: "invalid response" });
    }

    // Get all events built by the user
    EventBuilder.find({ userId: userId })
        .populate("eventName")
        .sort({ created: -1, eventName: 1 })
        .exec((error, eventBuilderData) => {
            if (error) return res.status(400).send(error);
            return res.status(200).json({ success: true, eventBuilderData });
        });
});

app.get('/api/eventbuilder/getAll', (req, res) => {
    // Get all events built by the user
    EventBuilder.find()
        .populate("eventName")
        .sort({ created: -1, eventName: 1 })
        .exec((error, eventBuilderData) => {
            if (error) return res.status(400).send(error);
            return res.status(200).json({ success: true, eventBuilderData });
        });
});



app.post('/api/eventbuilder/runEvent', async (req, res) => {
    
    //Get eventid
    //Get eventid from  database
    //Send to server
    //Get Response
    //Send back to caller

    let event_id = req.body.eventId;
    let event_item = undefined;
    try{
        event_item = await EventBuilder.findOne({ eventId: event_id });
    }catch{
        res.status(400).send({ success: false, status: "Cannot send event from event-builder-database" })
        return;
    }


    let payload = {
        device_id: event_item["deviceId"],
        user_id: event_item["userId"],
        event: event_item
    }


    //We have event object, send it to the dispatcher.
    let dispatcher_result = undefined;
    console.log(payload);

    try{
        dispatcher_result = await axios.post(RUN_EVENT_ENDPOINT, payload);
        res.status(200).send({ success: true, status: "Sent event to client"});
        return;
    }catch(e){
        console.log(e);
        console.log(dispatcher_result);
        res.status(400).send({ success: false, status: "Cannot send event to client" });
        return;
    }


      
});


// Server Port
app.listen(port, () => {
    console.log(`Orchestra backend listening on port ${port}`)
});