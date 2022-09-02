# JavaScriptでの継承

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
  let gender = this.gender.toLowerCase()

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

また新しいECMAScriptの機能に[Classes](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes)という、明瞭に継承を行える機能もあります。こちらも説明していきます。

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

続きます。。。
