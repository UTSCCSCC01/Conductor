const mongoose = require('mongoose');

// Note: MongoDB automatically creates each document's identifier as "_id".
const eventSchema = mongoose.Schema({
    eventConfig: { type: Number, required: true },      // Event config
                                                            // 1: Run after event passed
                                                            // 2: Hang till predicate satisfied
                                                            // 3: On client failure. Retry signal
    deviceId: { type: String, required: true },         // Device (platform) to execute event
    appletType: { type: Number, required: true },       // Applet type to execute
                                                            // 0: Orchestra Web Bot
                                                            // 1: Native Application
                                                            // 2: Custom Binaries
    applet: { type: String, required: true },           // Applet to execute
    appletArg: { type: String },                        // Execution argument for the applet
    eventName: { type: String, required: true },        // Name of the event
    description: { type: String, required: true },      // Description of the event
    executionDate: { type: Date, required: true },      // Date to execute event
    predicate: { type: [String], required: true },      // Predicates added to the event
    userId: { type: String, required: true },           // User who built the event
    created: { type: Date, required: true },   
});

const EventBuilder = mongoose.model('EventBuilder', eventSchema);

module.exports = { EventBuilder };