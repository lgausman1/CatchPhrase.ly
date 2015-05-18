
/////// mongoose settings
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/newPhrase_app");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log("DB connected");
});
//var Schema = new mongoose.Schema;

var phraseSchema =  new mongoose.Schema({
  word: { 
  	type: String, 
  	default: "" 
  },
  definition: { 
  	type: String, 
  	default: "" 
  }
});

var cPhrase = mongoose.model("cPhrase", phraseSchema);

module.exports.cPhrase = cPhrase;