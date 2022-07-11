//import { AxiosResponse } from "axios";
const axios = require('axios')



async function regUser(payload){
    let reg_status = null;
    const reg_user = axios.post("http://localhost:8080/register-useraccount", payload)
    .then((res /** Promise<AxiosResponse> */) => {
        console.log("Successful Response from Authentication Service");
        if("data" in res){

            reg_status =  res["data"]
        }
    }).catch((res_error) => {
        let error_status;
        if(res_error.response){
            error_status = res_error.response.data;
            if(error_status.error.errors){
                let result = "Error: "+ (error_status.error.errors[0].message);
                reg_status = result;
            }
        }
    })
    const blocker = await reg_user;
    console.log("Finished running get auth status: Returning result to caller");
    return reg_status;
}
export {regUser};