# CSSの動き方

> 参考：https://developer.mozilla.org/ja/docs/Learn/CSS/First_steps/How_CSS_works

このページでは、ブラウザがCSSとHTMLを実際にWebページとして表示する流れを紹介します。

## CSSは実際にどう機能するのか

**ブラウザがWebページを読み込む手順**

1. HTMLをロード（ネットワークから受信するなどから）する。
2. HTMLをDOM（Document Object Model）へ変換する。
3. 埋め込まれた画像やビデオなどのリソースとCSSを取得する（JavaScriptはもう少し後で処理される）。
4. CSSを解析し、要素、クラス、IDなどセレクタの種類ごとに分類する。
   見つけたセレクタに基づいて、DOMのノードにどのルールを適用するか決定し、スタイルを適用する。
   この中間ステップはレンダーツリーと呼ばれます。
5. レンダーツリーを、ルール適用後の構造にレイアウトする。
6. ページを画面に表示する（この段階をペイントと呼ぶ）。

以下は上述の簡単な例です。

![rendering](https://mdn.mozillademos.org/files/11781/rendering.svg)

## DOMについて

DOMにはツリーのような構造があります。マークアップの各要素、属性、およびテキストは、ツリー構造の [DOMノード](https://developer.mozilla.org/ja/docs/Glossary/Node/DOM) になります。ノードは他の DOM ノードとの関係によって定義されます。要素は子ノードの親であり、子ノードには兄弟があります。

DOM は CSS とドキュメントのコンテンツが出会う場所であるため、DOM を理解すると CSS の設計、デバッグ、および保守に役立ちます。ブラウザーの開発者ツールによって、どのルールが適用されるかを確認するために、アイテムを選択することで DOM にナビゲートされます。

## 実際のDOM

簡単なHTMLコード

```html
<p>
  Let's use:
  <span>Cascading</span>
  <span>Style</span>
  <span>Sheets</span>
</p>
```

上記のHTMLコードを元にDOMへ変換した例

```dom
P
├─ "Let's use:"
├─ SPAN
|  └─ "Cascading"
├─ SPAN
|  └─ "Style"
└─ SPAN
   └─ "Sheets"
```

ブラウザは上述のHTMLをこのように解釈し、DOMツリーを以下のようにレンダリングし出力します。

## DOMにCSSを適用させる

上述のHTMLコードにスタイルを設定します。

```css
span {
  border: 1px solid black;
  background-color: lime;
}
```

ブラウザはHTML解析によってDOMを作成したのちに、CSSを解析します。その後、HTMLコードの3つのspan要素にそのルールを適用し、最終的な視覚的表現を画面にペイントします。

## ブラウザが解釈できないCSSはどうなるのか

結論はブラウザが解釈できないCSSルールは無視して次の宣言に進みます。
この動作の良いところは、ブラウザが新しいCSSを理解しないとしてもエラーは発生しないということを理解した上で、新しいCSSを拡張機能として使用できる点です。

以下の例は、新しいブラウザは`calc`の部分を採用し、`calc`をサポートしていないブラウザは`px`の部分を採用します。

```css
.box {
  width: 500px;
  width: calc(100% - 50px);
}
```
