(() => {
  'use strict';

  if (window.COOKIES.loggedIn) {
    window.location.href = '/';

    return;
  }

  $('select').material_select();

  $('.register').click((_event) => {
    const firstName = $('#first_name').val().trim();
    const lastName = $('#last_name').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val();
    const city = $('#city').val().trim();
    const state = $('#state').val();
    const party = $('#party').val().trim();
    const bio = $('#bio').val().trim();

    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);
    console.log(city);
    console.log(state);
    console.log(party);
    console.log(bio);

    // Validation
    if (!email) {
      return Materialize.toast('Please enter an email.', 2000);
    }

    if (email.indexOf('@') < 0) {
      return Materialize.toast('Please enter a valid email.', 2000);
    }

    if (!password) {
      return Materialize.toast('Please enter a password.', 2000);
    }

    if (password.length < 8) {
      return Materialize.toast('Your password must be at least 8 characters.', 2000);
    }

    const $xhr = $.ajax({
      url: '/users',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(
        { firstName, lastName, email, password, city, state, party, bio }
      )
    });

    $xhr.done(() => {
      window.location.href = '/login.html';
    });

    $xhr.fail((err) => {
      console.error(err);
      Materialize.toast('User could not be registered. Please try again.');
    });
  });
})();
