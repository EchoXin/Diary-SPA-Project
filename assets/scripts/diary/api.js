'use strict';

const app = require('../app');
const authApi = require('../auth/ui.js');
const ui = require('./ui');
const getFormFields = require('../../../lib/get-form-fields');
let diaryArray = [];
let diaryEdit = {};
let diaryId;

const create = function (data) {
  return $.ajax({
    url: app.api + '/diaries',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + authApi.app.user.token,
    },
    data: {
      diary: {
        title: `${data.title}`,
        content: `${data.content}`,
      },
    },
  });
};

const update = function (data) {
  return $.ajax({
    url: app.api + '/diaries/' + diaryId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + authApi.app.user.token,
    },
    data: {
      diary: data,
    },
  });
};

const onUpdate = function (event) {
  let data = getFormFields(this);
  event.preventDefault();
  update(data)
    .done(ui.success)
    .fail(ui.onError);
  $('.my-diary').html(`<div class='diary-body'>
  <h1
  class="diary-title">${data.title}</h1>
  <p class="diary-content">${data.content}</p>
  </div>`);
  $('.edit-diary').empty();
};

const destroy = function () {
  return $.ajax({
    url: app.api + '/diaries/' + diaryId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + authApi.app.user.token,
    },
  });
};

// show all diary
let displayDiaries = function (data) {
  $('.my-diary').removeClass('hide');
  $('.my-diary').empty();
  for (let i = 0; i < data.length; i++) {
    let weather = data[i].weather;
    let date = data[i].created_at.substr(0, 10);
    let time = data[i].created_at.substr(11, 5);

    $('.my-diary').append(`<a href='#' data-id='${data[i].id}' class='single-diary list-group-item'>
    <img src='https://openweathermap.org/img/w/${weather}.png'>
    ${data[i].title}
    <span class="diary-date"> ${date} ${time}</span>
    </a>`);
  }
};

// show single diary
let displayDiary = function () {

  $('.single-diary').on('click', function () {
    $('.after-show-diary').removeClass('hide');
    diaryId = $(this).data('id');
    for (let i = 0; i < diaryArray.length; i++) {
      if (diaryArray[i].id === diaryId) {
        console.log(diaryArray[i].id);
        console.log(diaryArray[i].title);
        $('.my-diary').html(`<div class='diary-body'>
        <h1
        class="diary-title">${diaryArray[i].title}</h1>
        <p class="diary-content">${diaryArray[i].content}</p>
        </div>`);
        diaryEdit = diaryArray[i];
      }
    }
  });
};

// get all dairy data
let getAllDiary = function () {
  $('.after-show-diary, .before-show-diary').addClass('hide');
  $('.new-diary').empty();
  $('.edit-diary').empty();
  return $.ajax({
    url: app.api + '/users/' + authApi.app.user.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + authApi.app.user.token,
    },
  }).done(function (diaries) {
    diaryArray = diaries.user.diaries;
    displayDiaries(diaryArray);
    displayDiary(diaryArray);
  });
};

const editDiary = function () {

  $('.edit-diary').html(`<form class='form edit-diary-form'>
  <p class='title'>
      <input type='text' name='title' id='edit-title' value=${diaryEdit.title}>
  </p>
  <p class='text'>
      <textarea type='text' class='textarea' name='content' id='edit-content'>${diaryEdit.content}
      </textarea>
  </p>
  <p class='submit'>
      <input type='submit' value='Submit'/>
  </p>
  </form>`);
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
