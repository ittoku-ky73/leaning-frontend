# イベント

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Building_blocks/Events

このページでは、イベントに関する重要な概念を取り上げ、ブラウザ内でのイベントの振る舞いを見ていきます。

### 運命的なイベントの連続

イベントはプログラムしているシステムの中で生じた動作や出来事を指します。つまり、あるイベントが起きたときにシステムはある種の信号を発します。

ウェブのイベントの場合はブラウザのウィンドウ内で発火されます。そしてその中に属する特定の項目に紐づく傾向にあります。また発生するイベントは様々です。

- 要素の上をクリックしたり、カーソルを持ってくる。
- キーボードのキーを押す。
- ブラウザ画面をリサイズしたり閉じたりする。
- Webページのロード完了
- フォームの送信
- ビデオが再生中、停止中、再生が終わった。
- エラーの発生

 [Event リファレンス](https://developer.mozilla.org/ja/docs/Web/Events)をみればとてもたくさんの応答可能なイベントを見ることができます。

それぞれの利用可能なイベントにはイベントハンドラーがあり、イベントに発火したときに実行される（主にユーザ定義のJavaScript）コードのブロックのことです。

イベントの発火に対する応答としてコードのブロックが実行されるように定義することを、イベントハンドラーを登録すると言います。またイベントハンドラーはイベントリスナーとも呼ばれます。

大事なことですがウェブのイベントはJavaScript言語の主要部分の一部ではありません。ブラウザに組み込まれたJavaScript APIの一部として定義されたものです。

### 簡単な例

下記の例はボタンが押されたらページの背景の色がランダムに変化します。

```js
const btn = document.querySelector('button');

function random(number) {
  return Math.floor(Math.random() * (number+1));
}

btn.onclick = function() {
  const rndCol = `rgb(${random(255)},${random(255)},${random(255)})`;
  document.body.style.backgroundColor = rndCol;
}
```

### ただのWebページではありません

イベントはJavaScript固有のものではありません。ほとんどのプログラミング言語はいくつかのイベントモデルを持ち、その動作する方法はしばしばJavaScriptの方式とは異なります。実際WebページのJavaScriptのイベントモデルは他の環境で用いられるJavaScriptのイベントモデルと異なります。

例えばNode.jsは開発者にJavaScriptでネットワークとサーバーサイドのアプリケーションを構築することを可能にするとても有名なJavaScriptランタイムです。Node.js event modelはイベントを待ち受けるリスナー、イベントを定期的に発生させるemitterに依拠しています。コードは極めて異なっており、イベントリスナーを登録する`on()`や、一度実行したら登録を解除するイベントリスナーを登録する`once()`などの関数を使っています。[HTTP connect event docs (nodejs)](https://nodejs.org/docs/latest-v12.x/api/http.html#http_event_connect)で使い方の例を紹介しています。

その他の例として、[WebExtensions](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions)と呼ばれる技術を使って、クロスブラウザアドオンをJavaScriptで作成できます。

## ウェブイベントの使用方法

様々なイベントリスナーコードを見ていき、どれを使うべきなのかなど議論していきます。

### イベントハンドラープロパティ

`onclick`以外のイベントも見ていきましょう。

- `onfocus, onblur`は、フォーカスされた時やフォーカスが外れたときに発火します。
- `ondbclick`は、ダブルクリックしたときに発火します。
- `onkeypress, onkeydown, onkeyup`は、キーボードのキーが押されたとき、押したとき、離すときに発火します。

### インラインイベントハンドラー

下記はインラインイベントハンドラーの例です。これはあまり使うべきではありません。

```html
<button onclick="bgChange()">Press me</button>

<script>
  function bgChange() {
    const rndCol = `rgb(${random(255)},${random(255)},${random(255)})`;
    document.body.style.backgroundColor = rndCol;
  }
</script>
```

この書き方は悪い方法とみなされています。ちょっとしたことを手早く片付けたいとき、イベントハンドラー属性を使うのが簡単に思えるかもしれませんが、あっという間に手がつけられない効率の悪いものになります。

HTMLとJavaScriptを混在させると読みにくくなります。なのでHTMLはHTML、JavaScriptはJavaScriptでファイル、ディレクトリを分けた方が良いです。

### addEventListener(), removeEventListener()

上記のイベント機構は [Document Object Model (DOM) Level 2 Events](https://www.w3.org/TR/DOM-Level-2-Events/)仕様で規定されました。次のような書き方です。

```js
btn.addEventListener('click', bgChange);
btn.removeEventListener('click', bgChange);

btn.addEventListener('click', function() {
  const rndCol = `rgb(${random(255)},${random(255)},${random(255)})`;
  document.body.style.backgroundColor = rndCol;
})
```

この方式の特徴はイベントを削除することができる点です。これは大きくて複雑なプログラムで使われないイベントハンドラーを削除するときなどに使えます。

またこのイベントハンドラは1度のイベントで複数の関数を実行することができます。

```js
myElement.onclick = functionA; // not work
myElement.onclick = functionB;

// both work
myElement.addEventListener('click', functionA);
myElement.addEventListener('click', functionA);
```

### どの方式を使えばいいの

3つの方式のうち、イベントハンドラーHTML属性は使うべきではありません。時代遅れで悪いやり方です。他の2つであればどちらでもいけます。

- イベントハンドラープロパティはオプションにかけますが、ブラウザ間での互換性が高い。
- DOM Level2 Eventはパワフルですが、構文が複雑で互換性に欠けます。私はこっち派です。

### その他、イベントに関する概念

軽く紹介します。

**Event objects**

イベントハンドラ関数内で`event, evt, e`などと名付けられた引数をイベントオブジェクトと言います。イベントの追加機能や情報を提供する目的でイベントハンドラに自動的に渡されます。

`e.target`は常にイベントが生じた要素を参照します。複数の要素に同じイベントハンドラを割り当てて、どれかでイベントがあったときに何かしたいとき、`e.target`はとてつもなく有用なものです。

イベントハンドラのほとんどは、イベントオブジェクトに標準的なプロパティと関数だけがあります。上級者向けハンドラでは、動作に必要な追加データを保持するために特殊なプロパティを付与するものもあります。

例えば`Media Recorder API`には`dataavailable`イベントがあり、オーディオやビデオの録音や再生が終わって何かする準備ができたところで発火します。これに紐づく`ondataabailable`ハンドラのイベントオブジェクトには録音・録画データを保持する`data`プロパティがあり、これを使って操作できます。

### 標準の動作を抑制する

ときにはイベントに付随する標準動作を止めたい場合があります。例えばカスタムされた登録フォームなどです。詳細を入力し終えてサブミットボタンを押したとき、普通の動作ではデータがサーバーの指定のページに送られて処理され、ブラウザは「成功しました」や「リダイレクト」したりします。

ユーザが適切なデータを送信しなかった場合に問題が発生します。開発者としてあなたはサーバーのデータ送信を抑止し、どこに問題があってデータを適切なものにするにはどうすればいいのかを示すエラーメッセージを表示したいことでしょう。ブラウザの中にはフォームデータの自動検証機能を備えたものもありますが、それには頼らず自前の検証機能を実装すべきです。

```html
<form>
  <div>
    <label for="fname">First name: </label>
    <input id="fname" type="text">
  </div>
  <div>
    <label for="lname">First name: </label>
    <input id="lname" type="text">
  </div>
  <div>
    <input id="submit" type="submit">
  </div>
</form>
<p></p>

<script>
  const form = document.querySelector('form');
  const fname = document.getElementById('fname');
  const lname = document.getElementById('lname');
  const para = document.querySelector('p');

  form.addEventListener('submit', function (e) {
    if (fname.value === '' || lname.value === '') {
      e.preventDefault();
      para.textContent = 'You need to fill in both names!';
    }
  });
</script>
```

### イベントのバブリングとキャプチャリング

下記のコードはいろいろ問題があります。非常に不安定なコードです。

```js
btn.onclick = function() {
  videoBox.setAttribute('class', 'showing');
}

videoBox.onclick = function() {
  videoBox.setAttribute('class', 'hidden');
}

video.onclick = function() {
  video.play();
}
```

### バブリングとキャプチャリングの説明

親要素を持つ要素において、イベントが発火するとモダンブラウザは、2つの異なる段階に分けて動作します。

**キャプチャリング**

- 要素の最上位の親要素（html）に`onclick`イベントハンドラがキャプチャリング段階に登録されているか調べ、あれば実行します。
- つぎに`html`要素の内側の要素に移って同じことをし、また内側のようにと、実際にクリックされた要素に到達するまで繰り返されます。

**バブリング**

- ブラウザは実際にクリックされた要素の`onclick`イベントハンドラがバブリング段階に登録されていれば実行します。
- 次に真上の親要素に移動して同じことをし、また次へ、`html`要素に到達するまで繰り返します。

### stopPropagation()で解決する

この関数は、ハンドラのイベントオブジェクトで起動されると、そのハンドラでは実行されますが、イベントが上位に伝播しないようにします。

なぜキャプチャリングとバブリングはあるのか。それは昔、ブラウザに今ほど互換性がなかった頃、ネットスケープはキャプチャリングだけを、IEはバブリングだけを使っていました。W3Cが動作について標準化と合意を作ろうと決めたとき、どっちのシステムも入れることになり、モダンブラウザはそのように実装されたからです。

イベントハンドラはデフォルトでバブリング段階に登録されています。もしキャプチャリングに登録したいのであれば、`addEventListener()`の第三引数に`true`を指定すれば実現できます。

### イベントの移譲

バブリングではイベント移譲という機能も活用できます。これは例えば、一連のリストアイテムでどれかがクリックされたらメッセージをポップアップさせたい場合、親の`ul`要素にイベントリス名を設定すれば、イベントはリストアイテムからバブリングするという仕組みです。

```js
const parentList = document.getElementById('parent-list');

parentList.addEventListener('click', (e) => {
  const parent = e.target;

  if (parent && parent.nodeName == "LI") {
    const child = e.target;

    console.log(`List item ${child.id.replace('post-', '')} was clicked!`)
	}
});
```

### まとめ

イベントはJavaScriptのコアには属していないらしい。ブラウザのWeb APIに属している。

またJavaScriptの使われ方によっては異なるイベントモデルがある。Web APIとブラウザのWebExtensionやNodejs（Server Side JavaScript）などです。

なかなか難しい内容でした。読んでいていろいろ発見があり勉強になったわ。
