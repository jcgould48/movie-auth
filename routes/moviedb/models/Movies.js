const mongoose = require('mongoose')

//create blueprint for inputs into database


const MovieSchema = new mongoose.Schema({
title :{type:String, unique: true, default: '', lowercase: true, trim: true},
rating : {type:String, default: '', lowercase: true, trim: true},
synopsis : {type:String, default: '', lowercase: true, trim: true},
releaseyear : {type:String, default: '', lowercase: true, trim: true},
genre:{type:String, default: '', lowercase: true, trim: true},
director: {type:String, default: '', lowercase: true, trim: true},
boxoffice: {type:String,  default: '', lowercase: true, trim: true},
movieposter:{type:String, default: '', lowercase: true, trim: true}
})


module.exports = mongoose.model('movies', MovieSchema);