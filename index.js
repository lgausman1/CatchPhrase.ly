// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    _ = require("underscore"),
    bodyParser = require("body-parser"),
    db = require("./models");


	app.use(express.static(__dirname + '/public'));

  // body parser config
  app.use(bodyParser.urlencoded({ extended: true }));


// clear database
function drop(Model) {
  Model.remove({}, function (err) {
    console.log("all Phrases documents removed");
  });
}



	// ROUTES //

// root path
app.get("/", function (req, res){
  // render index.html
  res.sendFile(path.join(__dirname + '/public/views/phrases.html'));
});

// catchphrases index path
app.get("/catchphrases", function (req, res){

  db.cPhrase.find({},
  function(err, phrases) {
    res.send(phrases);
    console.log(phrases);
  });
});


app.post("/catchphrases", function (req, res) { 

  // OLD
  db.cPhrase.create(req.body.phrase,
    function(err, phrase) {
      console.log(phrase);
      res.send(201, phrase);
    });
});

app.post("/update", function (req, res){
  db.Phrases.findById(req.body.id, function (err, phrase) {
    if(err) {
      res.status(500).send({ error: 'database save error'});
    }
    
  })
});


app.delete("/catchphrases/:_id", function (req, res) {
  
  db.cPhrase.findOneAndRemove({_id: req.params._id}, 
    function (err, phrase) {
      console.log(req.params);
      res.send(204);
    });
});

//////// don't touch this!
app.listen(3000, function (req, res) {
  console.log("server working a-okay");
});