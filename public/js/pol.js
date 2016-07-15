(() => {
  'use strict';

  const url = window.location.href;

  const qmark = url.indexOf('?');
  const encoding = url.substring(`${qmark + 1}`);
  let query1;
  let polId;

  if (Number.isNaN(parseInt(encoding))) {
    query1 = `name=${encoding}`;
  }
  else {
    query1 = `zip=${encoding}`;
  }

  let $xhr = $.getJSON(`/pols/?${query1}`);

  $xhr.done((data) => {
    const pol = data[0];

    polId = pol.id;

    if (pol.title === 'Sen') {
      pol.title = 'United States Senator';
    }
    else {
      pol.title = 'United States Representative';
    }

    if (pol.name === 'Barack Obama') {
      pol.title = 'President of the United States';
    }
    else if (pol.name === 'Joseph R. Biden') {
      pol.title = 'Vice-President of the United States';
    }

    if (data.length === 1) {
      $('.politician').remove();
      $('.politician-container').append(`
        <div class="politician pol-blue">
          <div class="row pol-top">
            <div class="politician-img col s4">
              <img src="${pol.picture_url}" height="275px"
              width="225px" alt="${pol.name}" />
              <ul>
                <li>
                  <a href=${pol.facebook} target="_blank">
                    <i class="fa fa-facebook-square fa-3x"></i>
                  </a>
                </li>
                <li>
                  <a href=${pol.twitter} target="_blank">
                    <i class="fa fa-twitter-square fa-3x"></i>
                  </a>
                </li>
                <li>
                  <a href=${pol.youtube} target="_blank">
                    <i class="fa fa-youtube-square fa-3x"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div class="details col s5">
              <h1>${pol.name}</h1>
              <h2>${pol.title}</h2>
              <h5>${pol.state_name}</h5>
              <p>${pol.street}</p>
              <p> ${pol.city}, ${pol.state} ${pol.zipcode}</p>
              <p class="pushdown"> Phone: ${pol.phone}</p>
            </div>

            <div class="col s3">
              <button class="no-follow-btn btn waves-effect waves-light"
              type="submit" name="action">
                FOLLOW
                <i class="material-icons left">supervisor_account</i>
              </button>
            </div>
          </div>

          <div class="row">
            <div class="pol-main col s4">
              <a class="twitter-timeline" data-width="300" data-height="450"
                data-dnt="true" data-theme="light" href="${pol.twitter}">
              </a>
            </div>

            <div class="class col s8">
              <h1 class="center-align">Biography</h1>
              <p class="bio">${pol.bio}</p>
            </div>
          </div>
        </div>`);

      window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
          t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
          t._e.push(f);
        };

        return t;
      }(document, 'script', 'twitter-wjs'));

      $('button').on('click', (event) => {
        event.preventDefault();
        if ($('button').hasClass('no-follow-btn')) {
          if (!window.COOKIES.loggedIn) {
            window.location.href = '/registration.html';

            return;
          }

          $('button')
            .removeClass('no-follow-btn')
            .addClass('yes-follow-btn')
            .empty();
          $('button')
            .text('FOLLOWING')
            .append('<i class="material-icons left">done</i>');
          let $xhr = $.ajax({
            url: `/users/pols/${polId}`,
            type: 'POST'
          });
        }
        else if ($('button').hasClass('yes-follow-btn')) {
          $('button')
            .removeClass('yes-follow-btn')
            .addClass('no-follow-btn')
            .empty();
          $('button')
            .text('FOLLOW')
            .append('<i class="material-icons left">supervisor_account</i>');
          let $xhr = $.ajax({
            url: `/users/pols/${polId}`,
            type: 'DELETE'
          });
        }
      });

      if (window.COOKIES.loggedIn) {
        $xhr = $.getJSON('/users/pols');

        $xhr.done((data) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].pol_id === pol.id) {
              $('button')
                .removeClass('no-follow-btn')
                .addClass('yes-follow-btn')
                .empty();
              $('button')
                .text('FOLLOWING')
                .append('<i class="material-icons left">done</i>');

              return;
            }
          }
        });
      }
    }
    else {
      Materialize.toast('That Search Will Not Work', 4000);
    }
  });

  $xhr.fail(() => {
    Materialize.toast('That Search Will Not Work', 4000);
  });
})();
