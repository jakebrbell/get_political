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

// BUILD OUT CLICK TO ADD TO USER FAVORITES
// THIS FUNCTION CHANGES THE COLORS AND TEXT AS WELL

// $('button').on('click', (event) => {
//   const $this = $(event.target);
//
//   console.log($this);
// })




var $xhr = $.getJSON(`/pols/?${query1}`);

$xhr.done(function(data) {
  if ($xhr.status !== 200) {
    // The served an unsuccessful status code.
    return;
  }

  if (data.length === 1) {

    window.location.replace("/pol.html");


  } else {

    let id = 'off';

    for (var i = 0; i < data.length; i++) {

      const pol = data[i];
      let partyColor = "";

      if (pol.party === 'D') {
        partyColor = 'pol-blue';
        pol.party = 'DEMOCRAT'
      } else {
        partyColor = 'pol-red';
        pol.party = 'REPUBLICAN'
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
              <button id="${id}" class="btn waves-effect waves-light" type="submit" name="action">
                <!-- <i class="material-icons left">library_add</i> -->
                <i class="material-icons left">done</i>

                FOLLOWING
              </button>
            </div>
          </div>
        </div>

    `);
    }
  }
});

$xhr.fail(function(err) {
  // The request was unsuccessful for some reason (ie. the server couldn't even respond).
  console.log(err);
});
