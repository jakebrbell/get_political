(function() {
  'use strict';

  $('.button-collapse').sideNav();

  window.COOKIES = {};
  document.cookie.split('; ').forEach((prop) => {
    const propKey = prop.split('=')[0];
    const propValue = prop.split('=')[1];

    window.COOKIES[propKey] = propValue;
  });

  var hrefEncoded;
  var input;
  var query;

  $("input.top").keyup(() => {
    input = $('#search').val();
    hrefEncoded = `/search.html?${encodeURI(input)}`;
    $('a.test').prop('href', hrefEncoded);
  });

  $('#top-search').click(function(event) {
    event.preventDefault();
    if (Number.isNaN(parseInt(input))) {
      query = 'name=' + encodeURI(input);
    } else {
      query = 'zip=' + encodeURI(input);
    }

    var $xhr = $.getJSON(`/pols/?${query}`);

    $xhr.done(function(data) {
      if (data.length === 1) {
        window.location.replace(`/pol.html?${encodeURI(input)}`);
      } else if (data.length === 0) {
          Materialize.toast('That Search Will Not Work', 4000);
            } else {
        window.location.replace(`/search.html?${encodeURI(input)}`);
      }
    });

    $xhr.fail(function(err) {

      //toast goes here
      Materialize.toast('That Search Will Not Work', 4000);

      console.log(err);
    });
  });

  if (window.COOKIES.loggedIn) {
    $('.login').text('logout').click((_event) => {
      const $xhr = $.ajax({
        url: '/session',
        type: 'DELETE'
      });

      $xhr.done(() => {
        if ($xhr.status !== 200) {
          return Materialize.toast('Unable to log out. Please try again.');
        }

        window.location.href = '/';
      });

      $xhr.fail(() => {
        Materialize.toast('Unable to log out. Please try again.');
      });
    });
  }
})();
