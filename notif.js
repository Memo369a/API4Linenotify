const request = require('request');

const accessToken = 'GqOmUoAyxaJX626osTbLCMIwBxc9UjIIDWjRCwYXBb0';
const message = 'Hello from Node.js';

request.post({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer ' + accessToken
  },
  url: 'https://notify-api.line.me/api/notify',
  body: 'message=' + message
}, function(err, httpResponse, body) {
  if (err) {
    console.error(err);
  } else {
    console.log(body);
  }
});
