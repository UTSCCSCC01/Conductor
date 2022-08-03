
//Default endpoint. Use only for developement/debuggging specific microservice
let MONGO_DB_URI = "mongodb+srv://P1REcH4R8OGficA0:XEEx2aGFa72zfoQL@cluster0.wnx0m.mongodb.net/?retryWrites=true&w=majority"
let PORT = 3000



if(process.env.MONGO_DB_URI != undefined){
    console.log("Docker configs has been loaded.")
    console.log(process.env.MONGO_DB_URI)
    MONGO_DB_URI = process.env.MONGO_DB_URI
}

module.exports = {
    MONGO_DB_URI,
    PORT
};