//Follow same schema as mongodb Device.js schema as specified in the microservice.
//Gets all the required information 

type DeviceModelSchema = {
    bots: [ {type: String} ],     //We haven't devided on the type
    created: { type: Date },    //Current Date
    deviceId: { type: String },      //Get device id via ipc
    description: { type: String },   //No Description
    name: { type: String },           //os.hostname
    platform: [ { type: Boolean } ],    //os.platform
    status: { type: Boolean },        //offline
    userId: { type: String } //get authtoken.
};

export {DeviceModelSchema};