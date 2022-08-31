# JavaScriptオブジェクトの基本

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/Basics

このページでは、基本的なJavaScriptオブジェクトの構文について見ていきます。

### オブジェクトの基本

オブジェクトとは関連のあるデータと機能の集合です。機能は変数と関数で構成されており、オブジェクトの中ではそれぞれプロパティとメソッドと呼ばれます。どんなものか例を見て見ましょう。

```js
// define
const person = {
  name: ['Bob', 'Smith'],
  age: 32,
  gender: 'male',
  interests: ['music', 'skiing'],
  bio: function() {
    alert(`\
${this.name[0]} ${this.name[1]} is ${this.age} years old.
He likes ${this.interests[0]} and ${this.interests[1]}.`);
  },
  greeting: function() {
    alert(`Hi! I'm ${this.name[0]}.`);
  }
};

// call
person.name // ['Bob', 'Smith']
person.name[0] // 'Bob'
person.age // 32
person.interests[0] // 'music'
person.bio()
person.greeting()
```

オブジェクトは次のように定義します。

```js
const objectName = {
  member1Name: member1Value,
  member2Name: member2Value,
  member3Name: member3Value,
}
```

オブジェクトリテラルを使用してオブジェクトを生成する方法は一般的で、ある法則に則って構造化、関連づけられたデータをやり取りするときに使用します。例えば、サーバーにリクエストを送ったり、データベースに保存するなどです。

なぜ使用されるかというと、オブジェクトを送る方が複数の項目を何回かに分けて送るよりも効率的で、名前を用いて検索するときなどには、配列よりも扱いやすいからです。

### ドットによる記述

オブジェクトは次のように参照します。

```js
objectName.member1Name
```

### サブ名前空間

上記の`person.name`の定義を変更します。

```js
person = {
  name: {
    first: 'Bob',
    last: 'Smith',
  },
  ...
}

person.name.first
person.name.last
```

### 鉤括弧による記述

オブジェクトのプロパティにアクセスする方法の1つとして角括弧を用いた記法があります。この記法のメリットは値が定義されていなかった場合にエラーを吐かず`undefined`を返すところです。

```js
person['age']
person['name']['first']
```

### オブジェクトメンバーの設定

定義されたオブジェクトに値を設定（更新）する方法は次の通りです。

```js
person.age = 45;
person['name']['last'] = 'hgoebar';

// 新しいプロパティと値も定義することができる
person['eyes'] = 'black';
person.farewell = function() { alert("Good Bye!"); }
```

### thisとは何か

`this`キーワードはコードの中がその中で書かれている現在のオブジェクトを参照します。なぜthisの代わりに単にpersonと書かないのか、それはメンバーのコンテキストが変わったときに常に正しい値を保証してくれるからです。

### ずっとオブジェクトを使ってきたよ

組み込みのブラウザAPIやJavaScriptオブジェクトを使うときなどいつもオブジェクトを使用してきました。それらの機能は、基本的なカスタム例よりも複雑ではありますが、ここまで見てきたものと全く同種のオブジェクト構造を使うことで構築されているからです。

```js
myString.split(',');
```

上記の例は、Stringクラスのインスタンスで利用できるメソッドを使用しています。コードの中で文字列を作成する時はいつでもStringクラスのインスタンスを生成されます。そのおかげで、いくつかの共通なメソッドやプロパティを使用することができます。

今まで使用してきたArray, Math等の多くの組み込みオブジェクトやAPIでも全く同じです。

組み込みオブジェクトとAPIでは常に自動でオブジェクトのインスタンスが生成されるわけではないことに注意する必要があります。例えば、モダンなブラウザがシステム通知を発行することを許可するNotifications APIでは、発行した威嚇通知のためにコンストラクタを使用した新しいオブジェクトを生成する必要があります。

```js
const myNotification = new Notification('Hello');
```

オブジェクトのやりとりをメッセージの受け渡しと考えると便利です。オブジェクトが他のオブジェクトにある処理の実行を要求したとき、そのオブジェクトはメソッドを通じて他のオブジェクトにメッセージを送信して、応答（返り値）を待ちます。

### まとめ

オブジェクトはJSONを使うときに便利。絶対に覚えておくべきである🧐
