'use strict';

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
