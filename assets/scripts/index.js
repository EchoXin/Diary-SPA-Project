'use strict';

const authEvents = require('./auth/events.js');
const diaryEvents = require('./diary/events.js');

// On document ready
$(() => {
  authEvents.addHandlers();
  diaryEvents.addHandlers();
});
