const fs = require ("fs/promises");
const connection = require("./utils/db");
require ("dotenv").config();
const axios = require ("axios");
const moment = require ("moment");
const { processStockDay } = require ("./utils/TWSEDataProcessor.js");

(async () => { 
    try{
        //1.讀stock.txt把股票代碼讀進來
        let stockNum =  await fs.readFile ("stockNo.txt","utf8")
        // console.log(stockNo);

        //2.去資料庫看股票代碼在不在服務範圍
        await connection.connectAsync();
        let dbResults = await connection.queryAsync(
            "SELECT * FROM stock WHERE stock_id = ?",
            [stockNum],
        );
        console.log(dbResults);

        if(dbResults === 0){
            throw "不在我們的服務範圍內";
        }

        //3.如果有，才去證交所抓資料
        let response = await axios.get(
            "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
            {
                params:{
                response: "json",
                date:moment().format("YYYYMMDD"),
                stockNo:stockNum,
                },
            }
          );  
        //把證交所抓來的資料做處理的過程，另外抽出去包成一個函式在引入
        const twseData = response.data;
        if (twseData.stat !=="OK"){
            throw "從證交所查到的資料有問題！"
        }
        let parsedData = processStockDay(stockNum,twseData.data)
        
        // 4.抓回來的資料存到資料表stock_price裡
        let results = await connection.queryAsync(
            "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price,   high_price, low_price, close_price, delta_price, transactions ) VALUES ? ", 
        [parsedData],
       );
       console.log(results);
    }catch(e){
        console.error(e)
    }finally{
        connection.end();
    }
  
})();

