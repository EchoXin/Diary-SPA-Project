'use strict';

const app = require('../app');

const create = (data) => {
  return $.ajax({
    url: app.api + '/diaries',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + app.user.token,
    },
    data,
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
// module.exports = {
//   signUp,
//   signIn,
//   signOut,
// };
