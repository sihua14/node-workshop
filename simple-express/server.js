const express = require("express");
const mysql = require("mysql");
require("dotenv").config();
const Promise = require("bluebird");
const db = require ("./utils/db.js");
const connection = require("./utils/db.js");

// 利用 express 建立了一個 express application
let app = express();

app.use((req, res, next) => {
    console.log("我是第一名");
    next();
});

app.use((req, res, next) => {
    let today = new Date()
    console.log(today);
    next();
});

// HTTP Method: get, post, put, patch, delete
app.get("/", function (req, res, next) {
  res.send("Hello");
});

app.get("/about", function (req, res, next) {
    res.send("about this");
  });


app.get("/stcok", async (req, res, next) => {
    let result = await connection.queryAsync ("SELECT * FROM stock")
    res.json(result);
});

app.listen(3000, function () {
    //因為改用pool，所以不需要手動連線
    //await connection.connectAsync();
  console.log("我們的 web server 啟動了!");
});