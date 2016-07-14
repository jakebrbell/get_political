'use strict';

const url = window.location.href;

const qmark = url.indexOf('?');
const encoding = url.substring(`${qmark + 1}`);
let query1 = '';

console.log(parseInt(encoding));

if (Number.isNaN(parseInt(encoding))) {
  query1 = 'name=' + encoding;
} else {
  query1 = 'zip=' + encoding;
}

var $xhr = $.getJSON(`http://localhost:8000/pols/?${query1}`);

$xhr.done(function(data) {
  if ($xhr.status !== 200) {
    // The served an unsuccessful status code.
    return;
  }

  const pol = data[0];


  if (pol.title === 'Sen') {
    pol.title = 'United States Senator'
  } else {
    pol.title = 'United States Representative'
  }

  if (pol.name === 'Barack Obama') {
    pol.title = 'President of the United States';
  } else if (pol.name === 'Joseph R. Biden') {
    pol.title = 'Vice-President of the United States'
  }

  console.log(pol);
  console.log(data);
  if (data.length === 1) {


    $('.politician').remove();
    $('.politician-container').append(`

      <div class="politician pol-blue">

        <div class="row pol-top">

            <div class="politician-img col s4">
              <img src="${pol.picture_url}" height="275px"  width="225px" alt="" />
              <ul>
                <li>
                  <img src="images/facebook-icon.png" height="50px"  width="50px" alt="" />
                </li>
                <li>
                  <img src="images/Twitter-icon.png" height="50px"  width="50px" alt="" />
                </li>
                <li>
                  <img src="images/facebook-icon.png" height="50px"  width="50px" alt="" />
                </li>
              </ul>

            </div>

          <div class="details col s5">
            <h1>${pol.name}</h1>
            <h2>${pol.title}</h2>
            <p>${pol.street}</p>
            <p> ${pol.state}, ${pol.city} ${pol.zipcode}</p>
            <p class="pushdown"> Phone: (206) 545-7676</p>
          </div>

          <div class="col s3">
            <button class="btn waves-effect waves-light" type="submit" name="action">FOLLOWING
              <i class="material-icons right">done</i>
            </button>
          </div>

        </div>




        <div class="row">

          <div class="pol-main col s4">
            <a class="twitter-timeline" data-width="275" data-height="1000" data-dnt="true" data-theme="light" href="https://twitter.com/BarackObama"></a>
          </div>


          <div class="class col s8">
            <h1 class="center-align">bio</h1>
            <p class="bio">

            ${pol.bio}

            </p>
          </div>

        </div>



      </div>

      `);
//this is the ind of the append


  } else {

    // window.location.replace("http://localhost:8000/pol.html");
    alert('don\'t even thing about it')
    }
});

$xhr.fail(function(err) {
  // The request was unsuccessful for some reason (ie. the server couldn't even respond).
  console.log(err);
});
