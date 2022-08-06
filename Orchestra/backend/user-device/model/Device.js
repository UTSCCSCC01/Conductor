const mongoose = require('mongoose');

const botInfoSchema = mongoose.Schema({
    name: {type: String, required: true},
    buid: {type: String, required: true}
});

// Note: MongoDB automatically creates each document's identifier as "_id".
const deviceSchema = mongoose.Schema({
    //Application Lists
    bots:[{ type: [botInfoSchema], required: true}],         // Bots connected to the device. [Future: replace type string to type: BotInfo]
    
    native_app: [{type:[String], required: true}],
    custom_app: [{type:[String], required: true}],

    //Device metadata
    name: { type: String, required: true},   
    description: { type: String, required: true},      // Description of the bot                         
    status: {type: Boolean, required: true},          // Is it active or inactive: Potential delay, client can disconnect before.
    created: { type: Date, required: true},   
    
    //Core Device Info
    userId: { type: String, required: true},           // User identifier of device's owner
    deviceId: { type: String, required: true},         // Device identifier
    platform: { type: String, required: true },
});

const Device = mongoose.model('Device', deviceSchema);
const BotInfo = mongoose.model('BotInfo', botInfoSchema);

module.exports = { Device, BotInfo };