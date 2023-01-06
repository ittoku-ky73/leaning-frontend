# やっはろー

> 参考: https://ja.reactjs.org/docs/hello-world.html

Reactの一番短い例はこのようになります。これは、"Hello World!"という見出しをページに表示します。

```tsx
const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLElement);
root.render(<h1>Hello, world!</h1>);
```

## このガイドの読み方

このガイドでは、Reactアプリケーションの構成部品であるReact要素やコンポーネントの使い方を見ていきます。一度覚えてしまうと、小さくて再利用可能な部品から複雑なアプリケーションを作成できるようになります。

> このガイドは、コンセプトを少しずつ学んでいきたい人向けに構成されています。

## 前提となる知識

ReactはJavaScriptライブラリなので、JavaScript言語の基本的な理解があることを想定しています。

### 始めよう！

次の章ではJSXについてみていきます。
