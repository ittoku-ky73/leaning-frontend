# 最初のダイブ

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/A_first_splash

このページでは、数字を当てるゲームを実際に作ってJavaScriptの基本的な機能について見ていきます。

### プログラマーのように考える

プログラミングで一番難しいのは、書き方を覚えることではなく、現実の問題にどう適用するかということです。それはプログラムが何をしなければいけないのかという説明を見て、それを満たすためにコードのどのような機能を用いるかを考え、組み立てなければいけません。

これには努力、プログラミング文法の経験、想像力が必要です。たくさんコードを書けば慣れていきます。

## 数字当てゲーム

**ゲームの概要**

> 数字を予想して当てるゲーム。ランダムに1~100の数字を決めて、プレイヤに10回以内に当ててもらうゲーム。
>
> もしプレイヤーが数字を間違えば、予想した数字と正解の数字と比較して、大きいか小さいかを見ることができる。
>
> ゲームは予想が的中した場合、回数の上限に達した場合、終了する。ゲームが終了したらもう一度プレイできる。

**タスク**

1. 1~100までの数字をランダムに1つ生成する。
2. プレイヤーに答えだと思う数字を入れる手段を用意する。
3. 予想が入力されたら、プレイヤーの以前の予想が見られるように、記録する。
4. 入力された数字が正しいかどうか調べる
5. 正しい場合
   1. 正解したお祝いのメッセージを表示する。
   2. プレイヤーが次の予想を入力できないようにする。
   3. プレイヤーが次のゲームを始められるようなコントロールを表示する。
6. 正しくない場合
   1. プレイヤーが間違ったことを表示する。
   2. 次の予想を入力できるようにする。
   3. 予想回数に1を加算する。
   4. プレイヤーに入力した数字が正解の数字と比較して、高いか低いか表示する。
   5. 予想回数の上限に達した場合
      1. ゲームオーバー。
      2. プレイヤーに次の予想を入力できないようにする。
      3. プレイヤーが次のゲームを始められるようなコントロールを表示する。
7. ゲームがもう一度始まったら、画面とロジックをリセットし、1に戻る。

### 初めに

コードを入力するには`script`タグの中に書くか、`src`属性にJavaScriptファイルのパスを書くかです。

```html
<script></script>
```

### データを保持する変数を追加する

変数を定義するときは、`let, const`キーワードを使用します。書き方は、キーワード、変数名、=（イコール）、値、;（セミコロン）の順で書きます。

```js
var hoge = 0;
let randomNumber = 0;
const numberGuessingGame = const MIN_GUESS_NUMBER = 10;
document.querySelector('.number-guessing-game');
```

### 関数

関数は再利用可能なコードの塊です。何度も実行することができるため、同じコードを書く手間を省けます。書き方は、function、関数名、{（ブラケット）、コード、}（ブラケット）、で書きます。実行は、関数名、()（かっこ）、です

```js
function hogeBar() {
  console.log('hogebar');
}

hogeBar();
```

### 演算子

値の確認をしたり、計算、文字の結合など、いろいろなことができます。

```js
1 + 1 // -> 2
2 - 1 // -> 1
2 * 2 // -> 4
9 / 3 // -> 3

let hoge = 'hoge';
let bar = 'bar';
let hogebar = hoge + bar;
hogebar // -> "hogebar"
hogebar += 'baz' // -> "hogebarbaz"

5 === 2 + 4 // -> false
'hoge' === 'baz' // -> false
5 === 5 // -> true
2 === '2' // -> false

5 !== 2 + 4 // -> true
'hoge' !== 'baz' // -> true
5 !== 5 // -> false
2 !== '2' // -> true

5 < 10 // -> true
5 > 10 // -> false
```

### 条件式

```js
let name = 'hoge';

if (name === 'hoge') {
  console.log('my name is hoge');
}
else if (name === 'bar') {
  console.log('my name is bar');
}
else {
  console.log('my name is not hoge');
}
```

### イベント

```js
const body = document.querySelector('bady');

body.addEventListener('click', webPageClicked);

function webPageClicked() {
  alert('yeah !! this page clicked !');
}
```

### ゲームを完成させる

飛ばす。

### ループ（繰り返し）

```js
for (var i=0; i<100; i++) {
  console.log(`loop count: ${i}`);
}

const lists = document.querySelectorAll('ul li');
lists.forEach(function(list, index) {
  list.textContent = `list${index}`;
});
```

### オブジェクトについて（簡単に）

飛ばす。

### ブラウザのオブジェクトで遊ぼう

上記で学んだことは、ブラウザの開発者ツールで実際に試すことができます。

### ソースコード（github）

- [数当てゲーム（mdn）](https://github.com/mdn/learning-area/blob/master/javascript/introduction-to-js-1/first-splash/number-guessing-game.html)
- [数当てゲーム（自作）](https://github.com/ittoku-ky73/leaning-frontend/blob/main/js/First_steps/Number_guessing_game/)
