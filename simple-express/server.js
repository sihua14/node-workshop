const express = require ("express");
const connection = require ("./utils/db");

//利用express建立了一個express application
let app = express();


//使用一個自己做的「中間件」
//app.use(handler): 會傳入一個handler函式
app.use((req, res, next)=>{
    let current = new Date();
    console.log(`有人訪問 at ${current.toISOString()}`);
    next();
})

app.use((req, res, next) =>{
    console.log("我是第二個中間件");
    next();
});




//HTTP Method: get, post, put, delete...
//第一個參數是網址的長相，後面是處理式（handler)
//對express來說這也算是一個「中間件」，這是特殊中間件router路由（會比對，順序不一定是由上網下)
app.get ("/", (req, res, next) => {
    res.send("hello");
});

app.get ("/about", (req, res, next) => {
    res.send("about");
});  

//stock get API
app.get ("/stock", async (req, res, next) => {
    let result = await connection.queryAsync("SELECT * FROM stock");
    res.json(result); 
});

//stock/2330 = stockCode=2330
app.get ("/sotck/:stockCode", async (req, res, next)=>{
    let result = await connection.queryAsync ("SELECT * FROM stock_price WHERE stock_id =?",
    [req.params.stockCode]
    );
    res.json(result);
});

app.use((req, res, next)=>{
  res.status(404).json({message: "NOT FOUND"});
});   

//啟動app
app.listen(3000, async function () {
    //因為改成pool，所以不用手動連線了
    // await connection.connectAsync();
    console.log("我的server跑起來了~");
});