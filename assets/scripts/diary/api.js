'use strict';

const app = require('../app');
const authApi = require('../auth/ui.js');
let diaryArray = [];
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
       $('#edit-title').attr("value",diaryArray[i].title);
       console.log($('#edit-title').attr("value"));
       $('#edit-content').empty();
       $('#edit-content').html(diaryArray[i].content);
       console.log($('#edit-content').html());
     }
   }
   $('.edit').removeClass('hide');
   $('.delete').removeClass('hide');
 });

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

//
module.exports = {
  create,
  getAllDiary,
  update,
  destroy
};
