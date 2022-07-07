/* install nodemon using: npm i nodemon
   setup a mongoDB databse with name "bot_infoDB" and collection name "bot"
   make sure the url for the database is "mongodb://localhost:27017/"
   install postman.
   start server with: > nodemon app.js
   follow instructions
*/


const cors = require('cors');
const express = require("express"); //load modules for express
let app = express();   //allows app to use all express functionalities
app.use(cors());
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";   // url for MongoDB (1)
app.listen(3006, () => console.log('Server running on port 3006!'))  //confirming in terminal when connected to localhost:3000

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send({
            status: 400,
            message: err.message
        }); // Bad request
    }
    next();
}); //middleware for the server to read JSON for POST request


app.get('/marketplace/', (req, res) => {
    MongoClient.connect(url, function (err, db) {     //connect to the mongoDB url provided above (1)
        if (err) throw err;                           // if in case of an error, we give an error.
        var database = db.db("bot_infoDB");           // storing bot_infoDB database in our url
        database.collection("bot").find().sort({ name: 1 }).toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
        // finding bot object by the name in the collection "bot" in bot_infoDB
    });
});
