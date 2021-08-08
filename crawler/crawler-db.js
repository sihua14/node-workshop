const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
require("dotenv").config();

const mysql = require("mysql");
const { request } = require("http");

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      console.error("資料庫連不上",err);
    }
  });

  // 不關閉連線，認為程式一直在執行
  connection.end();

// async function goodJob() {
    
    // try{
    //     let stock = await new Promise((resolve, reject) => {
    //         fs.readFile("stockNo.txt","utf8",(err,stockNum)=>{
    //             if(err){
    //                 reject(err);           
    //             }else{
    //                 resolve(stockNum.trim()) //trim()過濾掉資料的空白字元->過濾掉較安全
    //             }
    //         });
    //     })
//         let result = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
//             params:{
//             response: "json",
//             date:moment().format("YYYYMMDD"),
//             stockNo:stock,
//             },
//         })      
//         console.log(result.data.title);
//         }
//     catch(error){
//         console.log(error);
//         }
//     };
//  goodJob() 
