const mongoose = require('mongoose');
// code for making schema
const mySchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

// code for making model
const myModel = mongoose.model('users', mySchema);
module.exports = myModel;