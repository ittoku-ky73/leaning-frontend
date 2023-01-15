# JavaScriptモジュール

> 参考: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

ここでは、JavaScriptモジュール構文の使い方についてみていきます。

## モジュールに関する背景

初期のJavaScriptの使い方は、孤立したスクリプティングタスクを実行し、必要に応じてWebページにちょっとしたインタラクティビティを提供するもので、一般的に大きなスクリプトは必要ありませんでした。
それから数年が経過し、今では多くのJavaScriptを使った完全なアプリケーションがブラウザで実行され、またJavaScriptは他の文脈(Node.jsなど)でも使われています。

そのため近年、JavaScriptのプログラムを個別のモジュールに分割し、必要な時にインポートできる仕組みが欲しいと考えました。
Node.jsは長い間この機能を持っていましたし、モジュールを使用できるJavaScriptライブラリやフレームワーク(CommonJS, RequireJS, Webpack, Babelなど)はかず多くあります。

最近ではブラウザがモジュール機能をネイティブにサポートし始めたことです。ブラウザはモジュールの読み込みを最適化できるので、ライブラリを使ってクライアントサイドの余計な処理や余計なラウンドトリップをするよりも効率的なのです。

ネイティブJavaScriptモジュールは、`import, export`文に依存します。これらは以下の互換性テーブルに示されるように、ブラウザでサポートされています。

## ブラウザの互換性

> 参考: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#browser_compatibility

基本的に全ブラウザで使用できるようです。

## 事前紹介

ここで紹介する例は、`canvas`要素を作成し、`canvas`嬢にさまざまな図形を描画する簡単なモジュール群を作成していきます。

例をローカルで実行する場合は、ウェブサーバーを介して実行する必要があります。

## 基本例の構造

以下のようなファイル構造になっています。

```
project
├── index.html
├── main.js
└── modules
    ├── canvas.js
    └── square.js
```

ここから先は、参考URLを読みつつ、[ソースコード](https://github.com/mdn/js-examples/tree/master/module-examples/basic-modules)をダウンロードして進めていきます。

index.htmlを動作させるには、`http-server`をインストールして、ローカルにサーバーを立ち上げる必要があります。
