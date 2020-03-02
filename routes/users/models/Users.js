const mongoose = require('mongoose')

//create blueprint for inputs into database



const UserSchema = new mongoose.Schema({
name: {type:String, default: '', lowercase: true, trim: true},
email: {type:String, unique: true, default: '', lowercase: true, trim: true},
password: {type:String, default: '', trim: true},

})

//we name the UserSchema users and export the model (aka class)
module.exports = mongoose.model('users', UserSchema);