// Promise 是一個表示非同步運算的「最終」完成或失敗的物件。
//   最終成功
//   最終失敗
//   new Promise
let doWork = function (job, timer, isOK) {
    // 解決 callback hell:
    return new Promise((resolve, reject) => {
        // 模擬一個非同步工作
        console.log("in promise");
        setTimeout(() => {
          let dt = new Date();
          if (isOK) {resolve(`完成工作: ${job} at ${dt.toISOString()}`);
        } else {
          // 失敗
          // cb(`失敗了 ${job}`, null);
          reject(`失敗了 ${job}`);
        }
      }, timer);
    });
  };

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

let job1 = doWork("刷牙", 3000, false);
console.log(job1);
job1.then(
  function (resolve) {
    console.log("第 1 個函式被呼叫了", resolve);
  },
  function (reject) {
    console.log("第 2 個函式被呼叫了", reject);
  }
);
