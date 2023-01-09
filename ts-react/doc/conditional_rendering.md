# 条件付きレンダリング

> 参考: https://en.reactjs.org/docs/conditional-rendering.html

Reactでは、必要な動作をカプセル化するコンポーネントを作成できます。

Reactの条件付きレンダリングは、JavaScriptの条件と同じように動作します。条件式は現在の状態を表す要素を作成し、Reactがそれに合わせてUIを更新したいときなどに使います。

```javascript
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;

  return (isLoggedIn) ? <UserGreeting /> : <GuestGreeting />;
```

## 要素の変数

変数を使用して、要素を保存することができます。これは、コンポーネントの一部を条件付きでレンダリングし、残りは出力しないときに役立ちます。

```javascript
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

下記のコードでは、状態に応じて、`LoginButton, LogoutButton`のいずれかをレンダリングしています。

```javascript
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true })
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = (isLoggedIn) 
      ? <LogoutButton onClick={this.handleLogoutClick} />
      : <LoginButton onClick={this.handleLoginClick} />;

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
```

変数を宣言して`if`文を使用するのは、コンポーネントに条件をつけるのに良い方法ですが、コードを短く書きたい時があります。
JSXで条件をインライン化する方法をみていきましょう。

## インライン`if`と`&&`演算子

JSXでは式を埋め込むことができます。

```javascript
function Mailbox(props) {
  const unreadMessage = props.unreadMessage;

  return (
    <div>
      <h1>Hello!</h1>
      {
        unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}
```

JavaScriptでは、`true && expression`は常に`expression`と評価されるためうまくいきます。

従って条件が`true`であれば、`&&`の後ろの式が実行され、`false`であれば、`&&`の後ろの式は実行されません。

## インライン`if else`条件演算子

インラインで要素に条件をつける方法は三項演算子を使うことです。

```javascript
<div>
  {
    isLoggedIn
      ? <LogoutButton onClick={this.handleLogoutClick} />
      : <LoginButton onClick={this.handleLoginClick} />
  }
</div>
```

## コンポーネントのレンダリングを止める

まれに、コンポーネントが他のコンポーネントによってレンダリングされたにも関わらず、それ自体を隠したい場合があります。この場合、`null`を返します。

```javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">Warning!</div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning,
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? "Hide" : "Show" }
        </button>
      </div>
    )
  }
}
```

`render`メソッドから`null`を返しても、ライフサイクルメソッドの軌道には影響しません。
