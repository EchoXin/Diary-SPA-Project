'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');
//

const onCreate = function (event) {
  let data = getFormFields(this);
  console.log(data);
  event.preventDefault();
  api.create(data)
    .done(ui.success)
    .fail(ui.onError);
    console.log(data);
};

const onUpdate = function (event) {
  $('.edit-diary').addClass('hide');
  let data = getFormFields(this);
  console.log(data);
  event.preventDefault();
  api.update(data)
    .done(ui.success)
    .fail(ui.onError);
  $('.my-diary').html(`<div class='diary-body'>
  <h1
  class="diary-title">${data.title}</h1>
  <p class="diary-content">${data.content}</p>
  </div>`)
  $()
    console.log(data);
};

const onDelete = function() {
  event.preventDefault();
  api.destroy()
    .done(ui.success)
    .fail(ui.onError);
};




const addHandlers = () => {

    $('.new-diary-form').on('submit', onCreate);
    $('#my-diary').on('click', api.getAllDiary);
    $('#new-diary').on('click', function(){
      $('.after-show-diary').addClass('hide');
      $('.new-diary').html(`<form class='form new-diary-form'>
      <p class='title'>
          <input type='text' name='title'  placeholder='Title'/>
      </p>
      <p class='text'>
          <textarea type='text' class='textarea' name='content'></textarea>
      </p>
      <p class='submit'>
          <input type='submit' value='Submit' />
      </p>
  </form>`);
      $('.my-diary').empty();
    })
    $('.edit-diary-form').on('submit', onUpdate);
    $('#edit-diary').on('click', function(){
      console.log("show");
      $('.edit-diary').html(`<form class='form edit-diary-form'>
      <p class='title'>
          <input type='text' name='title' id='edit-title' placeholder='Title'/>
      </p>
      <p class='text'>
          <textarea type='text' class='textarea' name='content' id='edit-content'></textarea>
      </p>
      <p class='submit'>
          <input type='submit' value='Submit' />
      </p>
      </form>`);
      $('.my-diary').empty();
    });

    $('#delete-diary-submit').on('click', onDelete);

};
//
module.exports = {
    addHandlers,
};
