// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.route("/api/getSource")
  .post((req, res) => {
    // let dJson = JSON.parse(req.body);
    let dJson = req.body;
    console.log(dJson);
    const request = require("request-promise");
    request({
        url: "https://api.syosetu.com/novelapi/api/?ncode=n0611em",
        method: "GET"
      })
      .then(body => {
        console.log(body);
        res.send(body);
      })
      .catch(err => {
        console.log(err);
        res.send(err);
      })

    // res.send(req.body);
  });

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
