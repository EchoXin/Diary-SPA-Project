'use strict';

const app = require('../app');
const authApi = require('../auth/ui.js');
let diaryArray = [];

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

let displayDiaries = function (data) {
  $('.my-diary').removeClass('hide');
  $('.new-diary').addClass('hide');
  $('.my-diary').empty();
  console.log(data);
  for (let i = 0; i < data.length; i++) {

    $('.my-diary').append(`<a href='#' data-id='${data[i].id}' class='single-diary list-group-item'>${data[i].title}</a>`)
  }
  console.log($('.my-diary > a').data('id'));
}

let displayDiary = function () {
 console.log(diaryArray);
 $('.single-diary').on('click', function(){
   let diaryId = $(this).data('id');
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
     }
   }
   $('.edit').removeClass('hide');
   $('.delete').removeClass('hide');
 });

};

let getAllDiary = function () {
  return $.ajax({
    url: app.api + "/users/" + authApi.app.user.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + authApi.app.user.token,
    }
    // dataType: 'json'
  }).done(function (diaries) {
    console.log(diaries.user.diaries);
    diaryArray = diaries.user.diaries;
    displayDiaries(diaryArray);
    displayDiary(diaryArray);
  });
};
//
  const updateDiary = () => {
    return $.ajax({
      url: app.api + '/diaries/' + app.diary.id,
      method: 'GET',
      headers: {
        Authorization: 'Token token=' + app.user.token,
      },
    });
  };
//
module.exports = {
  create,
  getAllDiary,
};
