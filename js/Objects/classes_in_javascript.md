# JavaScriptの継承

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/Classes_in_JavaScript

このページでは、親クラスから機能を継承する子クラスの生成方法について見ていきます。さらに、いつどこでOOJSを使うかのアドバイスや、最新のECMAScriptの構文でクラスがどのように扱われるかも見ていきます。

### プロトタイプの継承

これまではプロトタイプチェーンがどのように動作するのか、どのようにメンバがつながるチェーンから継承されるのかを見てきした。しかし、これらの大半はブラウザの組み込み関数で実行されるものです。

他のオブジェクトから継承されたオブジェクトをJavaScriptで作成するにはどうするのか見ていきます。

#### 始めてみよう

まずは[oojs-class-inheritance-start.html (github.com)](https://github.com/mdn/learning-area/blob/master/javascript/oojs/advanced/oojs-class-inheritance-start.html)ファイルをローカルにコピーします。あるいは[ライブ版](https://mdn.github.io/learning-area/javascript/oojs/advanced/oojs-class-inheritance-start.html)でもいいです。ここにはこれまで見てきたPerson()コンストラクタが定義されています。

```js
function Person(first, last, age, gender, interests) {
  this.name = {
    first,
    last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
}
```

メソッドはすべてコンストラクタのプロトタイプとして定義されています。

```js
Person.prototype.greeting = function() {
  alert(`Hi! I'm ${this.name.first}.`);
}
```

Teacherクラスを作成する場合を考えて見ましょう。Personクラスからメンバを継承して、さらに次のメンバを新しく定義します。

- subject、先生の教える科目
- greeting()、Personクラスで定義されている同じメソッドより先生っぽい紹介にする。

### Teacherコンストラクタの機能を定義

既存のコードに下記を追加します。ここでは[`call()`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Function/call)を使用して、別のところで定義された関数を、現在のコンテキストに呼び出しています。

```js
function Teacher(first, last, age, gender, interests, subject) {
  Person.call(this, first, last, age, gender, interests);
  this.subject = subject;
}
```

Teacherコンストラクタは継承元のPersonコンストラクタと同じ引数を取りたいため、call()を呼び出して引数を全て渡します。そして最後にsubjectのプロパティを定義します。

TeacherコンストラクタをPersonのように書くこともできますが、コードが長くなったり、Teacherで最も大事なプロパティであるsubjectが見にくくなったりしてしまいます。継承ならその心配はありません。

### 引数なしのコンストラクタからの継承

もし引数を持たないコンストラクタを継承するときは次のようにします。

```js
function Brick() {
  this.width = 10;
  this.heigth = 20;
}

function BlueGlassBrick() {
  Brick.call(this);
  this.opacity = 0.5;
  this.color = 'blue';
}
```

### Teacherプロトタイプとコンストラクタの参照

デフォルトでは新しいコンストラクタを定義すると、定義したクラス自身のprototypeプロパティを持ちます。これはPersonコンストラクタのprototypeプロパティではないので、メソッド群は持っていません。PersonクラスのメソッドをTeacherクラスで利用するにはどのようにすればいいでしょう。

```js
Teacher.prototype = Object.create(Person.prototype);

console.log(Teacher.prototype.constructor === Person.prototype.constructor); // true

Object.defineProperty(Teacher.prototype, 'constructor', {
  value: Teacher,
  enumerable: false, // for inループで現れないようにする
  writable: true,
})
```

上から見ていきます。

1. はじめにTeacher.prototypeプロパティを、Person.prototypeプロパティにします。
2. しかしこのままでは良くありません。なぜならTeacherとPersonクラスのコンストラクタが全く同じだからです。Teacherクラスには独自のコンストラクタにする必要があります。
3. 最後の行で、Teacherクラスのprototypeのconstructorを元のTeacherクラスで定義されたコンストラクタに再定義しています。

これでPersonクラスで定義されているメソッド群をTeacherクラスで使用することができます。

### Teacherクラスにgreeting()を追加する

クラスにメソッドを追加する方法は次のとおりです。

```js
Teacher.prototype.greeting = function() {
  let prefix;

  switch (this.gender.toLowerCase()) {
    case 'male':
    case 'm':
      prefix = 'Mr.';
      break;
    case 'female':
    case 'f':
      prefix = 'Mrs.';
      break;
    default:
      prefix = 'Mx.';
  }
  alert(`Hello. My name is ${prefix} ${this.name.last}, and I teach ${this.subject}.`);
}
```

### 例を試してみよう

Teacherクラスからオブジェクトインスタンスを生成して、いろいろ試して見ましょう。

```js
let teacher = new Teacher('Dave', 'Griffiths', 31, 'male', ['football', 'cookery'], 'mathematics');

teacher.subject;
teacher.bio();
teacher.greeting();
```

また新しいECMAScriptの機能に[Classes](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes)という、明瞭に継承を行える機能もあります。こちらものちほど説明していきます。

### 追加の特訓

これまで学んだことをもとにStudentクラスも実装して見てください。これまでのことを理解しているのならば、できるはずです。

```js
function Student(first, last, age, gender, interests) {
  Person.call(this, first, last, age, gender, interests);
}

Student.prototype = Object.create(Person.prototype);
Object.defineProperty(Student.prototype, 'constructor', {
  value: Student,
  enumerable: false,
  writable: true
});


Student.prototype.greeting = function() {
  alert(`Yo! I'm ${this.name.first}`)
}

