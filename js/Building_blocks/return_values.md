# 関数の戻り値

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Building_blocks/Return_values

このページでは、戻り値についてや、その値が何であるか、どのように利用するのか、どのように関数と関係のある値に変化させるのか見ていきます。

### 戻り値とは

戻り値とは、関数の実行が完了したときに返される値です。関数によって返される値が何なのか理解し把握することは大切です。

また関数によっては何も値を返さない場合もあります。リファレンスでは`void, undefined`と記載されます。

一般的に戻り値は、関数がある種の計算をしている段階の途中で使用されます。また関数は値を計算した後に結果を返すことができるため、変数に格納することもできます。

### オリジナル関数での戻り値の使い方

カスタム関数から値を返すには`return`キーワードを使用します。

```js
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
```

#### 戻り値を返す関数を作る：アクティブラーニング

```js
const input = document.querySelector('.numberInput');
const para = document.querySelector('p');

function squared(num) {
  return num * num;
}

function cubed(num) {
  return num * num * num;
}

function factorial(num) {
  // check num
  if (num < 0) {
    return undefined;
  }
  else if (num == 0) {
    return 1;
  }

  let x = num - 1;

  while (x > 1) {
    num *= x;
    x--;
  }
  return num;
}

input.onchange = function() {
  const num = input.value;
  if (isNaN(num)) {
    para.textContent = 'You need to enter a number!';
  }
  else {
    para.textContent = `\
${num} squared is ${squared(num)}.
${num} cubed is ${cubed(num)}.
${num} factorial is ${factorial(num)}.
`
  }
}
```

### あなたの番です

```js
/*
 * 独自の関数をいくつか書いてライブラリを追加する。
 */

// 斜辺を求める
function calcHypotenuse(a, b) {
  return (Math.sqrt((a*a)+(b*b)));
}

function calcCubicRoot(n) {
  return Math.cbrt(n);
}

console.log(calcHypotenuse(3, 4)); // 5
console.log(calcCubicRoot(4*4*4)); // 4
```

### まとめ

戻り値は大事。特にC言語ではね。
