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

const onUpdate = function (event) {
  console.log('update');
  let data = getFormFields(this);
  console.log(data);
  event.preventDefault();
  api.update(data)
    .done(ui.success)
    .fail(ui.onError);
    console.log(data);
};

const onDelete = function() {
  event.preventDefault();
  api.destroy()
    .done(ui.success)
    .fail(ui.onError);
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
    $('.new-diary-form').on('submit', onCreate);
    $('#my-diary').on('click', api.getAllDiary);
    $('#new-diary').on('click', function(){
      $('.after-show-diary').addClass('hide');
      $('.new-diary').removeClass('hide');
      $('.my-diary').empty();
    })
    $('.edit-diary-form').on('submit', onUpdate);
    $('#edit-diary').on('click', function(){
      console.log("show");
      $('.edit-diary').removeClass('hide');
      $('.my-diary').empty();
    });

    $('#delete-diary-submit').on('click', onDelete);

};
//
module.exports = {
    addHandlers,
};
