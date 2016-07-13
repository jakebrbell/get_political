'use strict'


const url = window.location.href;


const qmark = url.indexOf('?');
const encoding = url.substring(`${qmark + 1}`);
let query = '';

console.log(parseInt(encoding));

if (Number.isNaN(parseInt(encoding))) {
  query = 'name=' + encoding;
} else {
  query = 'zip=' + encoding;
}




var $xhr = $.getJSON(`http://localhost:8000/pols/?${query}`);

$xhr.done(function(data) {
  if ($xhr.status !== 200) {
    // The served an unsuccessful status code.
    return;
  }

  console.log(data);

  console.log(data.length);

  if (data.length === 1) {

    window.location.replace("http://localhost:8000/pol.html");


  } else {

    for (var i = 0; i < data.length; i++) {

      const pol = data[i];
      let partyColor = "";

      // if (data.party === 'D') {
      //   pol.party = 'Democrat'
      // } else if (data.party === 'R') {
      //   pol.party = 'Republican'
      // }

      if (pol.party === 'D') {
        partyColor = 'pol-blue';
      } else {
        partyColor = 'pol-red';
      }



      $('.politician-container').append(`



      <div class="politician ${partyColor} z-depth-3">
        <ul>
          <li class="img inline-b">
            <div class="politician-img inline-b">
              <a href="pol.html">
                <img src="${pol.picture_url}" alt="" />
              </a>
            </div>
          </li>
          <a href="pol.html">
          <li class="details">
              <p>${pol.name}</p>
              <p>${pol.title}</p>
              <p>${pol.street}</p>
              <p> ${pol.state}, ${pol.city} ${pol.zipcode}</p>
          </li>
        </a>
          <li>
            <button class="btn waves-effect waves-light" type="submit" name="action">FOLLOWING
              <i class="material-icons right">done</i>
            </button>
          </li>
        </ul>
      </div>

    `);


    }

  }


});

$xhr.fail(function(err) {
  // The request was unsuccessful for some reason (ie. the server couldn't even respond).
  console.log(err);
});
