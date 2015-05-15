// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    _ = require("underscore"),
    bodyParser = require("body-parser");

	app.use(express.static(__dirname + '/public'));

  // body parser config
  app.use(bodyParser.urlencoded({ extended: true }));



    // DATA
    var catchphrases =[
	  {id: 0, word: "bootstrap", definition: "awesome css framework"},
	  {id: 1, word: "foo", definition: "silly programming variable"},
	  {id: 2, word: "HTML template", definition: "a cookie-cutter approach to creating HTML pages"},
	  {id: 3, word: "AJAX", definition: "Asynchronous Javascript And XHTML"},
	  {id: 4, word: "DOM", definition: "Document Object Model"}
	];

	// ROUTES //

// root path
app.get("/", function (req, res){
  // render index.html
  res.sendFile(path.join(__dirname + '/public/views/phrases.html'));
});

// catchphrases index path
app.get("/catchphrases", function (req, res){
  // render catchphrases index as JSON
  res.send(JSON.stringify(catchphrases));
  console.log(catchphrases);
});

app.post("/catchphrases", function(req, res) {
  // find new catchphrase in the req.body
  var newPhrase = req.body;
  // get the last id in the array, increment by 1 and assign new id
  newPhrase.id = catchphrases[catchphrases.length -1].id + 1;
  //add to the catchphrase array
  catchphrases.push(newPhrase);
  // render the created object as json
  res.send(JSON.stringify(newPhrase));
  console.log("route is working");

});




//////// don't touch this!
app.listen(3000, function(req, res) {
  console.log("server working a-okay");
});