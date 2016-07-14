'use strict';

var query;

$("input.top").keyup(() => {
  var input = $('#search').val();

  var hrefEncoded = `search.html?${encodeURI(input)}`
  $('a.test').prop('href', hrefEncoded);
  $('form input').prop('value', input);
  $('form button').attr('name', input);
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
        window.location.replace("http://localhost:8000/pol.html");
    } else if (data.length === 0) {
      Materialize.toast('That Search Will Not Work', 4000)
    } else {
      window.location.replace(`http://localhost:8000/search.html?${encodeURI(input)}`);
    }


  });

  $xhr.fail(function(err) {
    Materialize.toast('That Search Will Not Work', 4000);
  });

});

// Initialize Materialize side nav
$(".button-collapse").sideNav();

// Initialize Materialize scrollspy
$('.scrollspy').scrollSpy();


var $xhrNYT = $.getJSON('http://api.nytimes.com/svc/topstories/v2/politics.json?api-key=27eba7b727774aeab3b27334d51cad67');

$xhrNYT.done(function(data) {
  var articles = [];

  for (var i = 0; articles.length < 3; i++) {
    if (data.results[i].multimedia[3]) {
      articles.push(data.results[i]);
    }
  }

  $('.lower-news > .row').append(`

    <div class="col s4">
      <div class="card">
        <a href=${articles[0].url} target="_blank">
          <div class="card-image">
            <img src="${articles[0].multimedia[3].url}" height="200px">
          </div>
          <div class="card-content">
            <p class="center-align"><strong>${articles[0].title}</strong></p>
          </div>
        </a>
      </div>
    </div>
    <div class="col s4">
      <div class="card">
        <a href=${articles[1].url} target="_blank">
          <div class="card-image">
            <img src="${articles[1].multimedia[3].url}" height="200px">
          </div>
          <div class="card-content">
            <p class="center-align"><strong>${articles[1].title}</strong></p>
          </div>
        </a>
      </div>
    </div>
    <div class="col s4">
      <div class="card">
        <a href=${articles[2].url} target="_blank">
          <div class="card-image">
            <img src="${articles[2].multimedia[3].url}" height="200px">
          </div>
          <div class="card-content">
            <p class="center-align"><strong>${articles[2].title}</strong></p>
          </div>
        </a>
      </div>
    </div>
  `);
});

$xhrNYT.fail(function(err) {
  console.log(err);
});
