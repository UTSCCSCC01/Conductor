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
/*
GET REQUEST: localhost:3000/marketplace/<name_of_the_bot>
use the above url to get the description of the bot after the URL slug of /marketplace.

eg: localhost:3000/marketplace/adidasbot
this will give me JSON object with whose name matches with the bot name if it exists in the database.
*/
app.get('/marketplace/:name', (req, res) => {        //temporary url. get information about the bot name in marketplace/:name
    MongoClient.connect(url, function (err, db) {     //connect to the mongoDB url provided above (1)
        if (err) throw err;                           // if in case of an error, we give an error.
        var database = db.db("bot_infoDB");           // storing bot_infoDB database in our url
        database.collection("bot").findOne({          // finding bot object by the name in the collection "bot" in bot_infoDB
            name: req.params.name
        },
            function (err, result) {
                if (err) throw err;                   // if error in fetching the data, throw err
                if (!result) return res.status(404).send(`No bot with name ${req.params.name} found`); // if no bot exists, send 404
                res.json(result);        // send the description of the bot
                db.close();                          // close database connection
            });
    });
});


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
/*
POST REQUEST: localhost:3000/botbuilder
use the above url and provide a JSON object with the format:
{
    "name" : <name_of_the_bot>
    "description" : <description_of_the_bot>
}

eg: POST REQUEST AT localhost:3000/botbuilder
and go to body and choose raw and make an appropriate JSON object as shown below:

{
    "name" : "stockalert",
    "description" : "alerts the user of a stock when down by a percentage",
    "sourcecode" : "http ://www.github.com/ejfW2329i"
}

if it succeeds, then you will see an appropriate message
*/
app.post('/botbuilder/', (req, res) => {       // add bot to the database
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("bot_infoDB");
        dbo.collection("bot").insertOne({
            name: req.body.name,                  // post name for the bot
            description: req.body.description,    // post description of the bot
            sourcecode: req.body.sourcecode       //post the source code link for the bot
        },
            function (err, result) {
                if (err) throw err;        //throw error if not succeeded
                res.status(200).send(`${req.body.name} added to the database`);    //
                db.close();
            });
    });
});

