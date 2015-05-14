// on page load
$(function(){
  // get and render the phrases
  Phrase.all();
  console.log("hello");
});

// // // // // // //

// VIEW OBJECT
function View() {};
View.render = function(items, parentId, templateId) {
  // render a template
  var template = _.template($("#" + templateId).html());
  // input data into template and append to parent
  $("#" + parentId).html(template({collection: items}));
};

// phrase OBJECT
function Phrase() {};
Phrase.all = function() {
  $.get("/catchphrases", function(res){ 
    // parse the response
    var phrases = JSON.parse(res);
    // render the results
    View.render(phrases, "phrase-ul", "phrase-template");
  });
};