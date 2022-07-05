//import { AxiosResponse } from "axios";
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
export {getAuth};