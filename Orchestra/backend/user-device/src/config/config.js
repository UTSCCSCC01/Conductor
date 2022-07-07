
//Default endpoint. Use only for developement/debuggging specific microservice
let MONGO_DB_URI = "mongodb://localhost:27017/orchestra"
let PORT = 3007



if(process.env.MONGO_DB_URI != undefined){
    console.log("Docker configs has been loaded.")
    console.log(process.env.MONGO_DB_URI)
    MONGO_DB_URI = process.env.MONGO_DB_URI
}

module.exports = {
    MONGO_DB_URI,
    PORT
};