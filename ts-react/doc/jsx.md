# JSXの導入

> 参考: https://ja.reactjs.org/docs/introducing-jsx.html

以下の変数宣言のタグ構文は文字列でもHTMLでもありません。これはJSXと呼ばれるJavaScriptの構文の拡張です。
UIがどのような見た目かを記述するために、ReactとともにJSXを使用することをお勧めします。
JSXは、テンプレート言語を連想させますが、JavaScriptの機能を全て備えたものです。

```jsx
const element = <h1>Hello, world!</h1>;
```

JSXは、React"要素"を生成します。React要素については次の章で説明します。

## JSXを使う理由

ページ表示のロジックは、イベントの応答、時間的な状態の変化、画面表示のためのデータの準備といった、他のUIロジックと本質的に結合したものであり、Reactはこれら全てをサポートしています。

マークアップとロジックを別々のファイルに書いて人為的に技術を分離するのではなく、Reactはこれら両方を含む疎結合のコンポーネントという単位を用いて関心を分離します。
コンポーネントについては、次の次のセクションで説明します。

ReactでJSXを使うことは必須ではありませんが、ほとんどの場合JavaScriptコード内でUIを扱う際に、JSXを使用します。また、JSXがあるためにReactは有用なエラーや警告をより多く表示することができます。

## JSXに式を埋め込む

以下の例で、`name`という変数を宣言して、JSX内で使用します。

```jsx
const name = 'neo ittoku';
const element = <h1>Hello, {name}</h1>;
```

JSX内では、以下のような式や関数も入れることができます。

```jsx
function formatName(user: { firstName: string, lastName: string}): string {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'ittoku',
  lastName: 'neo',
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
)
```

## JSXは式

コンパイルの後、JSXの式は普通のJavaScriptの関数呼び出しに変換され、JavaScriptオブジェクトへと評価されます。

これはJSXを`if`文や`for`ループの中で使用したり、変数に代入したり、引数として受け取ったり、関数から返したりできます。

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  } else {
    return <h1>Hello, Stranger.</h1>;
  }
}
```

## JSXで属性を指定する

文字列リテラルを属性として指定するために引用符を使用します。

```jsx
const element = <a href="https://www.reactjs.org">link</a>;
```

属性にJavaScript式を埋め込むこともできます。

```jsx
const element = <img src={user.avatarUrl}></img>;
```

> JSXはHTMLよりもJavaScriptに近いものですので、ReactDOMはHTMLの属性ではなくキャメルケースのプロパティ命名規則を使用します。
>
> 例えば、classは`className`となり、tabindexは`tabIndex`となります。

## JSXで子要素を指定する

子要素は次のように書きます。

```jsx
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
)
```

## JSXはインジェクション攻撃を防ぐ

JSXにはユーザーの入力を埋め込むことは安全です。

```jsx
const title = response.potentiallyMaliciousInput;
// This is safe:
const element <h1>{title}</h1>;
```

ReactDOMはデフォルトでJSXに埋め込まれた値をレンダー前にエスケープします。そのため自分のアプリケーションで明示的に描かれたものではないあらゆるコードは、注入できないようになっています。
レンダー前にすべての文字列が変換されるため、XSS (cross-site-scripting)攻撃の防止に役立ちます。

## JSXはオブジェクトの表現

BabelではJSXを`React.createElement()`の呼び出しに変換します。以下の2つの例は等価です。

```jsx
// jsx
const element = <h1 className="greeting">Hello, world!</h1>;

//babel
const element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!');
```

`React.createElement()`はバグの混入を防止するためにいくつかチェックを行い、最終的に以下のようなオブジェクトを生成します。

```javascript
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!',
  }
};
```

このようなオブジェクトをReact要素と呼びます。これらは画面に表示したいものの説明が気として考えることができます。
Reactはこれらのオブジェクトを読み取り、DOMを構築して最新に保ちます。

> 使っているエディタで、ES6とJSXが適切にハイライトされておくようにすることをお勧めします。

次の章では、React要素をDOMに変換することについてみていきます。
