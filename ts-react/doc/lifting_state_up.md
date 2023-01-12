# stateの引き上げ

> 参考: https://en.reactjs.org/docs/lifting-state-up.html

Reactの場合、データの変更があったときに複数のコンポーネントに反映させる必要があります。そこで、複数のコンポーネントを共有するようにします。
では、実際にどのようにするのか見ていきましょう。

以下の例では、与えられた温度に対して水が沸騰するかどうかを返す関数を書いています。

```javascript
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  } else {
    return <p>The water would not boil.</p>;
  }
}
```

次に、Calculatorというコンポーネントを作成し、これは、温度を入力する`input`要素をレンダリングし、これを上記の関数と組み合わせます。

```javascript
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ temperature: event.target.value });
  }

  render() {
    const temperature = this.state.temperature;

    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input
          type="number"
          value={temperature}
          onChange={this.handleChange}
        />
        <BoilingVerdict
          celsius={parseFloat(temperature)}
        />
      </fieldset>
    );
  }
}
```

## 2つ目のinputを追加する

次に、摂氏と華氏の入力にも対応させるようにします。

```javascript
const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: "" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;

    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input
          type="number"
          value={temperature}
          onChange={this.handleChange}
        />
      </fieldset>
    )
  }
}

class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TempratureInput scale="c" />
        <TempratureInput scale="f" />
      </div>
    )
  }
}
```

現在2つの入力がありますが、一方に温度を入力すると、もう一方は更新されません。次にそれをどうにかしていきます。

また、CalculatorからBoilingVerdictを表示することもできません。CalculatorはTemperatureInputの中に隠れているため、温度がわからないようになっています。

## 変換関数の書き方

まずは摂氏華氏のそれぞれを変換する関数を2つ書きます。

```javascript
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

次に、無効な温度は空文字列を返し、有効な温度は小数点第3位まで丸めた数値を返す関数を作成します。

```javascript
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);

  if (Number.isNaN(input)) {
    return "";
  }

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

## stateの引き上げ

現在、TemperatureInputのコンポーネントは、独立してローカル値を保持しています。

しかしながら、この2つの入力はお互いに同期している方が良いです。摂氏を更新すると華氏の入力も合わせて更新されるといった具合です。

Reactで状態を共有させるには、コンポーネントの祖先を作成することです。これは状態の引き上げと呼ばれ、ここでは、TemperatureInputからローカルの状態を削除し、Calculatorに移動させます。

計算機が共有状態になる場合、計算機は両方の入力の現在の温度の源となります。これは、互いに矛盾しない値を持つように、両方に指示することができます。

ではまず、TemperatureInputコンポーネントの`this.state.temperature`から`this.props.temperature`に変更します。

`props`は読み取り専用です。これまでのやり方では、温度を変更できません。どうすれば良いのでしょうか。

Reactでは、コンポーネントを制御されるようにすることで解決します。DOMの`input`が`value, onChange`の両方を受け入れるように、Calculatorから`temperature, onTemperatureChange`の両方を受け入れるようにします。

では、TemperatureInputの`handleChange`関数の`setState`を、`this.props.onTemperatureChange(e.target.value)`に変更しましょう。

`onTemperatureChange`は、Calculatorの`temperature`と一緒にされ、ローカルな状態を修正することで、両方の入力を新しい値で再レンダリングします。

TemperatureInputコンポーネントの変更点

- `this.state.temperature`から`this.props.temperature`に変更
- `setState()`から`this.props.onTemperatureChange()`に変更

現在の入力の温度とスケールを、ローカルな状態に保存する。これは入力から取り出した状態であり、真実の源として機能します。

```javascript
{
  temperature: 37,
  scale: "c",
},

{
  temperature: 212,
  scale: "f",
}
```

最終的に以下のようになります。

```javascript
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);

  if (Number.isNaN(input)) {
    return "";
  }

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onTemperatureChange();
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;

    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input
          type="number"
          value={temperature}
          onChange={this.handleChange}
        />
      </fieldset>
    )
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: "c",
      temperature: "",
    };

    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: "c", temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: "f", temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = (scale === "f") ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = (scale === "c") ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict
          celsius={parseFloat(celsius)}
        />
      </div>
    );
  }
}
```

これでどちらの入力フォームの値を変えても、温度が等しくなるように自動的に変更されます。

大まかに説明すると、TemperatureInputでは、入力フォームを生成し、Calculatorでは、その入力フォームの値を受け取って摂氏華氏のの変換、出力を行っています。

## まとめ

Reactで変更されるデータには、単一の真実の源があるはずです。異なるコンポーネント間で状態を同期させようとするのではなく、トップダウンのデータフローに依存するべきです。

状態を保持するコードを書くのは結構面倒ですが、その分バグの発見と切り分けにかかる労力は少なくなります。

UIに何か問題がある場合、React Developer Toolsを使って`props`を検査し、状態の更新を担当するコンポーネントを見つけ、バグの原因を突き止めることができます。
