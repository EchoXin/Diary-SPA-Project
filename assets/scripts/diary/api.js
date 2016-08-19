'use strict';

const app = require('../app');
const authApi = require('../auth/ui.js');


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
  for (let i = 0; i < data.diaries.length; i++) {
    if(data.diaries[i].user_id == app.user.id)
    $('.my-diary').append(`<a href='#' data-id='${data.diaries[i].id}' class='single-diary list-group-item'>${data.diaries[i].title}</a>`)
  }
  console.log(data.diaries);
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
    url: "http://localhost:3000/diaries",
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    }
    // dataType: 'json'
  }).done(function (diaries) {
    console.log(diaries);
    displayDiaries(diaries);
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
