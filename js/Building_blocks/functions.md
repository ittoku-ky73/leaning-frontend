# 関数

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Building_blocks/Functions

このページでは、関数についてや、それを実行する方法、定義の方法、スコープ、引数などもみていきます。

### 関数はどこにありますか

関数はあらゆるところにあります。大体カッコ`()`がついているJavaScriptコードは関数です。

### ブラウザ組み込み関数

これらは全て関数です。

```js
let myText = 'I am a string';
let newString = myText.replace('string', 'sausage');
console.log(newString);

let myArray = ['I', 'love', 'chocolate', 'frogs'];
let madeAString = myArray.join(' ');
console.log(madeAString);

let myNumber = Math.random();
```

JavaScript言語にはたくさんの組み込み関数があるので、やりたいことを全部書く必要はありません。しかし実は、呼び出して実行するコードのいくつかは、JavaScriptでは書けないブラウザ組み込み関数です。

こういった関数の多くは背後のブラウザのコードを呼び出していて、JavaScriptのようなウェブ言語ではなく、大半がC++のような低レベルのシステム言語で書かれています。

ブラウザ関数のいくつかはJavaScript言語の核に含まれないことを心にとどめておいてください。いくつかはブラウザAPIの一部として定義されていて、もっと多くの機能を提供すべく、デフォルトの言語の上で構築されています。

ブラウザAPIの詳細については、後々見ていくことになります。[こちら（mdn）](https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/What_is_JavaScript#so_what_can_it_really_do)にはなんとなくな説明が書かれています。

### 関数とメソッド

オブジェクトのメソッドの一部を、プログラマは関数として呼び出します。組み込み関数の一覧は[こちら（mdn）](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects)で確認できます。カスタム関数とは、自分が定義した関数のことです。下記のような関数です。

```js
function draw() {
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  for (let i=0; i<100; i++) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,0,0,0.5)';
    ctx.arc(random(WIDTH), random(HEIGHT), random(50), 0, 2*Math.PI);
    ctx.fill();
  }
}

function random(number) {
  return Math.floor(Math.random()*number);
}
```

### 関数の呼び出し

関数を動かすにはこうします。

```js
function myFunction() {
  alert('hello');
}

myfunction();
```

### 匿名関数

名前がない関数のことを匿名関数と言います。

```js
function() {
  alert('hello');
}

myButton.addEventListener('click', function() {
  alert('hello');
});
```

### 関数の引数

関数には引数が必要なものがあります。括弧の中に入れなければいけない値で、入れないと関数は動作しません。引数（argument）は、パラメーター、プロパティ、アトリビュート（属性）などと呼ばれることもあります。

また関数の中には引数を省略可能なものもあります。その場合、値を入れなくてもデフォルトに規定された動作をします。

### 関数のスコープと競合

スコープは関数を扱う際にとても大切な概念です。関数を作成する時、関数内で定義されている変数や関数は、内部でそれぞれ独自のスコープを持ちます。それは別の関数の内部、外部のコードからアクセスできなくなることを意味します。

グローバルスコープは、コードの一番外側の部分のことです。そこで定義された値はすべて、コードのどこからでもアクセスできます。

なぜこのような機能があるのか、主な理由はセキュリティと組織化のためです。どこからもアクセスされないように変数を定義したい場合があると思います。もし外部スクリプトからその変数にアクセスできるようなことがあれば、問題が発生する可能性があります。

次の例では関数名が同じなのでエラーを吐きます。

```html
<script src="first.js">
  let name = 'Chris';
  function greeting() {
    alert('Hello' + name + ': welcome to our company.')
  }
</script>

<script src="second.js">
  let name = 'Zaptec';
  function greeting() {
    alert('Hello' + name + ': welcome to our company.')
  }
</script>

<script>
  greeting();
</script>
```

スコープは動物園みたいなものです。ライオン、シマウマ、トラ、ペンギンなどがそれぞれの檻の中にいて、檻の中のものにしか触れません。もし動物たちが他の檻の中に侵入することができたら問題が起きるでしょう。

良くて、知らない住人に囲まれて気まずい思いをする。悪くて、寒く水の多いペンギンの檻に入ったライオンや虎はペンギンを食べてしまうかもしれません。

動物園の管理人はグローバルスコープみたいなものです。管理人はすべての檻の鍵を持っていて、餌を補充したり、動物にうんざりしたり、などなど

#### スコープで遊んでみよう：アクティブラーニング

```js
const x = 1;

function a() {
  const y = 2;
}

function b() {
  const z = 3;
}

function output(value) {
  const para = document.createElement('p');
  document.body.appendChild(para);
  para.textContent = 'Value: ' + value;
}

output(x); // Value: 1

output(y); // Error
output(z); // Error

function a() {
  const y = 2;
  output(y);
}

function b() {
  const z = 3;
  output(z);
}

a(); // Value: 2
b(); // Value: 3

function a() {
  const y = 2;
  output(x);
}

function b() {
  const z = 3;
  output(x);
}

a(); // Value: 1
b(); // Value: 1

function a() {
  const y = 2;
  output(z);
}

function b() {
  const z = 3;
  output(y);
}

a(); // Error
b(); // Error
```

### 関数の中のの関数

下記のコードは動作しません。エラーを吐きます。`subFunction`内に`myValue`が定義されていないためです。

```js
function myFunction() {
  let myValue;

  subFunction();
}

function subFunction() {
  console.log(myValue);
}

myFunction(); // Error
```

下記のコードは動作します。`subfunction`に`myValue`を引数と与えることでエラーを回避しています。

```js
function myFunction() {
  let myValue = 'Hi';

  subFunction(myValue);
}

function subFunction(value) {
  console.log(value);
}

myFunction(); // Hi
```

### まとめ

関数はプログラミングの基本中の基本。JavaScriptの関数は少し独特な気がする。

