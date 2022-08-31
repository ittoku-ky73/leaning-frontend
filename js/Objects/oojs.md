# 初心者のためのオブジェクト指向JavaScript

> 参考：https://developer.mozilla.org/ja/docs/conflicting/Learn/JavaScript/Objects/Classes_in_JavaScript

このページでは、オブジェクト指向JavaScript（OOJS）について見ていきます。

### オブジェクト指向プログラミング：基本

はじめに、オブジェクト指向プログラミングとは何か、シンプルに説明します。シンプルにというのは、OOPはあっという間にひどく複雑になり得るためで、ここで全てを説明してしまうと混乱を生じさせてしまうからです。

オブジェクトは、モデル化しようとしている事柄に関する情報や持たせたい機能や動作を表現するデータとコードを持つことができます。オブジェクトのデータ（または関数）はオブジェクトのパッケージの中（名前空間とも呼ばれる）に適切に格納されます。これをカプセル化と言います。オブジェクトはネットワークを通じて容易に送信可能なデータストアとしても使用されます。

### オブジェクトのテンプレートを定義する

学校の生徒と教師の情報を表示するシンプルなプログラムを例に考えていきます。

はじめに`Person`という、人物の包括的なデータや機能を定義したオブジェクトについて見ていきます。中身には「名前、年齢、性別、趣味、これらの自己紹介、挨拶」などを定義します。これは抽象化といい、より複雑な物事をプログラムの目的に沿って簡単に操作できるように、シンプルなモデルを作ることです。

### 実際のオブジェクトの生成

オブジェクトインスタンスはクラスから生成することができます。インスタンスは、クラスで定義されたデータや機能を持ったオブジェクトです。Personクラスからいくつか生成します。

クラスからオブジェクトインスタンスが生成されるとき、クラスのコンストラクタ関数が生成のために実行されます。この生成される過程をインスタンス化と呼びます。

### 専門のクラス

このケースで求めているのは、教師と生徒です。OOPでは、他のクラスをもとにした新しいクラスを作ることができます。これらの新しい子クラスは、親クラスからデータやコード機能を継承させることができ、オブジェクトタイプに共通する機能を再利用することができます。

これは実に役に立ちます。教師と生徒のクラスを生成する場合、共通点があります。そこをPersonクラスで定義し、それぞれで継承することでコードが短くなります。

同じ機能を複数のオブジェクトタイプが実装する能力のことをポリモーフィズムと呼びます。

### コンストラクタとオブジェクトインスタンス

JavaScriptでは、オブジェクトやその機能を定義し初期化するためにコンストラクタ関数と呼ばれる特殊な関数を使用します。

```js
function Person(name) {
  this.name = name;
  this.greeting = function() {
    alert(`Hi! I'm ${this.name}.`);
  }
}

let person = new Person('Bob');
person.greeting(); // Hi! I'm Bob.
```

### 最終的なコンストラクタの作成

最終的なPerson()コンストラクタ関数を作成します。

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
```

### さらなる練習

`Person.prototype.bio()`メソッドには問題点があります。それは人物が男性以外である場合に"He"という代名詞が含まれてしまう点です。あと`interests`のところでは2つの場合のみ表示される点です。ここに少し手を加えて見ましょう。

```js
function Person(first, last, age, gender, interests) {
  ...
  this.bio = function() {
    let pronoun;  // 'He'か'She'か'They'を格納する
    let interests; // interests配列を文字列にする

    switch (this.gender) {
      case 'male':
        pronoun = 'He';
        break;
      case 'female':
        pronoun = 'She';
        break;
      default:
        pronoun = 'They';
        break;
    }

    if (this.interests.length === 0) {
      interests = 'no interests';
    }
    else {
      interests = this.interests.join(' and ');
    }

    alert(`\
    ${this.name.first} ${this.name.last} is ${this.age} years old.
    ${pronoun} likes ${interests}.`)
  }
}
```

### オブジェクトインスタンスを生成する他の方法

ここまで、2つの異なるオブジェクトインスタンスを生成する方法を見ていきました。オブジェクトリテラルとコンストラクタ関数です。他の方法も見ていきましょう

**Object()コンストラクタ**

```js
let person1 = new Object({
  name: 'Chris',
  age: 38,
  greeting: function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
});
```

**create()メソッド**

```js
let person2 = Object.create(person1);
```

### まとめ

オブジェクト指向プログラミング、ややこしいね☹️
