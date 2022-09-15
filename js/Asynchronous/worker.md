# Worker入門

> 参考：https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing_workers

このページでは、Workerというタスクを別のスレッドで実行できるようにする機能を見ていきます。

これまでプログラムに長時間実行される同期タスクがあるとウィンドウ全体が応答しなくなることを見てきました。これはプログラムが*シングルスレッド*であるためです。スレッドは、プログラムが従う一連の命令です。このプログラムは1つのスレッドで構成されているため、1度に1つのことしか実行できません。

Workerを使用すると、一部のタスクをスレッドで実行できるため、タスクを開始してから、他の処理（ユーザーアクションなど）を実行できます。

しかし、これには代償があります。マルチスレッドコードでは、いつスレッドが中断され、別のスレッドが実行されるか分かりません。そのため、両方のスレッドが同じ変数にアクセスできる場合、いつでも変数が予期せず変更される可能性があり、しかも見つけにくいバグの原因にもなります。

Webではこれらの問題を回避するために、メインコードとワーカーコードが互いの変数に直接アクセスしないようにします。それぞれを完全に別の場所で実行し、相互にメッセージを送信することによってのみ対話させます。特にこれはWorkerがDOMにアクセスできないことを意味します。

Workerには3種類あります。ここでは最初のdedicated workers（専用ワーカー）を見ていきます。

- dedicated workers
- shared workers
- service workers

### Web Workerの使用

素数を計算するコードを例に見ていきます。

**同期素数ジェネレータ**、このプログラムは`generatePrimes()`を呼び出すと完全に応答しなくなります。

```js
const generate = document.querySelector('#generate');
const quota = document.querySelector('#quota');
const input = document.querySelector('#user-input');
const output = document.querySelector('#output');
const reload = document.querySelector('#reload');

function generatePrimes(quota) {
  function isPrime(n) {
    for (let c=2; c<=Math.sqrt(n); ++c) {
      if (n % c === 0) {
        return false;
      }
    }
    return true;
  }
  const primes = [];
  const maximum = 1000000;

  while (primes.length < quota) {
    const candidate = Math.floor(Math.random() * (maximum + 1));

    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }
  return primes;
}

generate.addEventListener('click', () => {
  const value = quota.value;
  const primes = generatePrimes(quota.value);
  output.textContent = `Finished generating ${quota} primes!`;
});

reload.addEventListener('click', () => {
  input.value = 'Try typing in here immediately after pressing "Generate primes"';
  document.location.reload();
});
```

#### Workerを使う：アクティブラーニング

まずは、[ここから](https://github.com/mdn/learning-area/blob/main/javascript/asynchronous/workers/start)コードをとってきましょう。

次にscript.jsを書いていきます。

```js
const generateBtn = document.querySelector('#generate');
const reloadBtn = document.querySelector('#reload');
const quota = document.querySelector('#quota');
const input = document.querySelector('#user-input');
const output = document.querySelector('#output');

// generate.jsファイルのワーカーのインスタンスを生成
const worker = new Worker('./generate.js');

/* generate button click event
 * workerにcommand, quotaの入ったメッセージを送信
 */
generateBtn.addEventListener('click', () => {
  const value = quota.value;

  worker.postMessage({
    command: 'generate',
    quota: value,
  });
});

/* reload button click event
 * ページをリロードする
 */
reloadBtn.addEventListener('click', () => {
  input.value = 'Try typing in here immediately after pressing "Generate primes"';
  document.location.reload();
});

/* worker message event
 * workerから送られてきたメッセージを出力する
 */
worker.addEventListener('message', (message) => {
  const primes = message.data;

  output.textContent = `Finished generating ${primes.length} primes!`;
  input.textContent = `Primes: ${message.data.join(', ')}`;
});
```

次に、generate.jsを書いていきます。`message.data`には呼び出し元の引数で渡された値が入っています。

```js
/* worker recieve message event
 * このファイルのワーカーインスタンスからメッセージが送られてきた時に実行する
 */
addEventListener('message', (message) => {
  if (message.data.command === 'generate') {
    generatePrimes(message.data.quota);
  }
});

// quota回、乱数を生成して素数かどうかを判定。素数の配列を返す。
function generatePrimes(quota) {
  const primes = [];
  const maximum = 1000000;

  // 素数かどうか返す
  function isPrime(n) {
    for (let c = 2; c <= Math.sqrt(n); ++c) {
      if (n % c === 0) {
        return false;
      }
    }
    return true;
  }

  while (primes.length < quota) {
    const candidate = Math.floor(Math.random() * (maximum + 1));

    if (isPrime(candidate)) {
      primes.push(candidate);
    }
  }
  postMessage(primes);
}
```

ややこしいですね。generateBtnが押された時に走るプログラムの順番は次のとおりです。

1. script.js: generateBtn click event
2. generate.js: message event
3. generate.js: generatePrimes(quota), isPrime(n)
4. script.js: worker message event

> ワーカーを実行するにはローカルWebサーバーで実行する必要があります。ファイルからではワーカーは読み込めません。

### 他のタイプのWorker

上記では、専用ワーカーと呼ばれるもので実装しました。これは単一のスクリプトインスタンスによって使用されます。

他のタイプはどうでしょう。

- [Shared Worker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)、異なるウィンドウで実行される複数の異なるスクリプトで共有できます。
- [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)、プロキシサーバーのように機能し、ユーザがオフラインの時にWebアプリケーションが動作できるようにリソースをキャッシュします。[プログレッシブ Web アプリ](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)の重要なコンポーネントです。

### まとめ

Promiseとはまた違った感じがあって面白い😀けど使い所が難しい🧐処理の重いところをWorkerに任せるって感じかな。
