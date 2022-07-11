const express = require('express')
const axios = require('axios')
const cors = require('cors')

const { FIREBASE_AUTH_ENDPOINT, FIREBASE_REG_ENDPOINT, MONGO_DB_URI } = require("./config/config");
const { UserProfile } = require('../model/UserProfile');
const mongoose = require('mongoose');

const app = express()
const port = 3000

const mongoURI = MONGO_DB_URI;
console.log("Mongodb URI")
console.log(mongoURI)
//Connect to mongodb.
const connect = mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },)
    .then(() => console.log("Connect to the MONGODB server."))
    .catch(err => console.log(err));


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


/* Register user account. First adds user to the firebase auth database using firebases rest api. We 
   then add the user information in the userprofile database. 

   Expected payload
      email: { type: String, required: true},   
      userId: { type: String, required: true},           
      firstname: { type: String, required: true}, 
      lastname: { type: String, required: true},  
      phonenumber: { type: String, required: true},  
*/

app.post('/register-useraccount', async (req,res) => {

   // Perform and check to see if the json object has the follow properties.
   // If the property exists, perform a check to see if its not empty. 
   const checks = ['email', 'firstname', 'lastname', 'phonenumber','password']
   for(const property of checks){
      if(!(req.body.hasOwnProperty(property))){
         res.status(400).json({status: "failure", message: "Incomplete/Malformed payload"});
         return;
      }
      if(req.body[property].trim() === ''){
         res.status(400).json({status: "failure", message: "No empty fields are permitted."});
         return;
      }
   }

   // Generate a firebase payload and send a add account request to firebase rest api. 
   // If on event of failure, give the failure payload directly to the user. 
   // On success, continue on with the process of creating the account. (add to mongodb)
   let firebase_req_payload = {
      email: req.body.email,
      password: req.body.password,
      returnSecureToken: true
   }


   var firebase_payload;
   const register_req = axios.post(FIREBASE_REG_ENDPOINT, firebase_req_payload).then(response => {
      if ("data" in response) {
         firebase_payload = response["data"];
      }
   })
   .catch(error => {
      if (error.response) {
         // The request was made and the server responded with a status code
         // that falls out of the range of 2xx
         console.log(error.response.data);
         res.status(400).json(error.response.data);
         return;
      } else if (error.request) {
         // The request was made but no response was received
         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
         // http.ClientRequest in node.js
         console.log('Error', error.request);
         res.status(503).send(error.request);
         return;
      } else {
         // Something happened in setting up the request that triggered an Error
         console.log('Error', error.message);
         res.status(400).send(error.message);
         return;
      }
   })
   
   // Pause execution, and wait for our payload to arrive. This occurs once our promise is resolved. 
   await register_req; 
   if(firebase_payload === undefined){
      return;
   }
   
   // Generate another payload, which will be used to create a new entry in our mongodb. 
   // This entry represents the user profile information. Attempt to inject data into database.
   // Upon failure, we need to roll back, and delete the account. [Todo:]

   const payload = {
      userId: firebase_payload["localId"],
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phonenumber: req.body.phonenumber,
    }
    //Verify if the generate payload matches Device
    let account_profile = null;
    try{
      account_profile = new UserProfile(payload);
    }catch(err){
        return res.status(400).send({success: false, message: "Data doesn't match data schema"});
    }
    
    //Attempt to add our newly created user profile to the database, and return the auth tokens.
    account_profile.save().then(resp => {
      console.log(resp);
      res.status(200).send(firebase_payload);
    }).catch(err => {
      console.log(err);
      res.status(400).send(err)
    })

})

app.listen(port, () => {
   console.log(`Authentication app listening on port ${port}`)
})