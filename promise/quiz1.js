// 請問下列程式碼印出的順序為何？
function syncF() {
    console.log(1);
  
    setTimeout(() => {
      console.log(2);
    }, 0);
    console.log(3);
  }
  
  console.log(4);
  syncF();
  console.log(5);


  //原因
  // 4 => 程式由上到下會先印出４，因為不需要呼叫syncF()需要時間，所以會跳過函式第一個console.log(4)

  // 1 => 程式由上到下，先執行了 console.log(4)之後，下一行呼叫了函式syncF(),所以會到函式裡面的第一行程式 console.log(1),印出１

  // 3 =>程式繼續往下跑，到第５行遇到setTimeout 0秒，雖然是0秒，但是一樣要花時間呼叫setTimeout ，所以接著往下先執行console.log(3)

 // 5 => cosole.log(3)是函式的最後一個程式，所以synF()函式呼叫完成，往下跑印出console.log(5)

  // 2 => 最後setTinmeout 呼叫函式返回，印出2