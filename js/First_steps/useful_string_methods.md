# 便利な文字列メソッド

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/Useful_string_methods

このページでは、木見込みメソッドを使用して文字列に対して実行できる便利な操作について見ていきます。

### オブジェクトとしての文字列

JavaScriptではほとんどのものはオブジェクトです。下記の変数は文字列オブジェクトのインスタンスになり、大量のプロパティとメソッドが使用可能となります。

```js
let string = 'This is my string';
```

文字列オブジェクトについて詳しく知りたい場合は、mdnの[`String`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String)のページを覗いて見ましょう。

### 文字列の長さを調べる

lengthプロパティで文字列の長さの数値を出力することができます。

```js
let browserType = 'mozilla';
browserType.length; // -> 7
```

### 特定の文字列を扱う

文字列に対して鉤括弧を使用すると文字列内の任意の1文字がえられます。また、コンピュータは1からではなく0から数えます。

```js
browserType[0]; // 'm'
browserType[browserType.length-1]; // 'a'
```

### 部分文字列を探して抽出する

`indexOf()`メソッドは、長い文字列の中からある文字列があるかどうかし調べたい時に使用します。

もしある文字列が見つかった場合は、元の文字列の中のインデックス位置を表す数値を返します。なかった場合は`-1`を返します。

```js
browserType.indexOf('zilla'); // 2
browserType.indexOf('hoge'); // -1
```

このメソッドは、ウェブサイトのアドレスの一覧があった時、その中から部分文字列を含むものだけを表示したい場合などに使えます。

`slice()`メソッドは、文字列から始まりと終わりのインデックス位置の数値を指定することで、文字列を抽出することができます。始めのインデックスが0の場合は、省略して書くこともできます。

```js
browserType.slice(0, 3); // moz
browserType.slice(2); // mo
```

### 大文字・小文字の切り替え

`toLowerCase(), toUpperCase()`という2つのメソッドは、文字列の文字を全て大文字・小文字に変換します。これは例えば、ユーザ入力をデータベースに保存する時に値を正規化する時に便利です。

```js
let myCountry = 'JaPaN';
myCountry.toLowerCase(); // -> 'japan'
myCountry.toUpperCase(); // -> 'JAPAN'
```

### 文字列の一部分を書き換える

`replace()`メソッドは、ある部分文字列を他の文字列に置き換えることができます。引数には、検索する文字列、置き換える文字列の2つを指定します。

```js
browserType.replace('moz', 'van'); // -> 'vanilla'
```

## アクティブ学習の実例

下記では、文字列を操作するコードを書きます。

### 挨拶を選別する

```js
/*
 * Christmasの入ったメッセージを出力する
*/
let greetings = [
  'Happy Birthday!',
  'Merry Christmas my love',
  'A happy Christmas to all the family',
  'You\'re all I want for Christmas',
  'Get well soon'
];

for (let i = 0; i < greetings.length; i++) {
  let input = greetings[i];
  if (input.indexOf('Christmas') !== -1) {
    console.log(input);
  }
}
```

### 単語の最初の文字を大文字に直す

```js
/*
 * 最初の文字だけ大文字にする
 */
let cities = [
  'lonDon',
  'ManCHESTer',
  'BiRmiNGHAM',
  'liVERpoOL'
];

for (let i=0; i<cities.length; i++) {
  let input = cities[i];
  input = input.toLowerCase();
  input = input.replace(input[0], input[0].toUpperCase());
  console.log(input);
}
```

### 既存の部分から新しい文字列を作成する

```js
/*
 * コンピュータ読み取り用のデータから、人間が読めるような文字列にして出力する
 * example: MAN6784... => 'MAN: Manchester Piccadilly'
 */
let stations = [
  'MAN675847583748sjt567654;Manchester Piccadilly',
  'GNF576746573fhdg4737dh4;Greenfield',
  'LIV5hg65hd737456236dch46dg4;Liverpool Lime Street',
  'SYB4f65hf75f736463;Stalybridge',
  'HUD5767ghtyfyr4536dh45dg45dg3;Huddersfield'
];

for (let i=0; i<stations.length; i++) {
  let input = stations[i];
  input = input.replace(';', ': ');
  let inputStart = input.slice(0, 3);
  let inputEnd = input.slice(input.indexOf(':'), -1)
  input = inputStart + inputEnd;
  console.log(input);
}
```

### 結論

プログラミング、特にJavaScriptでは単語や文を処理できるようになることが大事です。それはWebサイトは人とのコミュニケーションが全てとなるためです。
