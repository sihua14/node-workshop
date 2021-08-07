/*
先讀到檔案stockNo＝>fs.readFile
讀完檔案後才會有stockNumber
然後axios拿到這個股票代號後
再發出請求
*/

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

new Promise((resolve, reject) => {
    fs.readFile("stockNo.txt","utf8",(err,stockNum)=>{
        if (err) {
            reject(err);           
        }else{
            resolve(stockNum)
        }
     });
    })
    .then((stockNum)=>{
    axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
        params:{
            response: "json",
            date:moment().format("YYYYMMDD"),
            stockNo:stockNum,
            },
        })
        .then ((response) =>{
            console.log(response.data.title);
        }) 
        .catch((error)=>{
            console.log(err);
        })
    })




     

