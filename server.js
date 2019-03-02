// server.js
// where your node app starts

// init project
const express = require('express'),
  bodyPaser = require("body-parser"),
  urlReq = require("request-promise"),
  jsdom = require("jsdom"),
  {JSDOM}=jsdom,
  app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));
app.use(bodyPaser.json());
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.route("/api/getSource")
  .post((req, res) => {
    urlReq({
        url: `https://ncode.syosetu.com/${req.body.nCode}/${req.body.page==0 ? "" : req.body.page || ""}`,
        method: `GET`
      })
      .then(body => {
        // console.log(body);
        //var{a}は分割代入右辺.aを取り出す？
        const {document} = (new JSDOM(body)).window;

        res.send(document.getElementsByTagName("body")[0].innerHTML);
      })
      .catch(err => {
        console.log(err);
        res.send(err);
      })

  })
app.route("/api/search")
  .post((req, res) => {
    // console.log(req.body);
    urlReq({
        url: "https://api.syosetu.com/novelapi/api/?ncode=n0611em",
        method: "GET"
      })
      .then(body => {
        // console.log(body);
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
