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
  console.log(data);
 $('.single-diary').on('click', function(){
   let diaryId = $(this).data('id');
   for (let i = 0; i < data.diaries.length; i++) {
     if(data.diaries[i].id = diaryId){
       $('.my-diary').html(`<div class='diary-body'><h1 class="diary-title">${data.diaries[i].title}</h1><p class="diary-content">${data.diaries[i].content}</p></div>`)
     }
   }
 });

};

let getAllDiary = function () {
  return $.ajax({
    url: "http://localhost:3000/users/" + authApi.app.user.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + authApi.app.user.token,
    }
    // dataType: 'json'
  }).done(function (diaries) {
    console.log(diaries.user.diaries);
    diaryArray = diaries.user.diaries;
    displayDiaries(diaryArray);
  });
};
//
//   const show = () => {
//     return $.ajax({
//       url: app.api + '/diaries/' + app.diary.id,
//       method: 'GET',
//       headers: {
//         Authorization: 'Token token=' + app.user.token,
//       },
//     });
//   };
//
module.exports = {
  create,
  getAllDiary,
};
