# ループコード

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Building_blocks/Looping_code

このページでは、繰り返し処理が得意なループについて見ていきます。

### ループの中に止まる

プログラミングにおいてループはとても重要な概念です。これは反復や繰り返しとも言われます。

ループには以下のような機能があります。

- カウンター、ループの開始地点で初期化される値。
- 条件、ループを続けるか終わるかを決める判定。
- イテレーター、条件で`trueではなくなるまで、カウンターの値をループごとに増加させる仕組み。

以下は上記の機能を簡単に説明した疑似コードです。

```txt
loop (food = 0; foodNeeded = 10) {
  if (food >= foodNeeded) {
    exit loop;
    // 食糧が集まりました。
  }
  else {
    food += 2; // 1時間経って2つの食料を集めた。
    // ループを続ける
  }
}
```

### なぜそうするのか

ループがなぜJavaScriptで役に立つのかというと、素早く繰り返し同じ作業を完了させることができるからです。

以下の例は`canvas`要素の中にランダムな大きさの円を100個作っています。もし下記のコードをループコードを使わずに書くとものすごくコードが長くなり、メンテナンスも大変になります。

```js
for (let i=0; i<100; i++) {
  ctx.beginPath();
  ctx.fillStyle = 'rgba(255,0,0,0.5)';
  ctx.arc(random(WIDTH), random(HEIGHT), random(50), 0, 2*Math.PI);
  ctx.fill();
}
```

### 標準的なforループ

`for`ループ構造については以下の通りです。

- `for`キーワードを使用します。
- 括弧の中にセミコロンで区切られた以下の項目を使用します。
  - 初期化処理、繰り返し処理の最初のみ実行される処理です。主に変数を定義します。
  - 条件、ループを続けるか止めるか判定します。主に比較演算子を使用します。
  - 最後の式、繰り返し処理の終わりに実行される処理です。主に条件に関係する処理を行います。

以下のコードは典型的なforループコードです。

```js
const cats = ['bill', 'jeff', 'beet', 'biggls', 'jusmin'];
let info = 'my cat name is ';

for (let i=0; i<cats.length; i++) {
  info += cats[i] + ', ';
}

console.log(info); // my cat name is bill, jeff, beet, biggls, jusmin,
```

forループ（他のループ）では、カウンター変数を増加、減少させて、最終的に条件がtrueではなくなるポイントに達するようにする必要があります。もしそうでない場合、ループは永遠に回り続け、ブラウザが強制的に停止するか、クラッシュしてしまうでしょう。これを無限ループと言います。

### breakでループを終了する

ループを途中で終了させたい時は、`break`を使用します。

```js
for (let i=0; i<1000; i++) {
  if (i === 500) {
    console.log('break');
    break;
  }
  console.log(i);
}
```

### continueでループをスキップする

ループをスキップ、飛ばしたい時は、`continue`を使用します。

```js
let num = 100;

for (let i=1; i<=num; i++) {
  let sqRoot = Math.sqrt(i);

  if (Math.floor(sqRoot) !== sqRoot) {
    continue;
  }
  console.log(i + ' ');
}
```

### whileとdo while

`while`ループの構造は次のようになっています。非常に単純です。

- whileキーワードを使用します。
- 括弧内に条件を書きます。条件が`true`であれば続行、`false`であれば中断します。

```js
const cats = ['bill', 'jeff', 'beet', 'biggls', 'jusmin'];
let info = 'my cat name is ';
let i = 0;

while (i<cats.length) {
  info += cats[i] + ', ';
  i++;
}

console.log(info); // my cat name is bill, jeff, beet, biggls, jusmin, 
```

`do while`ループの構造は次のようになっています。非常に複雑です。

- `do`キーワードと`while`キーワードを使用します。
- `do`キーワードの波括弧内で実行するコードを記述します。
- `while`キーワードの括弧には条件を書きます。

`while`ループとの違いは、`do while`ループではwhileの条件を1度無視してコードを実行する点です。なので必ず1度はコードが実行されます。

```js
const cats = ['bill', 'jeff', 'beet', 'biggls', 'jusmin'];
let info = 'my cat name is ';
let i = 0;

do {
  info += cats[i] + ', ';
  i++;
} while(i<cats.length);

console.log(info); // my cat name is bill, jeff, beet, biggls, jusmin,
```

#### カウントダウン：アクティブラーニング

```js
let output = document.querySelector('.output');
let i = 10;

output.innerHTML = '';

while (i >= 0) {
  let para = document.createElement('p');

  para.textContent = (i == 0) ? 'Blast off!' : i;
  output.appendChild(para);
  i--;
}
```

#### ゲストリスト：アクティブラーニング

```js
/*
 *配列に格納された名前のリストを取得して、ゲストリストに入れる。
 * ゲストを分けるために2つのリストを持ち、1つは承認するゲスト、拒否するゲストに分ける。
 * Phil, Lolaは拒否して、他のゲストは受け入れます。
 */
const admitted = document.querySelector('.admitted');
const refused = document.querySelector('.refused');
const people = ['Chris', 'Anne', 'Colin', 'Terri', 'Phil', 'Lola', 'Sam', 'Kay', 'Bruce'];

admitted.textContent = 'Admit: ';
refused.textContent = 'Refuse: ';

for (let i=0; i<people.length; i++) {
  if (people[i] === 'Phil' || people[i] === 'Lola') {
    refused.textContent += people[i] + ', ';
  } else {
    admitted.textContent += people[i] + ', ';
  }
}
```

### まとめ

ループは大事。forループは必ず覚えること。他はあんまり見ない。

ループを極めたい人は、[ループと反復処理（mdn）](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Loops_and_iteration)を読んでみましょう。

