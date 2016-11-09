const config = require('../config.js');
const  mongoose = require("mongoose");
const uri = "mongodb://"+config.mongodb.host+"/"+config.mongodb.dataBaseName;
const options = config.mongodb.options;
mongoose.connect(uri, options);

module.exports = mongoose;