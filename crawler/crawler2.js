/*
先讀到檔案stockNo＝>fs.readFile -> 讀完檔案後才會有stockNumber
然後axios拿到這個股票代號後 -> 再發出請求 ->最後得到3092鴻碩的股票
*/

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");



//寫法二（比較好看）
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
        return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
          params:{
          response: "json",
          date:moment().format("YYYYMMDD"),
          stockNo:stockNum,
          },
        })      
    })       
    .then((response) =>{
            console.log(response.data.title);
    }) 
    .catch((err)=>{
            console.log(err);
    })

     



//寫法一（有點像callbacl hell）：

// new Promise((resolve, reject) => {
//     fs.readFile("stockNo.txt","utf8",(err,stockNum)=>{
//         if (err) {
//             reject(err);           
//         }else{
//             resolve(stockNum)
//         }
//      });
//     })
//     .then((stockNum)=>{ 
       //這裡的參數也可以用其他命名，因為是從resolve拿到的，所以不一定要是stockNum
//     axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
//         params:{
//             response: "json",
//             date:moment().format("YYYYMMDD"),
//             stockNo:stockNum,
//             },
//         })
//         .then ((response) =>{
//             console.log(response.data.title);
//         }) 
//         .catch((error)=>{
//             console.log(err);
//         })
//     })

