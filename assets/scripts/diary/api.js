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
// const index = () => {
//   return $.ajax({
//     url: app.api + '/diaries',
//     method: 'GET',
//     headers: {
//       Authorization: 'Token token=' + app.user.token,
//     },
//   });
// };
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
};
