'use strict';

const authEvents = require('./auth/events.js');
const diaryEvents = require('./diary/events.js');
// let allDiary = require('./templates/all-diary.handlebars');

// On document ready
$(() => {
  authEvents.addHandlers();
  diaryEvents.addHandlers();
});
