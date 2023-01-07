# コンポーネントとprops

> 参考: https://ja.reactjs.org/docs/components-and-props.html

コンポーネントは、UIを再利用できる部品に分割したものです。またJavaScriptの関数と似ており、任意の入力を受け取り、画面上に表示するReact要素を返すことができます。

## 関数、クラスコンポーネント

コンポーネントを定義するには次のように書きます。

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
```

この関数は、`props`というオブジェクトを引数として受け取り、React要素を返します。JavaScriptの関数なので、これは関数コンポーネントと呼びます。

また、コンポーネントの定義にES6クラスも使うことができます。

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

## コンポーネントのレンダー

ユーザー定義のコンポーネントは次のように使うことができます。

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const element = <Welcome name="Sara" />;
root.render(element);
```

上記のコードで何をしているのかみていきましょう。

1. `<Welcome name="Sara" />`という要素を引数として、`root.render()`を呼び出します。
2. ReactはWelcomeコンポーネントを呼び出し、そのときに`props`として、`{name:'Sara'}`を渡します。
3. Welcomeコンポーネントは出力として、`<h1>Hello, Sara</h1>`要素を返します。
4. ReactDOMは、`<h1>Hello, Sara</h1>`に一致するようにDOMを効率的に更新します。

> コンポーネント名は大文字で始めましょう。
> Reactは小文字で始まるコンポーネントをDOMタグとして扱います。

## コンポーネントを組み合わせる

コンポーネントは他のコンポーネントも参照できます。この機能をうまく使えば、コンポーネントを抽象化することができます。例として、Welcomeを何回かレンダーするAppコンポーネントを作成してみましょう。

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  )
}
```

既存のアプリにReactを統合する場合は、Buttonのような小さなコンポーネントからボトムアップで始め、徐々にビューの階層構造の頂上に向かって進めるのが良いでしょう。

## コンポーネントの抽出

コンポーネントを細かく分割してみましょう。その例として下記の、Commentコンポーネントについてみていきましょう。

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {props.date}
      </div>
    </div>
  );
}
```

Commentの引数(props)に`author: { text, date }`を受け取り、ソーシャルメディアサイトにおける1つのコメントを表します。

このコードには欠点があり、ネストが多いため読みにくく、内部の個々の部品を再利用することも困難です。
この問題を解決するため、コンポーネントを抽出してみましょう。

```jsx
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

Avatarは、自身がCommentの内側でレンダーされていることを知る必要はありません。なので`author`ではなく、`user`という一般的な名前にしています。

AvatarコンポーネントのおかげでCommentが少し読みやすくなりました。

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.user} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      ...
  );
}
```

次に、UserInfoコンポーネントを抽出しましょう。

```jsx
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.author.name}
      </div>
    </div>
  );
}
```

これによりCommentをさらにシンプルにできます。

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      ...
    </div>
  );
}
```

コンポーネントの抽出は面倒ですが、再利用できるコンポーネントを持っておくことは、アプリケーションが多くなるにつれ便利になっていきます。
経験則として、UIの一部(`Button, Panel, Avatar`など)が複数使われている場合、またUI自体が複雑(`App, FeedStory, Comment`など)である場合、抽出の有力な候補になります。

## Propsは読み取り専用

Reactは柔軟ですが、1つだけ厳格なルールがあります。それは、全てのReactコンポーネントは、自己の`props`に対して純関数のように振る舞わなければなりません。

アプリケーションのUIは動的で、時間に応じて変化するものです。次の章で`state`という新しい概念についてみていきます。
これは、Reactコンポーネントのルールを壊すことなく、時間と共にユーザーのアクション、ネットワークのレスポンスなどに反応して、出力を変更することができます。
