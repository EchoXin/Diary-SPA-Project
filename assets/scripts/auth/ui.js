'use strict';

const app = require('../app');

const signInSuccess = (data) => {
  app.user = data.user;
  console.log(app.user.email);
  $('#welcome-user').html(`hi, ${app.user.email}`);
  $('#welcome-sign').html('How are you doing today?');
  $('.after-sign-in').removeClass('hide');
  $('.before-sign-in').addClass('hide');
  $('.header-image').removeClass('hide');
  $('.new-diary').empty();
};

const success = (data) => {
  console.log(data);
};


const failure = (error) => {
  console.error(error);
};

const signOutSuccess = () => {
  delete app.user;
  console.log(app);
  console.log('success');
  $('#welcome').html('Echo Diary');
  $('.after-sign-in, .after-show-diary').addClass('hide');
  $('.before-sign-in').removeClass('hide');
  $('.my-diary').empty();
  $('.edit-diary').html('');
  $('#welcome-user').html('Echo Diary');
  $('#welcome-sign').html('Record your life from here');
};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  app,
};
