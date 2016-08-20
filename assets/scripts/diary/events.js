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

    $('.my-diary').html(`<div class='diary-body'>
    <h1
    class="diary-title">${data.title}</h1>
    <p class="diary-content">${data.content}</p>
    </div>`)
    $('.new-diary').empty();
};


const onDelete = function() {
  event.preventDefault();
  api.destroy()
    .done(api.getAllDiary)
    .fail(ui.onError);

};




const addHandlers = () => {

    $('#my-diary').on('click', api.getAllDiary);
    $('#new-diary').on('click', function(){
      console.log(api.diaryEdit);

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
      $('.new-diary-form').on('submit', onCreate);
      $('.my-diary').empty();
      $('.edit-diary').empty();
    })
    $('#edit-diary').on('click', api.editDiary);

    $('#delete-diary-submit').on('click', onDelete);

};
//
module.exports = {
    addHandlers,
};
