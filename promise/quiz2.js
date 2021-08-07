async function asyncF() {
    console.log(1);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(2);
        resolve();
      }, 0);
    });
    console.log(3);
  }
  
  console.log(4);
  asyncF();
  console.log(5);

  //
  //4 => 程式開始會跳過asyncF函式，等待後續呼叫他函式才會開始跑，所以先執行 console.log(4)
  //1 => 程式往下跑，呼叫了asyncF()函式，先執行 console.log(1)
  //5 => 接著，遇到了 await Promise ，也就是要等Promise物件執行完成，所以跳出函式，執行console.log(5)
  //2 => 跳回promise，先執行setTimeout，印為要等promise
  //3 =>最後執行console.log3