/* 
特別注意：stockNo.txt 填入股票代號時，不能換到第二行，否則會get到的會是股票代號跟一行空行，這樣就會get不到資料，node 之後會出現undefined。
或者是用 https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String/Trim 的方法，使用 ".trim()" 把空行過濾掉。
*/

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

