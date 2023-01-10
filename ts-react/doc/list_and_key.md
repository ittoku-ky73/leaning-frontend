# リストとキー

> 参考: https://en.reactjs.org/docs/lists-and-keys.html

以下のコードは、`map()`関数を使用して数値の配列を受け取り、2倍にしています。

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(number => number * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]
```

Reactでも、配列を要素のリストに変換することができます。

## 複数のコンポーネントのレンダリング

以下のコードは、`map()`関数を使用して数値の配列を受け取り、数値の入った`JSX.Element`を返しています。

```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map(number => <li>{number}</li>);
const list = <ul>{listItems}</ul>;
```

## リストコンポーネントの基本

前の例をリファクタリングして、数値の配列を受け取って要素のリストを出力するコンポーネントにしてみましょう。

```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map(number => <li>{number}</li>);

  return (
    <ul>{listItems}</ul>
  )
}
```

次に、リスト項目に`key`を付けていきましょう。`key`とは、リスト要素を作成する際に含める特別な文字列属性です。

```javascript
<li key={numbers.toString()}>{number}</li>
```

## キーとは

キーは、Reactがどの項目が変更、追加、削除されたかを識別するのに役立ちます。配列内の要素にキーを付与することで、要素に安定した識別子の持たせることができます。

キーは、兄弟間の間でリスト項目を一意に識別する文字列を使うのが良いでしょう。多くの場合、IDをキーとして使用します。

レンダリングしたアイテムのIDが安定していない場合などでは、特別にアイテムのインデックスをキーとして使用することがあります。

しかし項目の順序が変わる場合、この方法はお勧めしません。これはパフォーマンスに影響を与え、コンポーネントの状態に関する問題を引き起こす可能性があります。

リスト項目に明示的なキーを割り当ない場合、Reactはデフォルトでキーにインデックスを使用します。

## キーからコンポーネントを抽出

キーは周囲の配列の文脈の中でしか意味を持ちません。例えば、コンポーネントを抽出する場合、`li`要素ではなく、`ListItem`要素にキーを持たせる必要があります。

```javascript
function ListItem(props) {
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map(number => 
    <ListItem key={number.toString()} value={number} />
  );

  return <ul>{listItems}</ul>;
}
```

経験則から、`map`呼び出しの中の要素にキーは必要です。

## キーのルール

配列内で使用されるキーは、兄弟間で一意でなければなりません。しかし、グローバルに一致である必要はありません。2つの異なる配列があるときに、同じキーを使っても問題はありません。

```javascript
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map(post =>
        <li key={post.id}>{post.title}</li>
      )}
    </ul>
  );
  const content = props.posts.map(post => 
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );

  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  )
}

const posts = [
  { id: 1, title: "Hello World!", content: "Welcome to learning React!" },
  { id: 2, title: "Installation!", content: "We can install React from npm." },
];
```

キーはReactで機能はしますが、コンポーネントには渡されていません。もし同じ値をコンポーネントで使いたい場合は、`props`として明示的に渡す必要があります。

```javascript
<Post
  key={post.id}
  id={post.id}
  title={post.title}
/>
```

上記の例では、Postコンポーネントは`props.id`は読み取れますが、`props.key`は読み取れません。

## JSXに`map`を埋め込む

下記の例では、`listItems`変数の値を、JSXに埋め込んでいます。

```javascript
<ul>
  {numbers.map(number => 
    <ListItem
      key={number.toString()}
      value={number.toString()}
    />
  )}
</ul>
```

これにより、コードが読みやすくなることもありますが、読みにくくなることもあります。JavaScriptと同様、可読性を高めるために変数を抽出する価値があるかどうかは、プログラマーの腕次第です。
`map`関数のボディがネストしすぎている場合は、抽出する良いタイミングかもしれません。
