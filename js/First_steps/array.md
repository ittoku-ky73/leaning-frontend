# 配列

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/Arrays

このページでは、配列についてや、配列の項目の追加、削除、取得したりする方法などを見ていきます。

### 配列とは

配列は大抵、リストのようなオブジェクトである。配列オブジェクトは変数に格納され、ほかの型と同様に扱われます。他の型と異なる点は、リスト内の値に個別にアクセスすることができる点と、繰り返しを用いて全ての値に対して同じことをするといった便利で効率的に扱うことができる点です。

もし配列がなかったら、別々の変数にそれぞれの値を格納しなければならず、各変数を表示するのと計算するので別々に呼び出さなければいけないでしょう。こうなると、コードが長くなったり、エラーも起こりやすくなります。

### 配列を作る

配列を作るには、鉤括弧の中にカンマ（,）で区切ったリストの形式で項目を並べます。

```js
let shopping = ['pan', 'milk', 'cheese', 'ham', 'men'];
let sequence = [1, 1, 2, 3, 5, 8, 13];
let random = ['tree', 795, [0, 1, 2]];
```

### 配列の項目を取得し変更する

配列の各項目は、鉤括弧を使用して取得します。

```js
shopping[0]; // 'pan'
shopping[0] = 'rise';
shopping; // ['rise', 'milk', 'cheese', 'ham', 'men']
random[2][2] // 2
```

### 配列の長さを調べる

`length`プロパティを使用して配列の長さを取得することができます。配列をループさせたい場合に便利です。

```js
sequence.length; // 7
for (let i=0; i<sequence.length; i++) {
  console.log(sequence[i]);
}
```

## 便利な配列メソッド

文字列を配列にしたり、配列を文字列にしたり、配列に項目を追加したりなど、ちょっと便利な配列関連のメソッドについて見ていきます。

### 文字列と配列を相互に変換する

`split()`メソッドは、文字列を分割して配列にすることができます。これは、データが長い文字列の中に含まれていて、それを使いやすい形に分割して操作したい場合に便利です。

`join()`メソッドは、`split()`メソッドと逆のことができます。

`toString()`メソッドは、ほぼ`split()`メソッドと同じ動作をします。違う点は配列の項目と項目の間に文字列を指定できず、絶対にカンマ（,）が入るところです。

```js
let myData = '札幌,仙台,東京,名古屋,大阪,博多';
let myArray = myData.split(','); // ['札幌' ,'仙台', '東京', '名古屋', '大阪', '博多']
let myString = myArray.join(','); // '札幌,仙台,東京,名古屋,大阪,博多'
```

### 項目の追加と削除

`push()`メソッドは、配列の最後に項目を追加します。

`pop()`メソッドは、配列の最後の項目を削除します。

```js
let myArray = [1, 2, 3, 4, 5];
myArray.push(6);
console.log(myArray); // [1, 2, 3, 4, 5, 6]
myArray.pop();
console.log(myArray); // [1, 2, 3, 4, 5]
```

`unshift()`メソッドは、配列の先頭に項目を追加します。

`shift()`メソッドは、配列の先頭の項目を削除します。

```js
let myArray = [1, 2, 3, 4, 5];
myArray.unshift(0);
console.log(myArray); // [0, 1, 2, 3, 4, 5]
myArray.shift();
console.log(myArray); // [1, 2, 3, 4, 5]
```

#### 商品を印字しよう：アクティブラーニング

```js
let total = 0;
let products = [
  'パンツ:6.99',
  '靴下:5.99',
  'T シャツ:14.99',
  'ズボン:31.99',
  '靴:23.99',
];

for (let i=0; i<products.length; i++) {
  let product = products[i].split(':');

  console.log(`${product[0]} - ${product[1]}`);
  total += Number(product[1]);
}

console.log(`Result: $${total.toFixed(2)}`);
```

#### 上位5件の検索：アクティブラーニング

```js
let myHistory = [];

if ('button clicked') {
  // 検索ボックスがからの場合スキップ
  if ('input value is NULL') {
    return;
  }

  // 値を先頭に追加する
  myHistory.unshift('input value');

  // 配列が5より大きければ最後を消す
  if (myHistory.length > 5) {
    myHistory.pop()
  }

  // 配列を出力
  for (let i=0; i<myHistory.length; i++) {
    console.log(myHistory[i]);
  }
}
```

### 結論

次は、これまでのJavaScriptで学んだことを確認するために課題をやりましょう。
