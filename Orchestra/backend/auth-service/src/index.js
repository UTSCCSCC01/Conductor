const express = require('express')
const axios = require('axios')
const cors = require('cors')

const { FIREBASE_AUTH_ENDPOINT } = require("./config/config");

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
//Middleware that handles malformed json objects in request body
app.use((err, req, res, next) => {
   if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error(err);
      return res.status(400).send({
         status: 400,
         message: err.message
      }); // Bad request
   }
   next();
});

app.post('/auth-service', (req, res) => {
  res.send("This is the authentication service. If working through port 8080 nginx working")
})

/* Takes in an auth details email, password and issue a json web token that can be used to access
api services. This cert token is used to identify and authorize the user. 
*/

//Remove ALLOW-CORS headers after we dockerize and setup nginx for frontend
app.options('/auth', function (req, res) {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader('Access-Control-Allow-Methods', '*');
   res.setHeader("Access-Control-Allow-Headers", "*");
   res.end();
 });


app.post('/auth',(req, res) => {
   console.log("User entered value")
   console.log(req.body);
   const auth_req = axios.post(FIREBASE_AUTH_ENDPOINT, req.body).then(response => {
      console.log("Sucessful Response from firebase:")
      if ("data" in response) {
         //res.json(response["data"]); [old]
         res.status(200).json(response["data"]);
      }
   }).catch(error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      res.status(400).json(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log('Error', error.request);
      res.send(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      res.send(error.message);
    }
   })
})

/* Implement verification of JSON Web Tokens.
Idea: Use the firebase-admin-sdk. Take a post request from the client with the tokenid. tokenid is a simple json web token
Note: Perhaps we reduce dependency on this microservice, and have all microservices use firebase-sdk on its own.
*/
app.post('/verify-token', (req,res) => {
  res.send("To be implemented? " + process.env.FIREBASE_AUTH_ENDPOINT + " current: " + FIREBASE_AUTH_ENDPOINT )
})

app.listen(port, () => {
   console.log(`Authentication app listening on port ${port}`)
})