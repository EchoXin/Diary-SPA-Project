'use strict';

const app = require('../app');

const signInSuccess = (data) => {
  app.user = data.user;
  console.log(app.user.email);
  $('#welcome').html(app.user.email);
  $('.after-sign-in').removeClass('hide');
  $('.before-sign-in').addClass('hide');

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
  $('#welcome').html("Echo Diary");
  $('.after-sign-in').addClass('hide');
  $('.before-sign-in').removeClass('hide');
  $('.my-diary').empty();

};



module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  app,
};
