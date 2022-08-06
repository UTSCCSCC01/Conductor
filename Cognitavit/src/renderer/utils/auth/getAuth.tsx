//import { AxiosResponse } from "axios";

import { AuthenticationToken } from '../../types'
const axios = require('axios').default;

/**
interface AuthToken{
        kind: string,
        localId: string,
        email: string,
        displayName: string,
        idToken: string,
        registered: boolean,
        refreshToken: string,
        expiresIn : string
}
*/
async function getAuth(email:string, password:string){
    let auth_status = null;
    const auth_req = axios.post("http://localhost:8080/auth", {
        "email": email,
        "password": password,
        "returnSecureToken":true
    }).then((res:any /** Promise<AxiosResponse> */) => {
        console.log("Successful Response from Authentication Service");
        if("data" in res){
            console.log(res["data"]);
            auth_status =  res["data"]
        }
    }).catch((res_error:any) => {
        console.log(res_error);
        auth_status = null;
    })
    const blocker = await auth_req;
    console.log("Finished running get auth status: Returning result to caller");
    return auth_status;
}


const failure_payload_no_contact = {
    auth: false,
    localId: null,
    message: "not valid token"
};

/* 
    returns 
    auth: boolean,
    localId: string | null,
    message: "not valid token" | "not valid token"

*/
async function verifyAuth(payload: any){
    if(payload == undefined){
        return failure_payload_no_contact;
      }
      let return_payload;
  
      const auth_req = axios.post("http://localhost:8080/verify-token", payload).then( (response:any) => {
          //console.log("Successful response from internal microservice: auth-microservice.verify-token");
          if ("data" in response) {
              return_payload = response["data"];
          }
       }).catch((error:any) => {
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




export { getAuth , verifyAuth };