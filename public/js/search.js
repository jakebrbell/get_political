'use strict';

const url = window.location.href;

const qmark = url.indexOf('?');
const encoding = url.substring(`${qmark + 1}`);
let query1 = '';

if (Number.isNaN(parseInt(encoding))) {
  query1 = 'name=' + encoding;
} else {
  query1 = 'zip=' + encoding;
}

var $xhr = $.getJSON(`/pols/?${query1}`);

$xhr.done(function(data) {
  if (data.length === 1) {

    window.location.replace("/pol.html");

  } else {
    for (var i = 0; i < data.length; i++) {

      const pol = data[i];
      let partyColor = "";

      if (pol.party[0] === 'D') {
        partyColor = 'pol-blue';
        pol.party = 'Democrat'
      } else if (pol.party[0] === 'R') {
        partyColor = 'pol-red';
        pol.party = 'Republican'
      } else {
        pol.party = 'Independent'
      }

      if (pol.title === 'Sen') {
        pol.title = 'United States Senator';
      } else if (pol.title === 'Rep') {
        pol.title = 'United States Representative'
      }


      $('.politician-container').append(`
        <div class="politician ${partyColor} z-depth-3">
          <div class="row">
            <div class="col s2">
              <div class="politician-img inline-b">
                <a href="pol.html?${pol.name}">
                  <img src="${pol.picture_url}"  alt="" />
                </a>
              </div>
            </div>
            <div class="col s4 details">
            <a href="pol.html?${pol.name}">
              <p>${pol.name} - ${pol.state_name}</p>
              <p>${pol.title}</p>
              <p>${pol.street}</p>
              <p> ${pol.state}, ${pol.city} ${pol.zipcode}</p>
              </a>
            </div>
            <div class="col s3 party">
              <p>${pol.party}</p>
            </div>
            <div class="col s3 button">
              <button class="no-follow-btn btn waves-effect waves-light" type="submit" name="action" data-id="${pol.id}">
                <i class="material-icons left">supervisor_account</i>
                FOLLOW
              </button>
            </div>
          </div>
        </div>

    `);
    }

    $('button').on('click', function(event) {
      event.preventDefault();
      var polId = $(this).data('id');
      if ($(event.target).hasClass('no-follow-btn')) {
        if (!window.COOKIES.loggedIn) {
          window.location.href = '/registration.html';

          return;
        }

        $(event.target)
          .removeClass('no-follow-btn')
          .addClass('yes-follow-btn')
          .empty();
        $(event.target)
          .text('FOLLOWING')
          .append('<i class="material-icons left">done</i>');
        var $xhr = $.ajax({
          url: `/users/pols/${polId}`,
          type: 'POST'
        });
      }
      else if ($(event.target).hasClass('yes-follow-btn')) {
        $('button')
          .removeClass('yes-follow-btn')
          .addClass('no-follow-btn')
          .empty();
        $(event.target)
          .text('FOLLOW')
          .append('<i class="material-icons left">supervisor_account</i>');
        var $xhr = $.ajax({
          url: `/users/pols/${polId}`,
          type: 'DELETE'
        });
      }
    });

    if (window.COOKIES.loggedIn) {
      $xhr = $.getJSON('/users/pols');

      $xhr.done(function(data) {
        var buttons = $('button[data-id]');
        var idsFromButtons = [];

        for (var i = 0; i < buttons.length; i++) {
          idsFromButtons.push(Number.parseInt(buttons[i].attributes[3].nodeValue));
        }

        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < idsFromButtons.length; j++) {
            if (data[i].pol_id === idsFromButtons[j]) {
              $(`button[data-id="${idsFromButtons[j]}"]`)
                .removeClass('no-follow-btn')
                .addClass('yes-follow-btn')
                .empty();
              $(`button[data-id="${idsFromButtons[j]}"]`)
                .text('FOLLOWING')
                .append('<i class="material-icons left">done</i>');
            }
          }
        }
      });
    }
  }
});

$xhr.fail(function(err) {
  // The request was unsuccessful for some reason (ie. the server couldn't even respond).
  console.log(err);
});
