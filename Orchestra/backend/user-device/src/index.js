const express = require('express');
const cors = require('cors');

// Server Port Connection
const app = express();
const port = 3007;

// MongoDB Connection
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/orchestra";
// MongoDB models
const { Device } = require('../model/Device');

const connect = mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

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

app.post('/user-device', (req, res) => {
    res.send("This is the device service. If working through port 8080 nginx working");
});

// Remove ALLOW-CORS headers after we dockerize and setup nginx for frontend
app.options('/auth', function (req, res) {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader('Access-Control-Allow-Methods', '*');
   res.setHeader("Access-Control-Allow-Headers", "*");
   res.end();
});

// Adds a new device to the DB
app.post('/api/devices/addDevice', (req, res) => {
    const device = new Device(req.body);
    device.save((error, deviceData) => {
        if (error) return res.status(400).send(error);
        return res.status(200).json({ success: true, deviceData });
    });
});

// Gets all devices from the DB
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