# JavaScript非同期処理入門

> 参考：https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing

このページでは、非同期プログラミングとは何か、なぜそれが必要なのかを説明し、JavaScriptの非同期関数が歴史的にどのように実装されてきたのか見ていきます。

非同期プログラミングは、実行時間が長くなる可能性のあるタスクを走らせた時に、そのタスクが完了するまで待機するのではなく、そのタスクの実行中に他のイベントに応答できるようにする手法です。

次のブラウザが提供する機能は、特に最も興味深い機能であり、時間がかかる機能です。これらの機能はよく非同期で実装されます。

- `fetch()`、HTTPリクエストを行う。
- `getUserMedia()`、ユーザのカメラ、マイクにアクセスする。
- `showOpenFilePicker()`、ファイルを選択するようにユーザに依頼する。

### 同期プログラミング

次のコードは同期プログラムになります。

```js
const name = 'Miriam';
const greeting = `Hello, my name is ${name}!`;
console.log(greeting); // "Hello, my name is Miriam!"

function makeGreeting(name) {
  return `Hello, my name is ${name}!`;
}
const name = 'Miriam';
const greeting = makeGreeting(name);
console.log(greeting); // "Hello, my name is Miriam!"
```

上記では、上から順番に1行ずつ読み込まれ、終わったら次の行へといった流れで処理されていきます。これが同期プログラムです。

また下の例のように、別の関数を呼び出しても同期は維持されます。`makeGreeting()`は同期関数です。これは呼び出し元が処理を続行する前に、関数が作業を終了して値を返すまで待機する必要があるためです。

### 長時間実行される同期関数

もし同期機能に時間がかかる場面ではどうでしょう。次の例を見て見ましょう。このプログラムは「Finished!」と表示されるまで数秒かかります。

```js
// 乱数生成時の上限の値
const MAX_PRIME = 100000;

// 素数を判定する
function isPrime(n) {
  for (let i = 0; i <= Math.sqrt(n); i++) {
    if (n % 1) {
      return false;
    }
  }
  return n > 1;
}

// 上限maxの整数の乱数を返す。
const random = (max) => Math.floor(Math.random() * max);

// quota回数乱数を生成して、素数がquota個になったら処理を終了し、素数の配列を返す。
function generatePrimes(quota) {
  const primes = [];

  while (primes.length < quota) {
    const candidate = random(MAX_PRIME);

    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }
  return primes;
}

const quota = document.querySelector('#quota');
const output = document.querySelector('#output');
const generateBtn = document.querySelector('#generate');
const reloadBtn = document.querySelector('#reload');

generateBtn.addEventListener('click', function() {
  const primes = generatePrimes(quota.value);
  output.textContent = `Finished generating ${quota.value} primes!`;
});

reloadBtn.addEventListener('click', function() {
  document.location.reload();
});
```

### 長時間実行される同期関数の問題

上記のプログラムの問題として、`generatePrimes()`が終了するまで、クリックしたり他の操作を行うことができない点です。これは長時間実行される同期関数の基本的な問題です。

この問題を解決するにはその関数を実行している間、プログラムが引き続き他のイベントに応答できるようにすることです。ここで非同期関数の出番です。これらをJavaScriptで実装していきましょう。

### イベントハンドラ

イベントハンドラは、非同期プログラミングの形式です。すぐにではなく、イベントが発生するたびに呼び出される関数を提供します。そして、イベントが「非同期操作が完了した」の場合、そのイベントを利用して、その非同期関数の結果を呼び出し元に通知することができます。

一部の初期の非同期APIは、この方法でイベントを使用していました。`XMLHttpRequest API`を使用すると、JavaScriptでリモートサーバーにHTTP要求を行うことができます。これは時間のかかる処理かもしれないため、オブジェクトに非同期APIのイベントをアタッチすることで、リクエストの進行状況と最終的な完了の通知を受け取ることができます。

次の例を見て見ましょう。

```js
const requestBtn = document.querySelector('#xhr');
const reloadBtn = document.querySelector('#reload');
const log = document.querySelector('.event-log');

const requestURL = 'https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json';

// 読み込みが完了したら発火
xhr.addEventListener('loaded', function() {
  log.textContent = `${log.textContent} Finished with status: ${xhr.status}`;
});

// requestURLに対してリクエストを行う
requestBtn.addEventListener('click', function() {
  log.textContent = '';

  const xhr = new XMLHttpRequest();

  xhr.open('GET', requestURL);
  xhr.send();
  log.textContent = `${log.textContent} Started XHR request\n`;
});

// ブラウザをリロード
reloadBtn.addEventListener('click', function() {
  log.textContent = '';
  document.location.reload();
});
```

### コールバック（callback）

イベントハンドラは、特定のタイプのコールバックです。コールバックとは、適切なタイミングで呼び出されることを想定して、別の関数に渡される単なる関数です。上記のようにJavaScriptで非同期関数を実装する主な方法はコールバックでした。

ただしコールバック自体がそれを受け入れる関数を呼び出さなければいけない場合、コールバックベースのコードは読みにくくなる可能性があります。これは、一連の非同期関数に分割される操作を実行する必要のある場合によく起こります。

次のコードを見ていきましょう。ここでは、3つのステップに分割された1つの操作があり、各ステップは最後のステップに依存します。

```js
function doStep1(init) {
  return init + 1;
}

function doStep2(init) {
  return init + 2;
}

function doStep3(init) {
  return init + 3;
}

function doOperation() {
  let result = 0;
  result = doStep1(result);
  result = doStep2(result);
  result = doStep3(result);
  console.log(`result: ${result}`);
}

doOperation();
```

上記のコードをコールバックを使用してステップを実装すると次のようになります。これは「コールバック地獄」や「破滅のピラミッド」と呼ばれます。

```js
function doStep1(init, callback) {
  const result = init + 1;
  callback(result);
}

function doStep2(init, callback) {
  const result = init + 2;
  callback(result);
}

function doStep3(init, callback) {
  const result = init + 3;
  callback(result);
}

function doOperation() {
  doStep1(0, (result1) => {
    doStep2(result1, (result2) => {
      doStep3(result2, (result3) => {
        console.log(`result: ${result3}`);
      });
    });
  });
}

doOperation();
```

このようにコールバックをネストすると、エラーの処理が非常に難しくなります。多くの場合、最上位レベルでエラー処理を1回だけ行うのではなく、「ピラミッド」の各レベルでエラーを処理する必要があります。

これらの理由から、最新の非同期APIはコールバックを使用していません。代わりに、JavaScriptでの非同期プログラミングの基礎は`Promise, async await`となっています。

### まとめ

非同期プログラミング、わくわく🤗コールバック地獄サイコー😭
