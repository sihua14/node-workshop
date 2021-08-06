let doWork = function (job, timer, isOK) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          let dt = new Date();
          if (isOK) {
            resolve(`完成工作: ${job} at ${dt.toISOString()}`);
        } else {
            reject(`失敗了 ${job}`);
        }
      }, timer);
    });
  };


let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

async function doWorks() {
    let result1 = await doWork("刷牙", 2000, true)
    console.log(result1);

    let result2 = await doWork("吃早餐", 3000, true)
    console.log(result2);

    let result3 = await doWork("看電視", 4000, true)
    console.log(result3);
}
doWorks();


//立即函式，立即執行
// (async function () {
//     let result1 = await doWork("刷牙", 2000, true)
//     console.log(result1);

//     let result2 = await doWork("吃早餐", 3000, true)
//     console.log(result2);

//     let result3 = await doWork("看電視", 4000, true)
//     console.log(result3);
// })();

