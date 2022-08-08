# 変数

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/Variables

このページでは、JavaScriptの基本的な構成要素である「変数」について見ていきます。

### 必要なツール

JavaScriptのサンプルコードを打ち込むのに最適なツールは、ブラウザの開発者ツールのJavaScriptコンソールがいいでしょう。

## 変数とは

変数は値の入れ物です。数を合計したり、文章の一部を格納する時に使用します。変数が特別なのは、変数が持っている値を変更できる点です。

```js
const btn = document.querySelector('button');

button.onclick = function() {
  let name = prompt('what your name ?');
  alert(`Hello, ${name} !`);
}
```

変数はとても合理的です。また、変数には文字列や数字だけでなく、なんでも格納できるということです。複雑なデータや、関数全体も保持することができます。

変数に値を「格納する」と言っていますが、これは重要な区別です。変数は値を保持するもので、値そのものではありません。つまり値の箱です。物を入れる段ボール箱のようなものだと思ってください。

### 変数を宣言する

変数を使用するには変数を作らなければいけません。正確には「宣言する」と言います。そのために、`var, let`キーワードを使用します。

```js
let myName;
let myAge;
```

JavaScriptでは、命令の行末ごとにセミコロン（;）を書かなければなりません。1行ずつ書いているうちは動くかもしれませんが、複数行を書き始めたら動かなくなるかもしれません（ほぼないけど）。行末にセミコロンを書くように体で覚えましょう。

変数を参照する場合に、値が空の場合は、*undefined*と表示されます。変数自体がない場合は、エラーメッセージが表示されます。

### 変数を初期化する

変数を初期化するには、変数名につづけて等号記号（=）を使用します。

```js
myName = 'ittoku';
myAge = 26;

// 変数の宣言と初期化を一度にすることも可能。
let myFavoriteFood = 'sushi';
```

### varとletの違い

なぜ、変数を定義するキーワードに2種類の`var, let`があるのでしょう。その理由はやや歴史的なものです。

JavaScriptが最初に作成されたときには、`var`しかありませんでした。ほとんどの場合うまく機能しますが、いくつかの問題もありました。その設計は時々、混乱したり迷惑になることもありました。

そこで、`let`の機能を持つバージョンのJavaScriptで作成しました。これは`var`とは多少異なる動作をする変数を作成するための新しいキーワードで、その過程で問題を修正しています。

この2つのキーワードの違いについては、[letのリファレンスページ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/let)に詳しく書いています。

下記では、簡単な`var, let`の違いについて書いています。

```js
myName = 'Chris';

function logName() {
  console.log(myName);
}

logName(); // -> Chris

var myName; // no Error

// ------------------------
// no Error
var myName = 'Chris';
var myName = 'Bob';
// ------------------------
// Error
let myName = 'Chris';
let myName = 'Bob';
// ------------------------
// no Error
let myName = 'Chris';
myName = 'Bob';
```

JavaScriptコードでは`var`ではなく`let` を使用することをおすすめします。

### 変数の値を変更する

変数が初期化されて値が入っていても、もう一度入れ直すことで値を変更することができます。

```js
myName = 'ittoku';
myAge = 26;
```

**変数の名前づけのルール**

変数には制限はあるものの、大体どんな名前でもつけることができます。以下はJavaScriptで変数の名前をつける上での命名規則です。

- アルファベット、数字、アンダースコアで名前をつける。
- 変数名の先頭にアンダースコアを使用しない。一部のJavaScriptのコンストラクターニットてそれは特別な意味を持つためです。
- 変数名の先頭に数字を使用しない。エラーを吐きます。
- 複数の単語をつなげる場合は、小文字始まりのキャメルケースと呼ばれる書き方に従いましょう。最初の単語を全て小文字で書いて、その後に続く単語の最初の文字を大文字にする記法です。
- 変数名は大文字小文字を区別します。`myAge, myage`は違う変数です。
- JavaScriptの予約語（JavaScriptの文法を構成する単語のこと）を変数名につけないこと。`var, let, function, for`などです。エラーを吐きます。

```js
// good
age
myAge
init
initialColor
finalOutputValue
audio1
audio2
// bad
1
a
_12
myage
MYAGE
var
Document
skjfndskjfnbdskjfb
thisisareallylongstupidvariablenameman
```

### 変数のデータ型

変数に保持する値にはいくつかの種類があります。

**数値型（Number）**

数値は30のような整数値、2.456のような実数値（浮動小数点数）があります。もし数値を変数に設定する場合、クォーテーションマーク（''や""）は付けてはいけません。

**文字列型（String）**

文字列は文字が連なったもののことです。変数に文字列値を設定する場合は、シングルクォーテーション（''）、ダブルクォーテーション（""）で文字を囲みましょう。

**真偽値（Bool）**

真偽値は`true, false`の二つの値だけを持ちます。どちらのコードを実行するべきかと言った、条件を判定するために使用します。

**配列（Array）**

配列は鉤括弧（[]）に間をカンマ（,）で区切った複数の値を格納できるオブジェクトです。

**オブジェクト（Object）**

プログラミングにおいてオブジェクトとは、現実のものをモデルとしたコードの構造です。幅や長さについての情報を持つ駐車場を表す単純なオブジェクトもあれば、名前、身長、体重、話す言葉、あいさつなど人を表すオブジェクトも作ることができます。

```js
// Number
let myAge = 26;
// String
let hello = 'Hello World';
// Bool
let iAmAlive = true;
let test = 6 < 3; // false
// Array
let myNameArray = ['Chris', 'Bob', 'Jim'];
let myNumberArray = [10, 15, 40];
myNameArray[1] // -> 'Bob'
// Object
let cat = { name: 'nyan-taro', breed: 'unknown' };
cat.name // -> 'nyan-taro'
```

### 動的型付け

JavaScriptは動的型付け言語で、変数に対して格納するデータ型（数値、文字列、配列など）の指定が必要ない言語です。

```js
let myNumber = '500';
typeof myNumber; // 'string'
myNumber = 500;
typeof myNumber; // 'number'
```

### JavaScriptの定数

多くのプログラミング言語には定数の概念を持っています。一度宣言されると変更できない値のことです。

セキュリティ（サードパーティのスクリプトによってこのような値が変更された場合に問題が発生する可能性がある）からデバッグやコードの理解（変更してはいけない値を誤って変更して混乱する）まで、実行するさまざまな理由があります。

JavaScriptの初期の頃は、定数は存在しませんでした。もちろん今のJavaScriptにはあります。`let`のように変数に値を再定義しようとするとエラーを吐きます。

```js
const daysInWeek = 7;
const hoursInDay = 24;
daysInWeek = 8; // Error !
```
