
//Default endpoint. Use only for developement/debuggging specific microservice
let FIREBASE_AUTH_ENDPOINT = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB48jisOlggl4LFKoYSIcm2DhlfjWuRStY"
let FIREBASE_REG_ENDPOINT = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB48jisOlggl4LFKoYSIcm2DhlfjWuRStY"

let MONGO_DB_URI = "mongodb+srv://P1REcH4R8OGficA0:XEEx2aGFa72zfoQL@cluster0.wnx0m.mongodb.net/?retryWrites=true&w=majority"
let PORT = 3000

//If in production/diff dev enviroment, set new endpoints. [Issue?]
if(process.env.FIREBASE_AUTH_ENDPOINT != undefined && process.env.FIREBASE_API_KEY != undefined  && process.env.FIREBASE_REG_ENDPOINT != undefined){
    FIREBASE_AUTH_ENDPOINT = (process.env.FIREBASE_AUTH_ENDPOINT) + (process.env.FIREBASE_API_KEY)
    FIREBASE_REG_ENDPOINT = (process.env.FIREBASE_REG_ENDPOINT) + (process.env.FIREBASE_API_KEY)
}


if(process.env.MONGO_DB_URI != undefined){
    console.log("Docker configs has been loaded.")
    console.log(process.env.MONGO_DB_URI)
    MONGO_DB_URI = process.env.MONGO_DB_URI
}


module.exports = {
    FIREBASE_AUTH_ENDPOINT,
    FIREBASE_REG_ENDPOINT,
    MONGO_DB_URI,
    PORT
};


