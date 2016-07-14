'use strict'

var hrefEncoded;
var input;
var query;


// functionality for nav bar

$("input.top").keyup(() => {
  input = $('#search').val();
  hrefEncoded = `search.html?${encodeURI(input)}`
  $('a.test').prop('href', hrefEncoded);
});

$('#top-search').click(function( event ) {
  event.preventDefault();
  if (Number.isNaN(parseInt(input))) {
    query = 'name=' + encodeURI(input);
  } else {
    query = 'zip=' + encodeURI(input);
  }

  var $xhr = $.getJSON(`http://localhost:8000/pols/?${query}`);

  $xhr.done(function(data) {
    if ($xhr.status !== 200) {
      // The served an unsuccessful status code.
      return;
    }
    if (data.length === 1) {
      window.location.replace(`http://localhost:8000/pol.html?${encodeURI(input)}`);
    } else if (data.length === 0) {
        Materialize.toast('That Search Will Not Work', 4000);
          } else {
      window.location.replace(`http://localhost:8000/search.html?${encodeURI(input)}`);
    }
  });
  $xhr.fail(function(err) {

    //toast goes here
    Materialize.toast('That Search Will Not Work', 4000);

    console.log(err);
  });

});
