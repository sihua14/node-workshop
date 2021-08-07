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


  //
  // 4 => 會先印出４，因為不需要呼叫任何韓式，所以會直接印出４
  // 1 => 程式由上到下，先執行了 console.log(4)之後，下一行呼叫了函式syncF(),所以會到函式裡面的第一行程式 console.log(1),印出１
  // 3 =>程式繼續往下跑，到第５行遇到setTimeout 0秒，雖然是0秒，但是一樣要花時間呼叫setTimeout ，所以接著往下先執行console.log(3)
 // 5 =>
  2