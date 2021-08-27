const mysql = require ("mysql");
require("dotenv").config();
//用Promise蓋掉原本內建的promise，用bluebird可能比內建的更有效率
const Promise= require ("bluebird"); 
//exports = module.exports = {};

let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT, 
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, 
});


//用bluebird的函式promisifyAll，整個connection就被promise化，connection裡面所有的函式都會有promise.
connection = Promise.promisifyAll(connection); 

module.exports = connection;