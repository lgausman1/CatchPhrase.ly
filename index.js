// REQUIREMENTS //
var express = require("express"),
    app = express(),
    path = require("path"),
    _ = require("underscore"),
    bodyParser = require("body-parser");

    //app.get("/", function(req, res) {
    //	res.send("Hello world");
    //});

	app.use(express.static(__dirname + '/public'));

    app.listen(3000, function(req, res) {
    	console.log("server working a-okay");
    });

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
});






