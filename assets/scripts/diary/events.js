'use strict';

const getFormFields = require('../../../lib/get-form-fields');

const api = require('./api');
const ui = require('./ui');
let diaryData;
//

const onCreate = function (event) {
  let diarydata = getFormFields(this);
  console.log(diarydata);
  event.preventDefault();

  api.create(diarydata)
    .done(ui.success)
    .fail(ui.onError);

    console.log(diarydata);

    $('.my-diary').html(`<div class='diary-body'>
    <h1
    class="diary-title">${diarydata.title}</h1>
    <p class="diary-content">${diarydata.content}</p>
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
      $('.after-show-diary, .before-show-diary').addClass('hide');
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
    $('#home-logo').on('click',function(){
      $('.before-show-diary').removeClass('hide');
      $('.after-show-diary').addClass('hide');
      $('.my-diary').empty();
      $('.edit-diary').empty();
      $('.new-diary').empty();
    });

};
//
module.exports = {
    addHandlers,
};
