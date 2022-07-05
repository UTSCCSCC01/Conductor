const mongoose = require('mongoose');

// Note: MongoDB automatically creates each document's identifier as "_id".
const deviceSchema = mongoose.Schema({
    bots: [ { type: String } ],         // Bots connected to the device. [Future: replace type string to type: BotInfo]
    created: { type: Date },            // Date device added
    deviceId: { type: String },         // Device identifier
    description: { type: String },      // Description of the bot
    name: { type: String },             // Device Name
    platform: [ { type: Boolean } ],    // Platform of the device
                                        // [Android, iOS, Linux, Windows]
    status: { type: Boolean },          // Is it active or inactive
    userId: { type: String },           // User identifier of device's owner
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = { Device };