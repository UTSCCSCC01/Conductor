const axios = require('axios')
const { ADD_EVENT_ENDPOINT } = require('../config/config')


/*
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
    */

async function send_event(payload){
    if(payload == undefined){
      return false;
    }

    /**
     * Generate our payload
     */

    let eventId =  payload["eventId"];
    let TotalNumberOfPredicates = payload["predicate".length];
    let DateOfExecution = payload["executionDate"];
    //Parse Event Config
    let event_config_array = payload["eventConfig"];
    let RunAfterEventPassed = event_config_array.includes(1);
    let HangtillPredicateSatisfied = event_config_array.includes(2);
    let ClientFailureRetryEvent = event_config_array.includes(3);


    let sender_payload = {
      eventId: eventId,
      TotalNumberOfPredicates: TotalNumberOfPredicates,
      DateOfExecution: DateOfExecution,
      RunAfterEventPassed: RunAfterEventPassed,
      HangtillPredicateSatisfied: HangtillPredicateSatisfied,
      ClientFailureRetryEvent: ClientFailureRetryEvent
    }


    
    let return_payload = undefined;
    try{
      return_payload = axios.post(ADD_EVENT_ENDPOINT,sender_payload);
    }catch{
      return false;
    }
    
    if(return_payload != undefined){
      return true;
    }
    return false;
  
}

exports.send_event = send_event;