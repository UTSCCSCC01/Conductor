const express = require("express");
let app = express();
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
app.listen(3000, () => console.log('Server running on port 3000!'))

app.use(express.json());

app.get('/:name', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("bot_infoDB");
        dbo.collection("bot").findOne({
            name: req.params.name
        },
            function (err, result) {
                if (err) throw err;
                res.json(result);
                db.close();
            });
    });
});

app.post('/', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("bot_infoDB");
        dbo.collection("bot").insertOne({
            name: req.body.name,
            description: req.body.description
        },
            function (err, result) {
                if (err) throw err;
                res.json(result);
                db.close();
            });
    });
});
