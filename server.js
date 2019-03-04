// server.js
// where your node app starts

// packages
const express = require('express'),
  bodyPaser = require("body-parser"),
  urlReq = require("request-promise"),
  jsdom = require("jsdom"),
  {JSDOM} = jsdom,
  app = express();

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(bodyPaser.json());
app.use(express.static('public')); //ルートフォルダ
// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.route("/api/getSource")
  .post((req, res) => {
    urlReq({
        url: `${process.env.HOSTS.split(" ")[req.body.host]}/${req.body.sCode}/${req.body.page==0 ? "" : req.body.page || ""}`,
        method: `GET`
      })
      .then(body => {
        // console.log(body);
        //var{a}は分割代入右辺.aを取り出す？
        const {document} = (new JSDOM(body)).window;
        let result = null;
        console.log(document);
        switch (req.body.host) {
          //小説ページ、目次
          case "0":
            //次戻る消す
            while (document.getElementsByClassName("novel_bn").length > 0)
              document.getElementsByClassName("novel_bn")[0].parentNode.removeChild(document.getElementsByClassName("novel_bn")[0])

            //目次のリンク挙動変更return falseでジャンプ拒否
            if (document.getElementsByClassName("index_box").length > 0) {
              let page = null;
              for (i = 0; i < document.getElementsByClassName("index_box")[0].getElementsByTagName("a").length; i++) {
                page = document.getElementsByClassName("index_box")[0].getElementsByTagName("a")[i].getAttribute("href");
                page = page.split("/")[page.split("/").length - 2];
                //document.getElementsByClassName("index_box")[0].getElementsByTagName("a")[i].setAttribute("href", "#");
                document.getElementsByClassName("index_box")[0].getElementsByTagName("a")[i].setAttribute("onclick",
                  "document.getElementById('page').value = " + Number(page) + ";setCookie();return false");
              }
            }
            document.querySelector("#novel_footer").style.display = "none";
            if (req.body.page > 0)
              result = document.getElementsByClassName("contents1")[0].outerHTML + document.querySelector("#novel_color").innerHTML + document.querySelector("#novel_footer").outerHTML;
            else
              result = document.querySelector("#novel_color").innerHTML + document.querySelector("#novel_footer").outerHTML;
            break;
            //作者ページ
          case "1":
            for (i = 0; i < document.getElementsByClassName("a_line").length; i++) {
              page = document.getElementsByClassName("a_line")[i].getElementsByTagName("a")[0].getAttribute("href").slice(1);
              document.getElementsByClassName("a_line")[i].getElementsByTagName("a")[0].setAttribute("onclick",
                "getSource(\"" + page + "\");return false;");
            }
            for (i = 0; i < document.getElementsByClassName("title").length; i++) {
              page = document.getElementsByClassName("title")[i].getElementsByTagName("a")[0].getAttribute("href");
              page = page.split("/")[page.split("/").length - 2];
              // console.log(page);
              // document.getElementsByClassName("title")[i].getElementsByTagName("a")[0].setAttribute("href","javascript:void(0)");
              document.getElementsByClassName("title")[i].getElementsByTagName("a")[0].setAttribute("onclick",
                " document.getElementById(\"host\").selectedIndex =0;document.getElementById(\"sCode\").value = \"" + page + "\";setCookie();return false");


            }
            result = document.querySelector("#contents").innerHTML;

            break;
        }



        res.send(result);
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
