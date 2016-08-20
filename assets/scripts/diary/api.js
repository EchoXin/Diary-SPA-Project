'use strict';

const app = require('../app');
const authApi = require('../auth/ui.js');
const ui = require('./ui');

let diaryArray = [];
let diaryEdit = {};
let diaryId;

const create = (data) => {
  console.log(authApi.app.user.token);
  console.log(data);
  return $.ajax({
    url: app.api + '/diaries',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + authApi.app.user.token,
    },
    data: {
      diary: data
    }
  });
};
//

const update = (data) => {
  console.log(data);
  console.log(diaryId);

  return $.ajax({
    url: app.api + '/diaries/' + diaryId ,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + authApi.app.user.token,
    },
    data: {
      diary: data
    }
  });
};




const onUpdate = function (event) {
  let data = getFormFields(this);
  console.log(data);
  event.preventDefault();
  update(data)
    .done(ui.success)
    .fail(ui.onError);
  $('.my-diary').html(`<div class='diary-body'>
  <h1
  class="diary-title">${data.title}</h1>
  <p class="diary-content">${data.content}</p>
  </div>`)
  $('.edit-diary').empty();

};

const destroy = () => {

  return $.ajax({
    url: app.api + '/diaries/' + diaryId ,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + authApi.app.user.token,
    }
  });
};


let displayDiaries = function (data) {
  $('.my-diary').removeClass('hide');
  $('.my-diary').empty();
  for (let i = 0; i < data.length; i++) {

    $('.my-diary').append(`<a href='#' data-id='${data[i].id}' class='single-diary list-group-item'>${data[i].title}</a>`)
  }
}

let displayDiary = function () {
 $('.single-diary').on('click', function(){
   diaryId = $(this).data('id');
   console.log(diaryId);
   for (let i = 0; i < diaryArray.length; i++) {

     if(diaryArray[i].id == diaryId){
       console.log(diaryArray[i].id);
       console.log(diaryArray[i].title);
       $('.my-diary').html(`<div class='diary-body'>
       <h1
       class="diary-title">${diaryArray[i].title}</h1>
       <p class="diary-content">${diaryArray[i].content}</p>
       </div>`)
       diaryEdit = diaryArray[i];
       console.log(diaryEdit.title);

     }
   }
   $('.after-show-diary').removeClass('hide');
 });
 console.log(diaryEdit);

};

let getAllDiary = function () {
  $('.after-show-diary').addClass('hide');
  $('.new-diary').empty();
  $('.edit-diary').empty();
  return $.ajax({
    url: app.api + "/users/" + authApi.app.user.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + authApi.app.user.token,
    }
    // dataType: 'json'
  }).done(function (diaries) {
    diaryArray = diaries.user.diaries;
    displayDiaries(diaryArray);
    displayDiary(diaryArray);
  });

};
//


const editDiary = function(){
  console.log(diaryEdit);

  $('.edit-diary').html(`<form class='form edit-diary-form'>
  <p class='title'>
      <input type='text' name='title' id='edit-title' value=${diaryEdit.title} />
  </p>
  <p class='text'>
      <textarea type='text' class='textarea' name='content' id='edit-content'>${diaryEdit.content}</textarea>
  </p>
  <p class='submit'>
      <input type='submit' value='Submit'/>
  </p>
  </form>`);
  console.log(diaryEdit);
  $('.my-diary').empty();
  $('.edit-diary-form').on('submit', onUpdate);

};



//
module.exports = {
  create,
  getAllDiary,
  update,
  destroy,
  editDiary,
  onUpdate,
};
