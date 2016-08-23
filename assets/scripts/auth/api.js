'use strict';

const app = require('../app');

const signUp = function (data) {
  return $.ajax({
    url: app.api + '/sign-up',
    method: 'POST',
    data, //data: data,
  });
};

const signIn = function (data) {
  return $.ajax({
    url: app.api + '/sign-in',
    method: 'POST',
    data, //data: data,
  });
};

const changePassword = function (data) {
  console.log('changePassword')
  return $.ajax({
    url: app.api + '/change-password/' + app.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data: data,
  });
};

const signOut = () => $.ajax({
  url: app.api + '/sign-out/' + app.user.id,
  method: 'DELETE',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
});

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword,
};
