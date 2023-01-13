import React from "react";

// 華氏から摂氏へ
function toCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * 5 / 9;
}

// 摂氏から華氏へ
function toFahrenheit(celsius: number): number {
  return (celsius * 9 / 5) + 32;
}

// 上2つの関数で変換された温度の小数点第3位まで丸めた数値を返す。
// tryConvert(100, toFahrenheit)  => "212"
function tryConvert(temperature: number, callback: (num: number) => number) {
  const output = callback(temperature);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

// 水の沸騰に関するテキストの入った要素を返す
function BoilingVerdict(props: { celsius: number }): JSX.Element {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  } else {
    return <p>The water would not boil.</p>;
  }
}

interface scaleNames {
  [key: string]: string;
}

const scaleNames: scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
}

/** TemperatureInput
 * 温度に関する制御コンポーネントを返す。
 * 温度が変更された際に、Calculatorコンポーネントにその値を渡している。つまり値の管理をCalculatorに任している。
 * ここでは、制御コンポーネントの表示と、上位コンポーネントに値を渡している。
 */
type TemperatureInputProps = {
  scale: string;
  temperature: string;
  onTemperatureChange: (num: string) => void;
};

class TemperatureInput extends React.Component<TemperatureInputProps, {}> {
  constructor(props: TemperatureInputProps) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onTemperatureChange(event.target.value);
  }

  render(): React.ReactNode {
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
    );
  }
}

/** Calculator
 * 摂氏入力コンポーネントと華氏入力コンポーネントの表示、値の制御を行っている
 * 温度の値は1つで、華氏摂氏で同期されており、どちらかの値が変更されれば、その値と同じ温度になるようにそれぞれの値は変更される
 * 華氏摂氏それぞれに、専用のハンドル、変換する関数を使用し、値を同期させている。
 * そして、与えられた温度の値に対して水の沸騰に関する要素を返す関数も定義している。
 */
type CalculatorState = {
  scale: string;
  temperature: string;
};

class Calculator extends React.Component<{}, CalculatorState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      scale: "c",
      temperature: ""
    };

    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  handleCelsiusChange(temperature: string) {
    this.setState({ scale: "c", temperature });
  }

  handleFahrenheitChange(temperature: string) {
    this.setState({ scale: "f", temperature });
  }

  render(): React.ReactNode {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = (scale === "f")
      ? tryConvert(parseFloat(temperature), toCelsius)
      : temperature;
    const fahrenheit = (scale === "c")
      ? tryConvert(parseFloat(temperature), toFahrenheit)
      : temperature;

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
        <BoilingVerdict celsius={parseFloat(celsius)}/>
      </div>
    );
  }
}

<Calculator />
