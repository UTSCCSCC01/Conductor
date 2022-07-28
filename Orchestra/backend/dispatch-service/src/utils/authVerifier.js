const axios = require('axios')
const { AUTH_VERIFY_ENDPOINT } = require('../config/config')

/*
    auth: true/false
    localId: null/notnull
    message: "message from the backend"
*/

const failure_payload_no_contact = {
    auth: false,
    localId: null,
    message: "not valid token"
};

/*
    Add checks to see if a user is verified + [check token date.]
    Add checks to see if a device is registered 
*/
async function auth_verify(payload){
    if(payload == undefined){
      return failure_payload_no_contact;
    }
    let return_payload;

    const auth_req = axios.post(AUTH_VERIFY_ENDPOINT, payload).then(response => {
        //console.log("Successful response from internal microservice: auth-microservice.verify-token");
        if ("data" in response) {
            return_payload = response["data"];
        }
     }).catch(error => {
        console.log(error.data);
        console.log("Failure connecting to google identityplatform");
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //console.log(error.response.data);
        return_payload = failure_payload_no_contact;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        //console.log('Error', error.request);
        return_payload = failure_payload_no_contact;
      } else {
        // Something happened in setting up the request that triggered an Error
        //console.log('Error', error.message);
        return_payload = failure_payload_no_contact;
      }
     }) 
     await auth_req;

     if(!return_payload){
        return failure_payload_no_contact;
     }
     
     return return_payload;
}

exports.auth_verify = auth_verify;