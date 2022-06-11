
//Default endpoint. Use only for developement/debuggging specific microservice
let FIREBASE_AUTH_ENDPOINT = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB48jisOlggl4LFKoYSIcm2DhlfjWuRStY"

//If in production/diff dev enviroment, set new endpoints. [Issue?]
if(process.env.FIREBASE_AUTH_ENDPOINT != undefined && process.env.FIREBASE_API_KEY != undefined){
    FIREBASE_AUTH_ENDPOINT = (process.env.FIREBASE_AUTH_ENDPOINT) + (process.env.FIREBASE_API_KEY)
}

module.exports = {
    FIREBASE_AUTH_ENDPOINT
};