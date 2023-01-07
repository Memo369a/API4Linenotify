const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const requestify = require("requestify");
const request = require('request');
const app = express();

const accessToken = 'GqOmUoAyxaJX626osTbLCMIwBxc9UjIIDWjRCwYXBb0';

global.__basedir = __dirname;
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my REST." });
});

app.post('/msg', (req, res) => {
  const message = req.body.message;

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
      res.status(500).send('Error sending message');
    } else {
      console.log(body);
      res.send('Message sent');
    }
  });
});

// requestify.request("https://notify-api.line.me/api/notify", {
//     method: 'POST',
//     body: {
//         message: "Test message"
//     },
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         "Authorization": "Bearer GqOmUoAyxaJX626osTbLCMIwBxc9UjIIDWjRCwYXBb0"
//     },
//     dataType: "json",
//     message: "Test message"
//     })
//     .then(function(response) {
//         response.getBody();
//     });

// app.post("", (req, res)=>{
//     const notifObj = new Notification({
//         message: req.body.message,
//         imageThumbnail: req.body.imageThumbnail,
//         imageFullsize: req.body.imageFullsize,
//         imageFile: req.body.imageFile,
//         stickerPackageId: req.body.stickerPackageId,
//         stickerId: req.body.stickerId,
//         notificationDisabled: req.body.notificationDisabled
//       });
//     res.send(data);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
