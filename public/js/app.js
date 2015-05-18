// on page load
$(function(){

  var $newPhrase = $("#phrase-form"); // reference form
  var $phraseCon = $("phrase-ul"); // phrase container
  var phraseTemp = _.template($("#phrase-template").html());
  var phrases = [];

  $.get("/catchphrases").
    done(function (phrases) {
    console.log(phrases); // ok returns array of objects
      _(phrases).each(function (phrase) { 
       console.log(phrase); // ok
        var $fraze = $(phraseTemp(phrase));
        $fraze.data("_id", fraze._id); // underscore in quotes?
        console.log($fraze.data()); // not logging to console
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
      console.log(data); // ok

      // reset the form
      $newPhrase[0].reset();
      var $fraze = $(phraseTemp(data));
      console.log($fraze); // not working

      // add id to $fraze
      $fraze.data("_id", data._id);
      $phraseCon.append($fraze);
    }); // end done

  }); // end post

  $newPhrase.on("click", ".list-group-item .close", function (e) {
    var $fraze = $(this).closest(".list-group-item");
    var frazeId = $fraze.data("_id");
    console.log("DELETE", frazeId);
    $.ajax({
      url: "/catchphrases/" + frazeId,
      type: "DELETE"
      }).done(function () {
        $fraze.remove();
      });
  });

}); // end on load
