'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');

const onSignUp = function (event) {
  let data = getFormFields(event.target);
  event.preventDefault();
  console.log(data);
  api.signUp(data)
      .done(ui.success)
      .fail(ui.failure);
  $('#sign-up').modal('hide');
};

const onSignIn = function (event) {
  let data = getFormFields(this);
  event.preventDefault();
  api.signIn(data)
      .done(ui.signInSuccess)
      .fail(ui.failure);
  $('#sign-in').modal('hide');
  console.log(data);
};

const OnSignOut = function (event) {
  event.preventDefault();
  api.signOut()
      .done(ui.signOutSuccess)
      .fail(ui.failure);
};

const addHandlers = () => {
  $('.sign-up-form').on('submit', onSignUp);
  $('.sign-in-form').on('submit', onSignIn);
  $('#sign-out').on('click', OnSignOut);
};

module.exports = {
  addHandlers,
};
