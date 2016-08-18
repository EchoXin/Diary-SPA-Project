'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');
//

const onCreate = function (event) {
  console.log('hi');
  let data = getFormFields(this);
  console.log(data);
  event.preventDefault();
  api.create(data)
    .done(ui.success)
    .fail(ui.onError);
    console.log(data);
};


// const onSignUp = function(event) {
//     let data = getFormFields(event.target);
//     event.preventDefault();
//     console.log(data);
//     api.signUp(data)
//         .done(ui.success)
//         .fail(ui.failure);
//     $('#sign-up').modal('hide');
// };
//
// const onSignIn = function(event) {
//     let data = getFormFields(this);
//     event.preventDefault();
//     console.log(data);
//     api.signIn(data)
//         .done(ui.signInSuccess)
//         .fail(ui.failure);
//     $('#sign-in').modal('hide');
// };
//
//
// const OnSignOut = function(event) {
//     event.preventDefault();
//     api.signOut()
//         .done(ui.signOutSuccess)
//         .fail(ui.failure);
// };
//
const addHandlers = () => {
    // $('.sign-up-form').on('submit', onSignUp);
    // $('.sign-in-form').on('submit', onSignIn);
    $('.diary-form').on('submit', onCreate);
};
//
module.exports = {
    addHandlers,
};
