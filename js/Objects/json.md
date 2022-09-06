# JSONの操作

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/JSON

このページでは、JavaScriptを使用してJSONを扱うのに必要なことや、JSONを解釈してそのデータにアクセスする方法や、JSONの作成方法について見ていきます。

JSONは、ウェブアプリケーションでデータを転送する際によく使用されます。例えば、複数のデータをサーバーからクライアントへ送信してWebページ上に表示する場合や、その逆などです。頻繁に見かけるデータ形式なので覚えておきましょう。

### JavaScript Object Notation (JSON)とは

[JSON](https://developer.mozilla.org/ja/docs/Glossary/JSON)は、JavaScriptオブジェクトの構文に従ったテキストベースのデータ形式です。[Douglas Crockford](https://en.wikipedia.org/wiki/Douglas_Crockford)によって普及されました。JSONはJavaScriptオブジェクトの構文に似ていますが、JavaScriptとは独立して扱われることがあり、多くのプログラミング言語環境にはJSONを読み取ったり、解釈したり、生成したりする機能があります。

JSONは文字列として存在します。なのでネットワークを通じてデータを転送したい場合に便利です。JSONデータにアクセスしたい時は、JavaScriptオブジェクトへ変換する必要があります。JavaScriptにはこれらを相互に変換するメソッドを持つ[JSON](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON)というグローバルなオブジェクトがあるので、変換は難しくありません。

> **Note**: 文字列をネイティブオブジェクトへ変換することを「deserialization」と呼び、ネイティブオブジェクトをネットワークを通じて転送できるように文字列へ変換することを「serialization」と言います。

JSON文字列はそれ自身をファイルとして格納することもできます。`.json`という拡張子のついたただのテキストファイルで、MIMEタイプは`application/json`です。

### JSONの構造

JSONでは通常のJavaScriptオブジェクトと同様な基本データ型（文字列、数値、配列、論理型、その他リテラル型）を扱うことができます。これにより、以下のように階層的にデータを構成することができます。

```json
{
  "squadName": "Super hero squad",
  "homeTown": "Metro City",
  "formed": 2016,
  "secretBase": "Super tower",
  "active": true,
  "members": [
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    },
    {
      "name": "Eternal Flame",
      "age": 1000000,
      "secretIdentity": "Unknown",
      "powers": [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
        "Interdimensional travel"
      ]
    }
  ]
}
```

この文字列をJavaScriptプログラムへ読み込むと、ドットや角括弧を使ってデータへアクセスすることができます。

```js
superHeroes.homeTown // "Metro City"
superHeroes['active'] // true
superHeroes['members'][1]['powers'][2] // "Damage resistance"
```

### JSONの配列

また配列をJSONとの間で変換することもできます。

```js
[
  {
    "name": "Molecule Man",
    "age": 29,
    "secretIdentity": "Dan Jukes",
    "powers": [
      "Radiation resistance",
      "Turning tiny",
      "Radiation blast"
    ]
  },
  {
    "name": "Madame Uppercut",
    "age": 39,
    "secretIdentity": "Jane Wilson",
    "powers": [
      "Million tonne punch",
      "Damage resistance",
      "Superhuman reflexes"
    ]
  }
]
```

これも有効なJSONであり、解釈したデータには配列のインデックスを指定するだけです。

```js
[0]["powers"][0] // "Radiation resistance"
[1]["name"] // "Madame Uppercut"
```

### その他の注意点

- JSONは指定されたデータ形式の純粋な文字列です。プロパティのみを含むことができ、メソッドを含むことはできません。
- JSONでは文字列とプロパティ名を二重引用符で括る必要があります。単一引用符は、JSON文字列全体を囲む以外では無効です。
- カンマやコロンが1つ抜けるだけでもJSONファイルは無効になります。利用しようとしているデータを注意して確認してください。[JSONLint](http://jsonlint.com/)のようなアプリケーションを使えば妥当性を検証できるでしょう。
- JSONは配列やオブジェクトだけでなく、JSON内部に入れることができるデータ型のデータだけでも有効なものになります。例えば、単一の文字列や数値も有効なJSONとなります。
- JavaScriptコードではプロパティを引用符で括らなくても良いですが、JSONでは引用符で括った文字列だけがプロパティとして扱われます。

#### JSONの例を操作する：アクティブラーニング

実際に、JSON形式のデータを扱って見ましょう。

**はじめに**

https://github.com/mdn/learning-area/tree/main/javascript/oojs/jsonにある、`heroes.html, style.css`をローカルにコピーする。

**JSONの取得**

JSONを取得するには、[XMLHttpRequest](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest)（XHRとも呼ばれる）というAPIを使用します。これはJavaScriptを使用してサーバーからリソース（画像、テキスト、JSON、HTMLスニペットなど）を取得するネットワークリクエストを行うことができます。つまりページ全体を再読み込みせずに、小さな部分のコンテンツを更新することができます。これによりレスポンシブなWebページを作成できますが、ここでは簡単な例のみを見ていきます。

構文は次のとおりです。

```js
// URLを変数に代入
let requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
// リクエストインスタンスを生成
let request = new XMLHttpRequest();
// リクエストを開始
request.open('GET', requestURL);
// ブラウザにデータの種類を伝える
request.responseType = 'json';
// リクエストを送信
request.send();

// サーバーからのレスポンスを待ち、それを処理する
request.addEventListener('load', function() {
  const superHeroes = request.response;
  populateHeader(superHeroes);
  showHeroes(superHeroes);
});

function populateHeader(obj) {
  // ...
}

function showHeroes(obj) {
  // ...
}
```

**ヘッダーへの値の設定**

ここでは書きません。

**ヒーロー情報カードの作成**

ここでは書きません。完成コードは[こちら](https://github.com/ittoku-ky73/leaning-frontend/blob/main/js/Objects/superheroes)にあります。

### オブジェクトとテキスト間の変換

上記の例では、XHRリクエストでJSONレスポンスを直接JavaScriptオブジェクトに変換できるようにしたため、JavaScriptオブジェクトへのアクセスはシンプルでした。

しかし、ときにはそうでないこともあります。生のJSON文字列を受け取り、それを自分自身でオブジェクトに変換する必要がある場合もあります。またJavaScriptのオブジェクトをネットワーク経由で送信したい場合、送信前にJSON（文字列）に変換する必要があります。

幸いこの2つの問題はウェブ開発では良くあることなので、ブラウザでは組み込みのJSONオブジェクトが利用でき、それには以下の2つのメソッドが備わっています。

- [parse()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)、JSON文字列を引数に取り、JavaScriptオブジェクトを返します。
- [stringify()](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)、オブジェクトを引数に取り、等価なJSON文字列を返します。

上記のコードをもとに例を見て見ましょう。これは、XHRでは生のJSON文字列を返すようにして、それを`parse()`でJavaScriptオブジェクトに変換しています。そして、`stringify()`は全く反対の動作をします。

```js
// ...
request.responseType = 'text';
// ...

request.addEventListener('load', function() {
  const superHeroesText = request.response;
  const superHeroes = JSON.parse(superHeroesText);
  // ...
});

let myObj = { name: "John", age: 20 };
JSON.stringify(myObj);
```

### まとめ

JSONは興味深い🧐いろいろなところで見ることが多いから覚えておきたいことだね😀
