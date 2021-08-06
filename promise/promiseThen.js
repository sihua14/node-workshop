
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


let job1 = doWork("刷牙", 2000, true); 
job1
    .then((resolve) => {   
        console.log("第 1 ", resolve);
        return doWork("吃早餐", 3000, true)
    })
    .then((resolve)=>{
        console.log("第 2 ",  resolve);
        return doWork("看電視", 4000, true)
    })
    .then((resolve)=>{
        console.log("第 3 ", resolve);   
    })
    .catch((reject)=>{
        console.log("呼叫失敗",reject);
    })
    .finally(()=>{
        console.log("finally");
    })
 

