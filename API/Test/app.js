const express = require("express");
var app = express();

let oldValue = [];
let value = "false";
let time = new Date();

app.get("/anomaly", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    let now = new Date();
    if (now.getTime() - time.getTime() >= 1000) {
        value = Math.random() > 0.7;
        res.send(JSON.stringify(value));
    } else res.send(value);
});

app.get("/getdatas", function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    let array = [];
    let now = new Date();
    if (now.getTime() - time.getTime() >= 1000) {
        for (let i = 1; i <= 59; i++) {
            array.push(Math.floor(Math.random() * 105) + 1);
        }
        oldValue = [...array];
        time = now;
        res.send(JSON.stringify(array));
    } else {
        res.send(JSON.stringify(oldValue));
    }
});

app.listen(3001, function() {
    console.log("Example app listening on port 3001!");
});