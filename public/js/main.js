'use strict'

let hrefEncoded = '';
let input = ''
let query = '';


// functionality for nav bar

$("input.top").keyup(() => {
  input = $('#search').val();
  console.log($('#search').val());
  hrefEncoded = `search.html?${encodeURI(input)}`
  $('a.test').prop('href', hrefEncoded);
});

$('#top-search').click(function( event ) {
  event.preventDefault();
  if (Number.isNaN(parseInt(input))) {
    query = 'name=' + encodeURI(input);
    console.log(query);
  } else {
    query = 'zip=' + encodeURI(input);
    console.log(query);
  }

  var $xhr = $.getJSON(`http://localhost:8000/pols/?${query}`);

  $xhr.done(function(data) {
    if ($xhr.status !== 200) {
      // The served an unsuccessful status code.
      return;
    }
    if (data.length === 1) {
      console.log('this should have switched the page');
      window.location.replace(`http://localhost:8000/pol.html?${encodeURI(input)}`);
    } else if (data.length === 0) {
      alert('These are not the politicians you\'re looking for!')
    } else {
      window.location.replace(`http://localhost:8000/search.html?${encodeURI(input)}`);
    }
  });
  $xhr.fail(function(err) {
    alert('These are not the politicians you\'re looking for!')
    console.log(err);
  });

});

$(".button-collapse").sideNav();
