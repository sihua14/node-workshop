function processStockDay(stockNum, rawData) {
    //用rawData 取代原本的 twseData.data
        return rawData.map((item)=>{
            console.log("------------------------");
            console.log(item);
    //處理千位符 
        item = item.map(value=>{
            return value.replace(/,/g,"");
        })

    //民國日期轉西元
        item[0] = parseInt(item[0].replace(/\//g,""),10)+19110000;
        //把stock_id 放進來（因為我們的資料庫需要）
        item.unshift(stockNum);
        return item;
        });
}

module.exports = {
    processStockDay
}