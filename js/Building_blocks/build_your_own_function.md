# 独自の関数

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Building_blocks/Build_your_own_function

このページでは、自力で独自関数を作成すための方法を見ていきます。

### 関数を作ってみよう：アクティブラーニング

`displayMessage()`という独自の関数を作っていきます。

### 基本的な関数

関数に名前をつける時は、変数名と同じルールに従って名付けます。

```js
const html = document.querySelector('html');

function displayMessage() {
  const panel = document.createElement('div');
  panel.setAttribute('class', 'msgBox');
  html.appendChild(panel);

  const msg = document.createElement('p');
  msg.textContent = 'This is a message box';
  panel.appendChild(msg);

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'x';
  panel.appendChild(closeBtn);

  closeBtn.onclick = function() {
    panel.parentNode.removeChild(panel);
  }
}
```

### 関数の呼び出し

関数を呼び出し、実行するには次のように書きます。つぎに、`onclick`を使ってボタンが押されたときに関数を実行するようにします。

下の書き方では`onclick`に関数名ではなく関数を指定しています。これは関数呼び出し演算子と言い、こうするとページを読み込むタイミングで一度関数が実行されます。

```js
displayMessage();

const btn = document.querySelector('button');
btn.onclick = displayMessage();
```

### パラメータを使用して関数を改善する

`displayMessage()`関数に引数を追加して、機能を柔軟にします。ここでは`msgText`で好きな文字列をmsgBoxに入れています。

```js
// function displayMessage() {}
function displayMessage(msgText, msgType) {
  ...
  msg.textContent = msgText;
  ...
}

btn.addEventListener('click', () => {
  displayMessage('Woo, this is a different message!');
});
```

### より複雑なパラメータ

上記の関数の`msgType`引数のパラメータの設定によって、別のアイコンと異なる背景色を表示させるようにします。

```js
function displayMessage(msgText, msgType) {
  ...
  if (msgType === 'warning') {
    msg.style.backgroundImage = 'url(icons/warning.png)';
    panel.style.backgroundColor = 'red';
  }
  else if (msgType === 'chat') {
    msg.style.backgroundImage = 'url(icons/chat.png)';
    panel.style.backgroundColor = 'aqua';
  }
  else {
    msg.style.paddingLeft = '20px';
  }
}
```

### 完成版

```js
const html = document.querySelector('html');

/* msgBoxを作成
 * msgTextで好きな文字列を挿入することが可能
 * msgTypeでmsgBoxの見た目を変更することが可能
 * * 'warning': 危険な感じ
 * * 'chat': はぁ〜い、みたいな感じ
 * HTML
<div class="msgBox">
  <p>This is a message box</p>
  <button>x</button>
</div>
*/
function displayMessage(msgText, msgType) {
  const panel = document.createElement('div');
  panel.setAttribute('class', 'msgBox');
  html.appendChild(panel);

  const msg = document.createElement('p');
  msg.textContent = msgText;
  panel.appendChild(msg);

  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'x';
  panel.appendChild(closeBtn);

  closeBtn.onclick = function() {
    panel.parentNode.removeChild(panel);
  }

  if (msgType === 'warning') {
    msg.style.backgroundImage = 'url(icons/warning.png)';
    panel.style.backgroundColor = 'red';
  }
  else if (msgType === 'chat') {
    msg.style.backgroundImage = 'url(icons/chat.png)';
    panel.style.backgroundColor = 'aqua';
  }
  else {
    msg.style.paddingLeft = '20px';
  }
}
```

### まとめ

独自関数はプログラミング力が試される。君のプログラミングのレベルはどうかな🧐

