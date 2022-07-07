
//Import models, and server configs.
const { MONGO_DB_URI, PORT } = require("./config/config");
const { Device } = require('../model/Device');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


// Set Configs/Mongodb Connection
const app = express();
const port = PORT;
const mongoURI = MONGO_DB_URI;

console.log("Mongodb URI")
console.log(mongoURI)
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

app.post('/api/devices', (req, res) => {
    res.send("This is the device service. If working through port 8080 nginx working");
});

app.options('/api/devices/addDevice', function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.end();
  });

  

// Adds a new device to the DB
app.post('/api/devices/addDevice', (req, res) => {
     //Check if device/user pair is valid
    //Check if auth tokens are valid
    //Reject o/w if malformed 


    //check query details.
    const req_userId = (req.body.userId).trim();
    const req_deviceIds = (req.body.deviceId).trim();

    if(req_userId == "" || req_deviceIds == "" || req_userId == undefined || req_deviceIds == undefined){
        return res.status(400).send({ status: "invalid response"});
    }

    const device = new Device(req.body);
    /*
    Queries for userid, req_deviceId.
    If there is no such pair when querying then insert. otherwise do nothing. 
    */
    Device.updateOne({userId: req_userId, deviceId: req_deviceIds}, {$setOnInsert: device}, {upsert:true}, function (err, deviceData){
        if (err){
            return res.status(409).send(error); //error 409 resource already exists.
        }
            return res.status(200).json({ success: true,  deviceData});
    });


    /*
    device.save((error, deviceData) => {
        if (error){
            console.log(error)
            return res.status(400).send(error);
        }
        return res.status(200).json({ success: true, deviceData });
    });
    */
});


//Migrate to post? 
//Technically we building a resource. 
app.get('/api/devices/getAllDevices', (req, res) => {

    /*
        Add error checking, ie is userID not blank/defined.
    */

    Device.find({ userId: req.query.userId })
        .populate("name")
        .sort({ created: -1, name: 1 })
        .exec((error, devicesData) => {
            if (error) return res.status(400).send(error);
            return res.status(200).json({ success: true, devicesData });
        });
});

// Gets one device from the DB
// Rename to getDevice in future. 
app.post('/api/devices/getOneDevice', (req, res) => {
    //Behavior: returns null if a collection is not found, o/w returns the first one.
    //Do error checking of userID or deviceId is null
    const req_userId = (req.body.userId).trim();
    const req_deviceIds = (req.body.deviceId).trim();

    if(req_userId == "" || req_deviceIds == "" || req_userId == undefined || req_deviceIds == undefined){
        return res.status(400).send({ status: "invalid response", errorCode: error});
    }

    //Debug
    console.log("user, deviceID", req_userId, req_deviceIds); 

    Device.findOne({userId: req_userId , deviceId: req_deviceIds }, (error, deviceData) => {
        console.log(deviceData)
        if (error){
            console.log(error, deviceData)
            return res.status(400).send({ status: "error", errorCode: error});
        }
        console.log(deviceData);
        if(deviceData == null){
            return res.status(404).send({ status: "device and user pair not found.", errorCode: error});
        }

        return res.status(200).json({ status: "success", result: deviceData});
    });
});

// Deletes a device from the DB
app.delete('/api/devices/deleteOneDevice', (req, res) => {
    const deviceId = req.query.deviceId;
    const userId = req.query.userId;
    
    Device.findOneAndRemove({ deviceId: deviceId, userId: userId }, (error, deviceData) => {
        if (error) return res.status(400).send(error);
        return res.status(200).json({ success: true });
    });
});


// Server Port
app.listen(port, () => {
   console.log(`Orchestra backend listening on port ${port}`)
});