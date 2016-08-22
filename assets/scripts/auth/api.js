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
};
