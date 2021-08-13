//await版本
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");//第三方，需要npm i mysql
require("dotenv").config();

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


async function goodJob() {
  let stock = await new Promise((resolve, reject) => {
    fs.readFile("stockNo.txt","utf8",(err,stockNum)=>{
      if(err){
          reject(err);           
      }else{
          resolve(stockNum.trim()); //trim()過濾掉資料的空白字元->過安全
      }
    });
  });
 
  
    let result = await new Promise((resolve,reject) =>{
      connection.query(
          "SELECT * FROM stock WHERE stock_id = ?",
          [stock],
          (error,results)=>{
            if(error){
              reject (error)
            }else{
              resolve (results);
            }           
        });
    });
    console.log(result);

    
  if (result.length > 0){
    console.log("有資料");
    let response = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
              params:{
              response: "json",
              date:moment().format("YYYYMMDD"),
              stockNo:stock,
              },
          }
        );      
      console.log(response.data.title);

  }       
}


try{
  goodJob()
} catch(e){
  console.error(e);
}
 

  

  