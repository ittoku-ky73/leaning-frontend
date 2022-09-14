# Promise APIの使い方

> 参考：https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Implementing_a_promise-based_API

このページでは、Promiseを返すAPIの実装方法について見ていきます。

通常、PromiseベースのAPIを実装するときは、イベント、単純なコールバック、メッセージパッシングモデルを使用する可能性のある非同期操作をラップします。そしてPromiseオブジェクトがその操作の成功、失敗を適切に処理します。

### alarm() APIの実装

ここではPromiseベースのアラームAPIを実装していきます。引数には、目を覚ます人の名前と、起こす前に待機するミリ秒単位の遅延を取ります。遅延後は「Wake up!」と送信します。

**setTimeout()のラップ**

`setTimeout API`を使用して`alarm()`関数を実装します。`setTimeout()`は引数を、ms単位で指定されたコールバック関数、遅延の2つを取ります。呼び出し時には、指定された遅延に設定されたタイマーが開始し、時間が経過すると、指定された関数が呼び出されます。

```js
const output = document.querySelector('#output');
const button = document.querySelector('#set-alarm');

function setAlarm() {
  setTimeout(() => {
    output.textContent = 'Wake up!';
  }, 1000);
}

button.addEventListener('click', setAlarm);
```

**Promiseコンストラクタ**

次にPromiseコンストラクタを使った実装方法を見ていきます。上記のコードと違う点はPromiseコンストラクタです。これは単一のPromise()関数を引数として取ります。この関数を`executor`といいます。

`executor`関数自体は、`resolve, reject`の2つの引数を取ります。非同期が成功した場合は`resolve`を呼び出し、失敗の場合は`reject`を呼び出します。

```js
function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }

    setTimeout(() => {
      resolve(`Wake up, ${person}`);
    }, delay);
  });
}
```

### alarm APIの使用

ここでは、`alarm()`関数の返り値のPromiseを使って、`then, catch`をしていきます。

```js
const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }

    setTimeout(() => {
      resolve(`Wake up ${person}!`);
    }, delay);
  });
}

button.addEventListener('click', () => {
  alarm(name.value, delay.value)
    .then(message => output.textContent = message)
    .catch(error => output.textContent = `Couldn't set alarm: ${error}`);
});
```

### async, awaitでalarm() APIを実装

題名の通りにいきます。

```js
const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }

    setTimeout(() => {
      resolve(`Wake up ${person}!`);
    }, delay);
  });
}

button.addEventListener('click', async () => {
  try {
    const message = await alarm(name.value, delay.value);
    output.textContent = message;
  }
  catch(error) {
    output.textContent = `Couldn't set alarm: ${error}`;
  }
});
```

### まとめ

意外と簡単だった😀ただ、Promiseコンストラクタを返すところが難しいかな🧐
