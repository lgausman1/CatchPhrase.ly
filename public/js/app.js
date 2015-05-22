// on page load
$(function(){

  var $newPhrase = $("#phrase-form"); // reference form
  var $phraseCon = $("#phrase-ul"); // phrase container
  var phraseTemp = _.template($("#phrase-template").html());
  var phrases = [];

  $.get("/catchphrases").
    done(function (phrases) {
      _(phrases).each(function (phrase) { 
        var $fraze = $(phraseTemp({phrase: phrase})); // maps to template
        $fraze.data("_id", $fraze._id); 
        $phraseCon.append($fraze);
      }); // end of each
    }); // end of done

// wait for #newPhrase submit
$newPhrase.on("submit", function (e) {
  e.preventDefault();
  console.log("phrase submitted"); // ok
  // turn form data into string
  var phraseData = $newPhrase.serialize();

  // POST form data
  $.post("/catchphrases", phraseData).
    done(function (data) {

      // reset the form
      $newPhrase[0].reset();
      var $fraze = $(phraseTemp({phrase: data}));
      console.log($fraze); // not working

      // add id to $fraze
      $fraze.data("_id", data._id);
      $phraseCon.append($fraze);
    }); // end done

  }); // end post

  $("#phrase-ul").on("click", "button.close",  function (e) {
        e.preventDefault();
        var $fraze = $(this).closest(".list-group-item");
        var frazeId = $(this).data("id");
        $.ajax({
          url: "/catchphrases/" + frazeId,
          type: "DELETE"
          }).done(function () {
            $fraze.remove();
          });
  });



}); // end on load
