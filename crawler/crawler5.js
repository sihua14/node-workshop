//await + function版本
const axios = require("axios");
const moment = require("moment");
const fs = require('fs/promises');
const mysql = require('mysql2');
require("dotenv").config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
});


function queryStockPricePromise(stockNum){
    return axios.get(
        "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
        {
            params:{
            response: "json",
            date:moment().format("YYYYMMDD"),
            stockNo:stockNum,
            },
        }
    );      
}

function insertDataPromise(parseData){
   return new Promise ((resolve, reject)=>{
        connection.query(
        "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price,   high_price, low_price, close_price, delta_price, transactions ) VALUES ? ", 
    [parseData],
    (error, results, fields)=>{
    if (error) {
        reject(error);
    }
    resolve(results);
    } 
   );
  })
}

async function goodJob() {
    try{
        //準備連線
        await connection.connect();

        // 1.讀取股票代碼  
        let stockNum = await fs.readFile("stockNo.txt","utf8");

        // 2.去資料表查詢，這個代碼是否在服務範圍內
        let dbResult = await connection.execute(
            "SELECT * FROM stock WHERE stock_id = ?", 
            [stockNum]
        );
        console.log(dbResult);
        if(dbResult.length === 0){         
            console.warn("此股票代碼不在服務範圍內");  
            return;
        }
        console.info("資料庫有資料");

        // 3.如果是，才去證交所抓資料
        let response = await queryStockPricePromise(stockNum); 

        // 4.抓回來的資料存到資料表stock_price裡
        const twseData = response.data;
        if (twseData.stat !=="OK"){
            throw "從證交所查到的資料有問題！"
        }

        // '日期',     '成交股數',
        // '成交金額', '開盤價',
        // '最高價',   '最低價',
        // '收盤價',   '漲跌價差',
        // '成交筆數' 
        //開始處理資料
        let parseData = twseData.data.map((item)=>{
            console.log("------------------------");
            console.log(item);
        //處理千位符 
            item = item.map(value=>{
                return value.replace(/,/g,"");
            })

        //民國日期轉西元
            item[0] = parseInt(item[0].replace(/\//g,""),10)+19110000;
            item.unshift(stockNum);
            return item;
            });
            console.log(parseData);
   
        //寫入資料庫
            let insertResult = await insertDataPromise(parseData);
            console.log(insertResult);
    } catch(e) {
        console.error(e);
    } finally {
        connection.end();
    }   
}

goodJob();

