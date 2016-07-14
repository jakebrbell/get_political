'use strict';

var url = window.location.href;

var qmark = url.indexOf('?');
var encoding = url.substring(`${qmark + 1}`);
var query1 = '';

if (Number.isNaN(parseInt(encoding))) {
  query1 = 'name=' + encoding;
} else {
  query1 = 'zip=' + encoding;
}

var $xhr = $.getJSON(`http://localhost:8000/pols/?${query1}`);

$xhr.done(function(data) {
  console.log(data);
  var pol = data[0];


  if (pol.title === 'Sen') {
    pol.title = 'United States Senator';
  } else {
    pol.title = 'United States Representative';
  }

  if (pol.name === 'Barack Obama') {
    pol.title = 'President of the United States';
  } else if (pol.name === 'Joseph R. Biden') {
    pol.title = 'Vice-President of the United States';
  }

  if (data.length === 1) {

    $('.politician').remove();
    $('.politician-container').append(`
      <div class="politician pol-blue">
        <div class="row pol-top">
          <div class="politician-img col s4">
            <img src="${pol.picture_url}" height="275px"  width="225px" alt="${pol.name}" />
            <ul>
              <li>
                <a href=${pol.facebook} target="_blank"><i class="fa fa-facebook-square fa-3x"></i></a>
              </li>
              <li>
                <a href=${pol.twitter} target="_blank"><i class="fa fa-twitter-square fa-3x"></i></a>
              </li>
              <li>
                <a href=${pol.youtube} target="_blank"><i class="fa fa-youtube-square fa-3x"></i></a>
              </li>
            </ul>
          </div>

          <div class="details col s5">
            <h1>${pol.name}</h1>
            <h2>${pol.title}</h2>
            <p>${pol.street}</p>
            <p> ${pol.city}, ${pol.state} ${pol.zipcode}</p>
            <p class="pushdown"> Phone: ${pol.phone}</p>
          </div>

          <div class="col s3">
            <button class="follow-btn btn waves-effect waves-light" type="submit" name="action">FOLLOWING
              <i class="material-icons right">done</i>
            </button>
          </div>
        </div>

        <div class="row">
          <div class="pol-main col s4">
            <a class="twitter-timeline" data-width="300" data-height="450" data-dnt="true" data-theme="light" href="https://twitter.com/${pol.twitter}"></a>
          </div>

          <div class="class col s8">
            <h1 class="center-align">bio</h1>
            <p class="bio">${pol.bio}</p>
          </div>
        </div>
      </div>`);
      //this is the end of the append

    $('.follow-btn').on('click', function(event) {
      if (!window.COOKIES.loggedIn) {
        window.location.href = '/registration.html';

        return;
      }

      var polId = pol.id;

      var $xhr = $.ajax({
        url: '/users/pols',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ polId })
      });
    });

  } else {
    Materialize.toast('That Search Will Not Work', 4000);
  }
});

$xhr.fail(function(err) {
  Materialize.toast('That Search Will Not Work', 4000);
});
