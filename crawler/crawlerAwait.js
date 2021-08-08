//太激動了！！不知道對不對

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

async function goodJob() {
    
    try{
        let stock = await new Promise((resolve, reject) => {
            fs.readFile("stockNo.txt","utf8",(err,stockNum)=>{
                if(err){
                    reject(err);           
                }else{
                    resolve(stockNum)
                }
            });
        })
        let result = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
            params:{
            response: "json",
            date:moment().format("YYYYMMDD"),
            stockNo:stock,
            },
        })      
        console.log(result.data.title);
        }
    catch(error){
        console.log(error);
        }
    };
 goodJob() 
    
