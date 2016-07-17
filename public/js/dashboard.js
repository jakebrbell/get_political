(() => {
  'use strict';

  if (window.COOKIES.loggedIn) {
    const $xhr = $.getJSON('/users/pols');

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

      window.twttr = (function(d1, s1, id) {
        let js, fjs = d1.getElementsByTagName(s1)[0],
        t1 = window.twttr || {};
        if (d1.getElementById(id)) {
          return t1;
        }
        js = d1.createElement(s1);
        js.id = id;
        js.src = 'https://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);

        t1._e = [];
        t1.ready = function(f1) {
          t1._e.push(f1);
        };

        return t1;
      }(document, 'script', 'twitter-wjs'));

      $('button').on('click', (event) => {
        event.preventDefault();
        const polId = $(event.target).data('id');

        const $xhr2 = $.ajax({
          url: `/users/pols/${polId}`,
          type: 'DELETE'
        });

        $xhr2.done(() => {
          window.location.replace('/dashboard.html');
        });
        $xhr2.fail(() => {
          Materialize.toast('Unable to remove politician. Please try again.',
           4000);
        });
      });
    });
    $xhr.fail(() => {
      Materialize.toast('Hi, something went wrong... my bad.', 4000);
    });
  }
  else {
    window.location.replace('/registration.html');
  }
})();
