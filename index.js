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

	// ROUTES //

// root path
app.get("/", function (req, res){
  // render index.html
  res.sendFile(path.join(__dirname + '/public/views/phrases.html'));
});

// catchphrases index path
app.get("/catchphrases", function (req, res){
  // render catchphrases index as JSON
  //res.send(JSON.stringify(catchphrases));
  db.cPhrase.find({},
  function(err, phrases) {
    res.send(phrases);
    console.log(phrases);
  });
});


app.post("/catchphrases", function (req, res) { 
  // find new catchphrase in the req.body
  //var newPhrase = req.body;
  // get the last id in the array, increment by 1 and assign new id
  //newPhrase.id = catchphrases[catchphrases.length -1].id + 1;
  //add to the catchphrase array
  //catchphrases.push(newPhrase);
  // render the created object as json
  //res.send(JSON.stringify(newPhrase));
  //console.log("route is working");
  db.cPhrase.create(req.body.phrase,
    function(err, phrase) {
      console.log(phrase);
      res.send(201, phrase);
    });
});


app.delete("/catchphrases/:_id", function (req, res) {
  // set the value of Id
  //var targetId = req.params.id;
  //find item in array matching Id
  //var targetItem = _.findWhere(catchphrases, {id: targetId});
  // get the index of found item
  //var index = catchphrases.indexOf(targetItem);
  // remove the item at that index only remove 1 item
  //catchphrases.splice(index, 1);
  // render deleted object
  //res.send(JSON.stringify(targetItem));
  db.cPhrase.findOneAndRemove({_id: req.params._id},
    function (err, phrase) {
      res.send(204);
    });
});

//////// don't touch this!
app.listen(3000, function (req, res) {
  console.log("server working a-okay");
});