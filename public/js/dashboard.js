'use strict';

if (window.COOKIES.loggedIn) {
  let $xhr = $.getJSON('/users/pols');

  $xhr.done((data) => {
    $('.dashboard').empty();
    $('.dashboard').append(`
      <div class="container">
      <h3 class="center-align body-title">Dashboard</h3>
      </div>
    `);

    for (let i = 0; i < data.length; i++) {
      const pol = data[i];

      if (pol.title === 'Sen') {
        pol.title = 'U.S. Senator';
      }
      else {
        pol.title = 'U.S. Representative';
      }

      if (pol.name === 'Barack Obama') {
        pol.title = 'U.S. President';
      }
      else if (pol.name === 'Joseph R. Biden') {
        pol.title = 'U.S. Vice President';
      }

      if (pol.party[0] === 'D') {
        pol.partyColor = 'pol-blue';
        pol.party = 'DEMOCRAT';
      }
      else if (pol.party[0] === 'R') {
        pol.partyColor = 'pol-red';
        pol.party = 'REPUBLICAN';
      }
      else {
        pol.party = 'INDEPENDENT';
      }


      if (i === 0 || i % 2 === 0) {
        $('.dashboard').append(`

          <div class="col s5 ${pol.partyColor} left-card">
            <div class="row">
              <div class="col s4">
                <div class="politician-img inline-b">
                  <a href="pol.html?${pol.name}">
                    <img src="${pol.picture_url}"  alt="${pol.name}" />
                  </a>
                </div>
              </div>
              <div class="col s4 details">
                <a href="pol.html?${pol.name}">
                  <p>${pol.name}</p>
                  <p>${pol.title}</p>
                  <p>${pol.state_name}</p>
                </a>
              </div>
              <div class="col s3 button">
                <button class="btn waves-effect waves-light" type="submit"
                name="action" data-id=${pol.pol_id}>
                  <i class="material-icons left">done</i>
                  FOLLOWING
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col s12">
                <a class="twitter-timeline" data-width="75%" data-height="325"
                data-dnt="true" data-theme="light"
                href="https://twitter.com/${pol.twitter}">
                </a>
              </div>
            </div>
          </div>

        `);
      }
      else {
        $('.dashboard').append(`
        <div class="col s5 ${pol.partyColor} right-card right">
          <div class="row">
            <div class="col s4">
              <div class="politician-img inline-b">
                <a href="pol.html?${pol.name}">
                  <img src="${pol.picture_url}"  alt="${pol.name}" />
                </a>
              </div>
            </div>
            <div class="col s4 details">
              <a href="pol.html?${pol.name}">
                <p>${pol.name}</p>
                <p>${pol.title}</p>
                <p>${pol.state_name}</p>
              </a>
            </div>
            <div class="col s3 button">
              <button class="btn waves-effect waves-light" type="submit"
               name="action" data-id=${pol.pol_id}>
                <i class="material-icons left">done</i>
                FOLLOWING
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <a class="twitter-timeline" data-width="75%" data-height="325" data-dnt="true" data-theme="light" href="https://twitter.com/${pol.twitter}"></a>
            </div>
          </div>
        </div>
        `);
      }
    }

    window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };

    return t;
    }(document, "script", "twitter-wjs"));

    $('button').on('click', function(event) {
      event.preventDefault();
      const polId = $(event.target).data('id');
      let $xhr = $.ajax({
        url: `/users/pols/${polId}`,
        type: 'DELETE'
      });
      $xhr.done(function(data) {
        window.location.replace(`/dashboard.html`);
      });
      $xhr.fail(function(err) {
        Materialize.toast('Unable to remove politician. Please try again.', 4000);
      });
    });
  });
  $xhr.fail(function(err) {
    Materialize.toast('Hi, something went wrong... my bad.', 4000);
  });

} else {
  window.location.replace(`/registration.html`);
}
