# 要素のレンダー

> 参考: https://ja.reactjs.org/docs/rendering-elements.html

React要素はブラウザのDOM要素とは異なり、プレーンなオブジェクトで安価に作成できます。ReactDOMはReact要素に合致するDOMを更新する作業を担当します。

> 要素のことを、コンポーネントと混同する人もいますが、要素とはコンポーネントを構成するものです。
> コンポーネントについては次の章で説明します。

## 要素をDOMとして描画する

HTMLファイルの中に以下のようなdiv要素があったとします。

```html
<div id="root"></div>
```

この中にあるもの全てがReactDOMによって管理されるので、ここではルートDOMノードと呼ぶことにします。

Reactだけで構成されたアプリケーションは通常ルートDOMノードを一つだけ持ちます。既存のアプリにReactを統合しようとしている場合は、独立したルートDOMノードを好きなだけ持つことができます。

React要素をルートDOMノードにレンダーするには、`ReactDOM.createRoot()`にDOM要素を渡し、`root.render()`にReact要素を渡します。

```jsx
const root = ReactDOM.createRoot(
  document.querySelector("#root");
);
const element = <h1>Hello World</h1>;
root.render(element);
```

## レンダーされた要素の更新

React要素はイミュータブルです。一度要素を作成すると、子要素や属性は変更できなくなります。要素は映画の中の一つのフレームのようなもので、それは特定のある時点のUIを表します。

以下の例は、秒刻みで動く時計のプログラムです。

```jsx
const root = ReactDOM.createRoot(
  document.querySelector("#root");
);

function tick() {
  const element = (
    <div>
      <h1>Hello World!</h1>
      <h2>
        It is {new Date().toLocaleTimeString()}.
      </h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);
```

大抵のReactアプリケーションは`root.render()`は一度しか呼び出しません。これはあくまで例です。

## Reactは必要な箇所のみ更新する

ReactDOMは要素とその子要素を以前のものと比較し、DOMの更新を行います。そのため、上記の例を実行してもページ全体を更新するプログラムでも、内容が変更されたテキストノードのみがReactDOMにより更新されます。

これはReactが、時間の経過によるUIの変更よりも、任意の時点においてUIがどのように見えるのかを優先して考えているからで、これによってあらゆる類のバグを排除することができます。
