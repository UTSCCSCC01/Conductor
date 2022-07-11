const mongoose = require('mongoose');

// Note: MongoDB automatically creates each document's identifier as "_id".
// Never ever store passwords here. 
const userProfile = mongoose.Schema({
    email: { type: String, required: true},   
    userId: { type: String, required: true},           // Firebase userid
    firstname: { type: String, required: true}, 
    lastname: { type: String, required: true},  
    phonenumber: { type: String, required: true},  
});

const UserProfile = mongoose.model('UserProfile', userProfile);

module.exports = { UserProfile };