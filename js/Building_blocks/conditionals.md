# 条件文

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Building_blocks/conditionals

このページでは、JavaScriptの条件文がどのように動作するのか見ていきます。

### 全ては条件次第

人類は小さいものから大きいものまで、生活に関わる全ての決定を下します。JavaScriptは、条件分を使ってそういった決定を下すことが可能です。

### if elseステートメント

JavaScriptで最もよく使われる条件文は`if else`です。`else`はなくても動作します。一番下の例は動作はしますがあまりお勧めしない書き方です。

**基本的な構文**

```js
if (条件式) {
  条件式がtrueの場合に実行されるコード
} else {
  それ以外に実行されるコード
}

if (条件文) 条件式がtrueの場合に実行されるコード
else それ以外に実行されるコード
```

**実際の例**

```js
let shoppingDone = false;

if (shoppingDone == true) {
  let childsAllowance = 10;
} else {
  let childsAllowance = 5;
}
```

**else if**

条件式が複数ある場合は、`else if`を使います。

```js
let weathers = [
  'sunny',
  'rainy',
  'snowing',
  'overcast',
];

let choice = wathers[1];

if (choice == 'sunny') {
  console.log('今日は晴れです🌤');
}
else if (choice == 'rainy') {
    console.log('今日は雨です🌂');
}
else if (choice == 'snowing') {
  console.log('今日は雪です⛷');
}
else if (choice == 'overcast') {
  console.log('今日は曇りです🌥');
}
else {
  console.log('今日の天気は分かりません。oh my god')
}
```

### 比較演算子のメモ

`true, false`の値を判定する場合、少し配慮が必要になります。初めは苦戦します。`false, undefined, null, 0, NaN, ''`以外の値は条件文で使った場合に`true`になります。もし値が`true`であるかや、存在するかを判定したい場合は条件式に変数名を使用するだけ分岐できます。

```js
/* cheeseという変数が上記の値以外ならtrueになります
 * 条件文には必ず比較演算子を使わなければいけないわけではありません。
 */
let cheese = 'cheder';

if (cheese) {
  console.log('チーズがあるよ');
}
else {
  console.log('チーズはないよ');
}

let shoppingDone = false;

if (shoppingDone) {
  let childsAllowance = 10;
}
else {
  let childsAllowance = 5;
}
```

### else ifの入れ子

`if else`を入れ子にして、他の`if else`を中で使用するのは全く問題ありません。内側の`if else`は、外側の`if`ステートメントとは完全に独立して作用します。

```js
let nest = 'ok';
if (nest) {
  if (nest) {
    console.log(nest);
  }
  else if (nest) {
    console.log(nest);
  }
  else {
    console.log(nest);
  }
}
```

### 論理演算子

複数の条件を入れ子の`if else`を書かずに判定したいなら論理演算子の出番です。

| 定義 | 名称 | 説明                                                         |
| ---- | ---- | ------------------------------------------------------------ |
| &&   | AND  | 2つ以上の式を1つに繋げ、全て`true`だった場合、その式を`true`として返します。 |
| \|\| | OR   | 2つ以上の式を1つに繋げ、どれか`true`だった場合、その式を`true`として返します。 |
| !    | NOT  | 式が`false`だった場合、`true`を返します。                    |

```js
// && AND
if (choice === 'sunny' && temprature < 86) {
  console.log(`外の気温は${temprature}度です。晴れです。アイスクリームでも食べましょう`)
}
else if (choice === 'sunny' && temprature > 86) {
  console.log('外の気温は' + temprature + '度です。暑いです。家でクーラーをかけてゆっくりしましょう')
}

// || OR
if (iceCreamCarOutside || houseStatus == 'fire') {
  console.log('火事です！逃げましょう');
}
else {
  console.log('アイスクリームを食べましょう');
}

// ! NOT
if (!(iceCreamCarOutside || houseStatus == 'fire')) {
  console.log('アイスクリームを食べましょう');
}
else {
  console.log('火事です！逃げましょう');
}
```

### switchステートメント

switchステートメントは、1つの式、値を受け取り、それに合致する値が見つかるまで選択肢を探します。見つかればその式を実行します。このステートメントは条件式の選択肢がたくさんある場合に使います。

```js
let weathers = [
  'sunny',
  'rainy',
  'snowing',
  'overcast',
];

let choice = wathers[1];

switch (choice) {
  case 'sunny':
    console.log('今日は晴れです🌤');
    break;
  case 'rainy':
    console.log('今日は雨です🌂');
    break;
  case 'snowing':
    console.log('今日は雪です⛷');
    break;
  case 'overcast':
    console.log('今日は曇りです🌥');
    break;
  default:
    console.log('今日の天気は分かりません。oh my god')
    break;
}
```

### 三項演算子

三項演算子は、条件式を判定し、その結果で2つの値、式のどちらか一方を返します。`if else`ブロックを書くよりも多くのコードを節約できます。

```js
let isBirthday = true;
let greeting = (isBirthday) ? 'Happy birthday hoge' : 'Hello hoge';
```

### 三項演算子を使用する例

```js
const select = document.querySelector('select');
const body = document.querySelector('body');

function updateWebsiteColor(bgColor, textColor) {
  body.style.backgroundColor = bgColor;
  body.style.color = textColor;
}

select.addEventListener('change', function() {
  (select.value == 'black') ? update('black', 'white') : update('white', 'black');
});
```

#### 単純なカレンダー：アクティブラーニング

```js
const select = document.querySelector('select');
const list = document.querySelector('ul');
const h1 = document.querySelector('h1');

select.onchange = function() {
  const choice = Number(select.value);
  let days;

  switch (choice) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      days = 31;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      days = 30;
      break;
    case 2:
      days = 28;
      break;
    default:
      days = 0;
      break;
  }

  createCalendar(days, choice + ' 月');
}

function createCalendar(days, choice) {
  list.innerHTML = '';
  h1.textContent = choice;
  for (let i = 1; i <= days; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = i;
    list.appendChild(listItem);
  }
}

createCalendar(31,'1 月');
```

#### たくさんの色から選ぶ：アクティブラーニング

```js
const select = document.querySelector('select');
const body = document.querySelector('.output');

select.onchange = function() {
  const choice = select.value;

  switch (choice) {
    case 'white':
      update(choice, 'black');
      break;
    case 'black':
      update(choice, 'white');
      break;
    case 'purple':
      update(choice, 'whilte');
      break;
    case 'yellow':
      update(choice, 'gray');
      break;
    case 'psychedelic':
      update('lime', 'black');
      break;
  }
}

function update(bgColor, textColor) {
  body.style.backgroundColor = bgColor;
  body.style.color = textColor;
}
```

### まとめ

条件文ができなければプログラミングはできないゾ🐞

