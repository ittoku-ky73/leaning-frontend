# ドキュメントの操作

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents

このページでは、DOMの使い方や、あらゆる方法で開発者の環境を変えることができる興味深いAPIなど見ていきます。

### ウェブブラウザの重要なパーツ

ウェブブラウザはたくさんの部品からなるソフトウェアの集合体で、部品の多くはJavaScriptからの制御や操作はできないようになっています。なぜこのようになっているのかというと、主にセキュリティのためです。もしもあなたのパスワードや秘密を他人がアクセスできてしまうのは良くないでしょう。

制限はあってもウェブAPIは、Webページ上で動作するたくさんの機能を提供しています。下の図はWebページの表示に直接関与しているブラウザの主要なパーツを表しています。

![document-window-navigator](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents/document-window-navigator.png)

- Windowは、Webページが読み込まれる部分の周りの枠です。JavaScriptで`Window`オブジェクトで表します。ウィンドウに読み込まれる文書を操作したり、その文書に関係するデータをクライアント側で保存したり、現在のウィンドウに対してイベントを追加したりできます。
- Navigatorは、ブラウザの状態やウェブで使われているようなブラウザの身元（ユーザーエージェント）を表します。JavaScriptで`Navigator`オブジェクトで表します。位置情報、ユーザの好む言語、ユーザのウェブカムからの録画データなどを取得できます。
- Documentは、ウィンドウに実際に読み込まれているページのことです。JavaScriptで`Document`オブジェクトで表します。HTMLとCSS上の情報を調べたり操作したりでき、要素を参照できたり、テキストの変更、新しいスタイルの適用、要素の新規作成や削除などができます。

このページでは主にドキュメントの操作に着目します。

### ドキュメントオブジェクトモデル

ブラウザのタブのドキュメントは、ドキュメントオブジェクトモデルとして表現されています。これはHTML構造に対してプログラム言語から簡単にアクセスできるように、ブラウザが作成する木構造のことです。機能は、ページをレンダリングする際に、まずブラウザ自体がスタイルや他の情報を適切な要素に適用するためにDOMを使用し、ページのレンダリングが終わった後にJavaScriptでDOMを操作できます。

DOMツリーは、[Live DOM viewer](https://software.hixie.ch/utilities/js/live-dom-viewer/)を使って見たり作ったりできます。DOMツリーにはノードと呼ばれる要素のエントリーが多数あります。またノードの種類は次のとおりです。

| Node            | ノード           | 説明                                                 |
| --------------- | ---------------- | ---------------------------------------------------- |
| Element Node    | エレメントノード | 要素のこと                                           |
| Root Node       | ルートノード     | 頂点のノードのことで、HTMLではhtml要素がそれに当たる |
| Child Node      | 子ノード         | 他のノードの直下に含まれるノード                     |
| Descendant Node | 子孫ノード       | 他のノードの下に含まれるノード                       |
| Parent Node     | 親ノード         | 他のノードの上に含まれるノード                       |
| Sibling Node    | 兄弟ノード       | 同じ階層にあるノード                                 |
| Text Node       | テキストノード   | 文字列を含むノード                                   |

これらは、CSSを使用する時に多用するので覚えておくといいでしょう。

#### 基本的なDOM操作：アクティブラーニング

変数に要素の参照を保存すると、プロパティとメソッドを使ってDOMの操作ができるようになります。a要素であれば、`HTMLAnchorElement`インターフェースが使用できます。

JavaScriptでは、要素を変数に保存する方法がいろいろあります。その中で`Document.querySelector()`を使うのが推奨される方法です。なぜかというとCSSセレクタと同じ方法で要素を選別できるからです。複数の要素を変数に保存するには`Document.querySelectorAll()`を使うと良いでしょう。

古い方法には、`Document.getElementById(), Document.getElementByTagName()`などがあります。

### 新しいノードの作成と配置

`Document.createElement()`は、新しい要素を生成します。

`Node.appendChild()`は、ノードに子要素を追加します。

`Document.createTextNode()`は、新しいTextノードを生成します。このメソッドはHTML文字をエスケープする時に利用できます。

```js
const myul = document.createElement('ul');
const myli = document.createElement('li');
let newtext = document.createTextNode('new text');
myli.appendChild(newtext);
myul.appendChild(myli);
```

### 要素の移動や削除

`Node.appendChild()`は、追加するだけでなく要素を移動させることもできます。

`Node.removeChild()`は、指定された子要素のノードを削除します。ノード自体を削除するときは、`ChildNode.remove()`を使用します。

### スタイルを操作する

ドキュメントに付随するスタイルシートの全ては、`Document.stylesheets`で取得できます。これは`CSSStyleSheets`オブジェクトを含む配列のようなオブジェクトを返します。この機能を使えばスタイルを操作できますが、もっと簡単な方法があります。

動的に要素のスタイルを指定したい場合は、`HTMLElement.style`プロパティを使います。この機能を使用すると要素にインラインでスタイルを適用することができます。

```js
para.style.color = 'white';
para.style.backgroundColor = 'black';
para.style.padding = '10px';
para.style.width = '250px';
para.style.textAlign = 'center';
```

`Element.setAttribute()`は、2つの引数を取り、要素に設定したい属性名と、属性に設定したい値を指定します。これでもスタイルを適用することもできます。

```js
para.setAttribute('class', 'highlight');
```

#### ウィンドウオブジェクトから情報を取得：アクティブラーニング

これまでは文書を操作する`Node, Document`の機能を見てきました。ここでは`Window`の機能を見ていきます。

`Window.innerWidth, Window.innerHeight`プロパティは、ビューポート（ドキュメントが表示されている内側のウィンドウ）の幅と高さを取得できます。

`Window.onresize`イベントハンドラは、ビューポートのサイズが変更される時に発火します。

#### 動的な買い物リスト：アクティブラーニング

[こちら](https://developer.mozilla.org/ja/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents#%E5%AE%9F%E8%B7%B5%E5%AD%A6%E7%BF%92_%E5%8B%95%E7%9A%84%E3%81%AA%E8%B2%B7%E3%81%84%E7%89%A9%E3%83%AA%E3%82%B9%E3%83%88)をもとに、買い物リストを作っていきます。完成例は[こちら](https://mdn.github.io/learning-area/javascript/apis/document-manipulation/shopping-list-finished.html)です。

### まとめ

DOM操作はJavaScriptの基本。明日のテストに出ます🫥

### 参考文献

- [Document](https://developer.mozilla.org/ja/docs/Web/API/Document)
- [Window](https://developer.mozilla.org/ja/docs/Web/API/Window)
- [Node](https://developer.mozilla.org/ja/docs/Web/API/Node)
- [HTMLElement](https://developer.mozilla.org/ja/docs/Web/API/HTMLElement)、[HTMLInputElement](https://developer.mozilla.org/ja/docs/Web/API/HTMLInputElement)、[HTMLImageElement](https://developer.mozilla.org/ja/docs/Web/API/HTMLImageElement)、etc ...
