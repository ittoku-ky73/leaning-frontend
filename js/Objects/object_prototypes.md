# Objectのプロトタイプ

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/Object_prototypes

このページでは、プロトタイプチェーンの仕組みを説明し、`prototype`プロパティを使用して既存のコンストラクタメソッドを追加する方法を見ていきます。

### プロトタイプベースの言語とは

JavaScriptはプロトタイプベースの言語と言われています。プロトタイプベース言語は継承機能を提供します。そのためオブジェクトはprototypeオブジェクトを持つことができます。そしてテンプレートオブジェクトとして機能し、そこからメソッドやプロパティを継承することができます。

オブジェクトのプロトタイプオブジェクトもまたメソッドやプロパティを継承するプロトタイプオブジェクトを持つことができます。これをプロトタイプチェーンと呼ばれ、異なるオブジェクトが他のオブジェクトに定義されたプロパティやメソッドを持つことができます。

JavaScriptでは、あるオブジェクトのインスタンスとそのプロトタイプの間にリンクが貼られており、それを辿ると継承元を見つけることができます。

### プロトタイプオブジェクトの理解

Personコンストラクタを例にして、そこからプロトタイプについて学びます。

```js
function Person(first, last, age, gender, interests) {
  this.name = {
     first : first,
     last : last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.bio = function() {
    alert(`\
    ${this.name.first} ${this.name.last} is ${this.age} years old.
    He likes ${this.interests[0]} and ${this.interests[1]}.`)
  };
  this.greeting = function() {
    alert(`Hi! I'm ${this.name.first}.`);
  }
}

let person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
person1.valueOf();
Object.getPrototypeOf(person1);
```

`valueOf()`メソッドは、呼び出されたオブジェクトの値を返します。

`Object.getPrototypeOf(obj)`メソッドは、objのプロトタイプにアクセスすることができます。

### 継承されたメンバーが定義されている場所

継承されたプロパティとメソッドはどこに定義されているのでしょうか。上記のperson1はオブジェクトですがObjectの機能を全て継承しているわけではありません。

継承されるものは`prototype`プロパティで定義されたものであり、それは`Object.prototype`で始まるもので、`Object`で始まるものではありません。`prototype`プロパティの値はオブジェクトであり、基本的にプロトタイプチェーンのさらに下のオブジェクトに継承させたいプロパティやメソッドを格納するためのバケットです。

そのため、`Object.prototype.toString(), Object.prototype.valueOf()`などは`Object.prototype`を継承するあらゆるオブジェクトタイプで利用できます。

`Object.is(), Object.keys()`などprototypeパケット内で定義されていないメンバは、`Object.prototype`を継承するオブジェクトインスタンスやオブジェクトタイプには継承されません。

プロトタイプチェーン継承の他の例は、`String, Date, Number, Array`などのグローバルオブジェクトのプロトタイプに定義されているメソッドやプロパティがあります。これらはすべてプロトタイプに定義されたいくつかのメンバを持っています。そのおかげで`split(), indexOf(), replace()`などの便利なメソッドを使うことができるのです。

### create()の再訪

下記の例では`Object.create()`メソッドを使用して新しいオブジェクトの作成と継承元について例を書いています。

```js
let person2 = Object.create(person1);
Object.getPrototypeOf(person2); // => person1
```

### コンストラクタのプロパティ

すべてのコンストラクタ関数は`prototype`プロパティを持ち、その値は`constructor`プロパティを含むオブジェクトとなります。`constructor`プロパティは元のコンストラクタ関数を指します。

```js
person1.constructor // => Personコンストラクタを返す
person1.constructor // => Personコンストラクタを返す

// このように新しいオブジェクトを生成することもできる
let person3 = new person1.constructor('Karen', 'Stephenson', 26, 'female', ['Playing drums', 'mountain climbing']);

person3.constructor.name // => 'Person'
```

### プロトタイプの変更

コンストラクタ関数のprototypeプロパティを変更する例を見て見ましょう。

```js
function Person(first, last, age, gender, interests) {
  // ...
}

let person1 = new Person('Tammi', 'Smith', 32, 'neutral', ['music', 'skiing', 'kickboxing']);

Person.prototype.farewell = function() {
  alert(`${this.name.first} has left the building. Bye for now!`);
}
person1.farewell();

Person.prototype.fullName = function() {
  return `${this.name.first} ${this.name.last}`;
}
person1.fullName()

Object.defineProperty(Person, 'hoge', {
  value: 'Japan',
  writable: false,
});
Person.hoge; // 'Japan'

delete Person.prototype.farewell
person1.farewell() // ERROR
```

多くのオブジェクト定義でよく見られるパターンは、コンストラクタ内でプロパティを定義し、プロトタイプ上でメソッドを定義することです。これによりコンストラクタにはプロパティの定義のみが含まれ、メソッドは別のブロックに分割されるため、コードが読みやすくなります。

```js
// Constructor with property definitions

function Test(a, b, c, d) {
  // property definition
}

// define first method
Test.prototype.x = function() {};
// define second method
Test.prototype.y = function() {};
// ...
```

このパターンは、Piotr Zelewa氏の[学校計画のアプリ](https://github.com/zalun/school-plan-app/blob/master/stage9/js/index.js)の例で実際に見ることができます。

### まとめ

このページでは、プロトタイプオブジェクトチェーンによってオブジェクトが互いに機能を継承する方法、プロトタイププロパティとそれを使ってコンストラクタにメソッドを追加する方法など、JavaScriptオブジェクトのプロトタイプについて見ていきました。

難しいけどなかなか面白い。プロトタイプは書きにくいけどそれは慣れとかの問題で、使いこなせるかの問題でもある。個人的には`class`構文の方が好きかな😫
