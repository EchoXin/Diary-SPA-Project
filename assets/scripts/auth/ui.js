'use strict';

const app = require('../app');

const signInSuccess = (data) => {
  app.user = data.user;
  console.log(app);
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
};



module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
};
