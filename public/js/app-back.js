// on page load
$(function(){
  // get and render the phrases
  Phrase.all();
  // set the view's behavior
  View.init();
});

// // // // // // //

// VIEW OBJECT
function View() {};

View.init = function() {
  // catchphrase form submit event listener
  $('#phrase-form').on('submit', function (e) {
    e.preventDefault();
    // format form data into a query string
    var phraseParams = $(this).serialize(); // success
    Phrase.create(phraseParams); // pass into model??
    console.log(phraseParams); // console confirms this
  });
};

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
    //var phrases = JSON.parse(res);
    var phrases = res;
    // render the results
    View.render(phrases, "phrase-ul", "phrase-template");
  });
};

Phrase.create = function(phraseParams) {
  // '/catchphrases' = ROUTE for the phraseParams
  $.post("/catchphrases", phraseParams).done(function(res) {
    // once done, re-render all catchphrases
    Phrase.all();
  }).done(function(res) {
      // reset form
      $("#phrase-form")[0].reset();
  });
};

// Phrase.delete here => phrase probably catchphrase here
Phrase.delete = function(phrase) {
  var phraseId = $(phrase).data()._id;
  $.ajax({ 
    url: '/catchphrases/' + phraseId,
    type: 'DELETE',
    success: function(res) {
      console.log('delete complete');
      Phrase.all();
    } // end success
  }); // end ajax
};  // end delete function
