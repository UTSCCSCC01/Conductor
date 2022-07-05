
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

// Adds a new device to the DB
app.post('/api/devices/addDevice', (req, res) => {
    const device = new Device(req.body);
    device.save((error, deviceData) => {
        if (error) return res.status(400).send(error);
        return res.status(200).json({ success: true, deviceData });
    });
});


//Get 
app.get('/api/devices/getAllDevices', (req, res) => {
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
app.get('/api/devices/getOneDevice', (req, res) => {
    const userId = req.params.userId;
    const deviceId = req.params.deviceId;
    Device.findOne({ userId: userId , deviceId: deviceId }, (error, deviceData) => {
        if (error) return res.status(400).send(error);
        return res.status(200).json({ success: true, deviceData });
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