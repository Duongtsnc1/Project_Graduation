var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  let array=[]
  for(let i =1;i<=12;i++){
    array.push(Math.floor(Math.random() * 105) + 1)
  }
  // setTimeout((() => {
    res.send(JSON.stringify(array));
  // console.log("duong")

  // }), 1000)
  // console.log("duong")
});

app.listen(3001, function () {
  console.log('Example app listening on port 3000!');
});