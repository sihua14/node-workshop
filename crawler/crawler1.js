
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");


fs.readFile("stockNo.txt","utf8",(err,stockNum)=>{
  // console.log(stockNum);
    if (err){
        console.log(err);
    }else{
    axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
            params:{
                response: "json",
                date:moment().format("YYYYMMDD"),
                stockNo:stockNum,
            },
           })
            .then ((response) =>{
                console.log(response.data.title);
            }); 
    }
});

