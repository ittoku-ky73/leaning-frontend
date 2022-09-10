# 非同期アニメーション

> 参考：https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Sequencing_animations

### まず初めに

[sequencing_animations](https://github.com/mdn/learning-area/tree/main/javascript/asynchronous/sequencing-animations/start)リポジトリで次の4つのファイルをコピーしてください。

- alice.svg
- index.html
- main.js
- style.css

### プロジェクト概要

`alice.svg`をページ上に3つ配置し、順番にアニメーションを適用させます。つまり1つ目が終わったら2つ目をアニメーションし、3つ目も同様にアニメーションさせます。

アニメーションは既に定義されており、画像を回転させ、最後には消えます。

完成版は[こちら](https://mdn.github.io/learning-area/javascript/asynchronous/sequencing-animations/finished/)で確認できます。

### 手順

Web Animation APIの`elment.animate()`を使用してアニメーション化していきます。次のコードを追加します。

```js
const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360) scale(0)' }
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
};

const alice1 = document.querySelector('#alice1');
const alice2 = document.querySelector('#alice2');
const alice3 = document.querySelector('#alice3');

alice1.animate(aliceTumbling, aliceTiming);
```

### すべての画像にアニメーションを追加する

`animate()`はAnimetionオブジェクトを返します。このオブジェクトはアニメーションの再生が終了したことを知らせる`finished`プロパティがあります。それを利用して、Promiseを使ってアニメーションの開始を操作します。

ここでは3つの異なるPromiseを実装します。

- コールバック地獄バージョン
- アロー関数バージョン
- `async, await`バージョン
