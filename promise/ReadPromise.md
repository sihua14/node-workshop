## Promise
今天的課在講述解決**callback hell**:
**--> 把 callback -> 改用 Promise。**
究竟promise是什麼厲害的東西？讓我來做個筆記

---




#### 什麼是Promise?
+ ==Promise 是一個表示非同步運算的最終完成或失敗的物件==
  - 非同步
  - 物件 --> new Promise()
  - 最終完成
  - 最終失敗

+ 這個promise物件本身會有**三個狀態**：
   - **擱置 pending** :初始狀態，不是fulfilled 與rejected。
   - **實現 fulfilled**：表示操作成功。
   - **拒絕 rejected**：表示操作失敗了。
 
 + 使用：
```javascript=
let p = new Promise(...);
//then
p.then(function(){
//負責接收 resolve（成功）
},function(){
//負責接收 reject （失敗）
});
``` 
---


## then & catch


+ #### Promise.then
  - 然後做什麼事（兩個參數：第一個負責成功、第二個負責失敗）
會回傳一個 Promise

```javascript=
let p2 = job1.then(()=>{處理成功})
//p2 也是一個 promise物件
p2.catch((error=>{});
````


+ #### Promise.catch
  - 負責捕捉失敗(可以把前面的錯誤全部捕捉)
    也會回傳 promise

+ #### Promise.finally





---
## Async / Await
+ 基於 promise 的語法糖

+ await 到後面那個 promise物件的狀態變成fulfill為止

+ 語法糖 -> 有一些繁瑣的寫法，或是每次都要這做
  –> 做成該程式語言內建的用法

+ ==await 一定要在 async 的函式裡面用==



---
###  物件
建構式（函式）: new Date()

建構式 -> 一個特殊的函式，通常名稱會跟class的名字一樣，可以傳入一些參數，做一些初始化。

JS的物件導向 跟其它程式語言的物件導向 不是同一個物件導向

==JS的物件導向是原型式 prototype(面試必考)==


物件導向：定義一個class >透過 new 做出他的instance
吐司模子＋配方-->class （做出來都一樣
被做出來的吐司-->instance （每個吐司都是獨立的

+ promise是一個吐司模子，當你new出他的時候，每次拿到的東西都是新的
+ 建構式一定要傳入一個函式，而且這個函式本身會有兩個參數resolve, reject

``` javascript= 
new Promise(function(resolve,reject){
    //resolve:解決用（本身是函式） -> 最終完成
    //reject:拒絕用 （本身是函式）->最終失敗
})

```

其他參考資源：
+ https://ithelp.ithome.com.tw/articles/10242649



作業：
- [x] 1. 用 promise.then 完成「刷牙->吃早餐->寫作的」的接續工作
  要可以用 catch 來統一處理錯誤
- [x] 2. 把作業1 用 async/await 改寫一次