let student = new Student('michel', 'jackson', 99, 'X', ['dancing']);
```

### Objectメンバの概要

要約すると、プロパティ、メソッドは4種類あります。

1. コンストラクタ関数の内部で定義され、オブジェクトインスタンスに与えられるもの。

2. コンストラクタ自身で直接定義されたもの。コンストラクタ上でのみ利用可能。静的プロパティ、メソッドという。

3. コンストラクタのプロトタイプに定義されているもの。

4. 上記で見たようにコンストラクタがインスタンス化されたときに作成されるオブジェクト、またはオブジェクトリテラル。

```js
function Test1(a) { this.a = a; }

function Test2() { let a = 'a'; }

function Test3() {}
Test3.prototype.a = 'a';

function Test4() {}
let test = new Test4();
```

### ECMAScript2015のクラス

ECMAScript2015では、C++やJavaのクラスに似た、より簡単で洗練された構文を使用して再利用可能なクラスを記述する方法としてJavaScriptに[クラス構文](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes)を導入しています。

```js
class Person {
  constructor(first, last, age, gender, interests) {
    this.name = {
      first,
      last
    };
    this.age = age;
    this.gender = gender;
    this.interests = interests;
  }

  greeting() {
    console.log(`Hi! I'm ${this.name.first}`);
  }

  farewell() {
    console.log(`${this.name.first} has left the building. Bye for now!`);
  }
}

let han = new Person('Han', 'Solo', 25, 'male', ['Smuggling']);
han.greeting();
han.farewell();
```

### クラス構文による継承

クラス構文を使って継承することをサブクラス、またはサブクラスの作成と言います。

extendsキーワードを使用して、サブクラスを作成します。

```js
class Teacher extends Person {
  constructor(first, last, age, gender, interests, subject, grade) {
    super(first, last, age, gender, interests);
    this.subject = subject;
    this.grade = grade;
  }
}

let snape = new Teacher('Severus', 'Snape', 58, 'male', ['Potions'], 'Dark arts', 5);
snape.greeting();
snape.farewell();
```

### GetterとSetter

作成するクラスの属性の値を変更したい場合や、属性の最終値がわからない場合があります。このような状況を`getter, setter`で処理できます。

```js
class Teacher extends Person {
  constructor(first, last, age, gender, interests, subject, grade) {
    super(first, last, age, gender, interests);
    this._subject = subject;
    this.grade = grade;
  }

  get subject() {
    return this._subject;
  }

  set subject(newSubject) {
    this._subject = newSubject;
  }
}

let snape = new Teacher('Severus', 'Snape', 58, 'male', ['Potions'], 'Dark arts', 5);
console.log(snape.subject); // "Dark arts"
snape.subject = "Balloon animaals";
console.log(snape.subject); // "Balloon animals"
```

この機能は、プロパティが要求されたり設定されたりするたびにコードを実行したい場合など、非常に便利な場合があります。が、単純なケースでは使用しない方が良いです。

### JavaScriptの継承はいつ使用するのか

プロトタイプと継承はJavaScriptの複雑な部分であり理解が難しいです。しかしJavaScriptの能力と柔軟性は、そのオブジェクトの構造と継承に由来しています。そしてそれがどのように動作するのかは知っておいた方が良いでしょう。

ある意味では継承は常に使用しています。Web APIの機能、文字列、配列、ブラウザ組み込みオブジェクトで定義されたメソッドやプロパティなど、暗黙のうちに継承を使用しています。

コードに継承を使用していることに関して、始めたての頃の小さなプロジェクトではあまり必要と感じないかもしれません。しかしコードの母体が大きくなればなるほど、継承の必要性が目につくようになります。

同じような機能を持つ幾つものオブジェクトを作成していることに気づいた場合は、共有機能を持つ汎化オブジェクトタイプを作成し、特化オブジェクトタイプでそれらの機能を継承させるのがお手軽であり便利です。

プロトタイプチェーンなどを使ったJavaScriptのオブジェクト間での機能を共有を移譲と呼びます。特化オブジェクトは汎化オブジェクトタイプから機能的に移譲されています。

継承を使用する際に、やたらに多いレベルで継承を行わないこと、メソッドとプロパティをどこに定義したかを把握しておくことなど聞いたことがあるかもしれません。組み込むブラウザのオブジェクトのプロトタイプを一時的に変更するコードを書き始めることは可能ですが、あまり良くありません。過剰な継承は終わりない混乱や、そんなコードをデバッグするときは終わりない痛みにつながりかねません。

究極的には、オブジェクトは関数やループのような自身の固有の役割や長所を生かしたコードの再利用の単なる別の形でもあります。もし関連のある変数や関数の一団を作成していることに気づき、それら全てを追跡して適切にパッケージ化したいのであれば、オブジェクトは良いアイデアです。またオブジェクトはある所から別の所にデータの集合を渡したい場合に大変便利です。

これらの事柄の両方がコンストラクタや継承を使用することなく達成できます。もしオブジェクトの単一のインスタンスが必要なだけであれば、オブジェクトリテラルを使用する方がより確実な方法であり、継承は必要なくなるでしょう。

### プロトタイプチェーンを拡張するための代替案

[継承とプロトタイプチェーン](https://developer.mozilla.org/ja/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#different_ways_to_create_objects_and_the_resulting_prototype_chain)をご覧ください。

### まとめ

この時点でJavaScriptオブジェクト、オブジェクト指向プログラミングの基本、プロトタイプと継承、クラスとオブジェクトインスタンスの生成、クラスの機能の追加、サブクラスの生成方法など理解しているはずです。

初学者はおそらく理解できていない！次はJSONを見ていくことになるでしょう。これは楽しみ🤩
