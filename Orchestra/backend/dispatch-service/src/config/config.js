let GENERIC_ENDPOINT = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB48jisOlggl4LFKoYSIcm2DhlfjWuRStY"

let AUTH_VERIFY_ENDPOINT = "http://localhost:8080/verify-token"

//If in production/diff dev enviroment, set new endpoints. [Issue?]
if(process.env.GENERIC_ENDPOINT != undefined){
    GENERIC_ENDPOINT = (process.env.GENERIC_ENDPOINT);
}

//If in production/diff dev enviroment, set new endpoints. [Issue?]
if(process.env.AUTH_VERIFY_ENDPOINT != undefined){
    AUTH_VERIFY_ENDPOINT = (process.env.AUTH_VERIFY_ENDPOINT);
}


module.exports = {
    GENERIC_ENDPOINT,
    AUTH_VERIFY_ENDPOINT
};


