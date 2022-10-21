# フォームデータの送信

> 参考：https://developer.mozilla.org/ja/docs/Learn/Forms/Sending_and_retrieving_form_data

このページでは、ユーザがフォームの送信をしたときに何が起こるか、データがどこへ行くのか、どう扱うのか、フォームデータの送信に関連するセキュリティの考慮事項などを見ていきます。

### クライアント／サーバー構成

ウェブは基本的なクライアント・サーバー構成に基づいており、次のようになっています。クライアント（ウェブブラウザ）は、サーバー（`Apache, Nginx, IIS, Tomcat`など）にHTTPプロトコルを使用してリクエストを送ります。サーバーは同じプロトコルを使用してリクエストに応答します。

![client-server](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data/client-server.png)

クライアント側（ユーザー）において、HTMLフォームはサーバーへデータを送信するHTTPリクエストを組み立てるための便利な使いやすい手段でしかありません。

### クライアント側：データ送信方法の定義

form要素で、データを送信する方法を定義します。最も重要な属性は`action, method`の2つです。

**action属性**

どこにデータを送信するかを定義します。値は妥当な相対・絶対URLでなければなりません。値がなかった場合、フォームに含まれているページのURLにデータが送信されます。

```html
<!-- 絶対URL -->
<form action="https://example.com"></form>
<!-- 相対URL -->
<form action="/somewhere_else"></form>
```

> HTTPS (Secure HTTP)プロトコルを使用してURLを指定すると、フォーム自体がHTTPでアクセスされる安全でないページで提供される場合でも、データはリクエストの残りの部分と共に暗号化されます。
>
> 一方、フォームが安全なページ提供されていても、action属性で安全でないHTTPのURLを指定すると、ブラウザはユーザに対してセキュリティの警告を表示します。これはデータが暗号化されないためです。

非ファイル型のフォームコントロールは、`name=value`ペアでサーバーに送られます。action属性の値は、サーバー側の検証を含め入力データを扱うサーバーのファイルです。サーバーは応答し、データを処理、action属性で定義されたURLを読み込み、新しいページの読み込みを引き起こします。

**method属性**

どのようにデータを送信するか定義します。HTTPプロトコルにはリクエストを実行するための方法がいくつかあります。HTMLフォームのデータはいろいろな方法で送信することができます。その中で一般的なのは`GET, POST`メソッドです。

この2つのメソッドの違いを見る前に、HTTPリクエストについて軽く触れます。HTTPリクエストは2つの部分で構成されており、ブラウザの機能に関する包括的なメタデータのセットを持つヘッダーと、指定されたリクエストをサーバーが処理するために必要な情報をもつ本文です。

*GETメソッド*

サーバーに対して指定したリソースを返すように求めるメソッドです。以下のHTMLを参考に色々みていきます。

```html
<form action="https://example.com" method="GET">
  <ul>
    <li>
      <label for="say">What greeting do you want to say?</label>
      <input type="text" name="say" id="say" value="Hi">
    </li>
    <li>
      <label for="to">Who do you want to say it to?</label>
      <input type="text" name="to" id="to" value="Mom">
    </li>
    <li>
      <button>Send my greetings</button>
    </li>
  </ul>
</form>
```

上記の構成でフォームを送信すると、`https://example.com?say=Hi&to=Mom`というURLが生成されます。URLに追加されたデータは、`name/value`ペアの連続です。URLのウェブアドレスが終了した後に`?`に続いて、`name/value`ペアがそれぞれ`&`で区切られて入ります。そしてHTTPリクエストは次のようになります。

```http
GET /?say=Hi&to=Mom HTTP/2.0
Host: example.com
```

*Postメソッド*

HTTPリクエストの本文で提供したレスポンスの要求を、ブラウザがサーバーに送信するメソッドです。このメソッドを使用してフォームを送信する場合は、データがHTTPリクエストの本文の後に追加されます。

またGETメソッドの例をもとに`method="POST"`に変更した、HTTPリクエストは次のようになります。

```http
POST / HTTP/2.0
Host: example.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 13

say=Hi&to=Mom
```

### HTTPリクエストの表示

HTTPリクエストは開発者ツールで見ることができます。chromeの場合、開発者ツール、Network、All、Nameのドメイン、Headersの順番を辿れば見ることができます。

`GET`リクエストはユーザがURLバーの中でデータを見ることができますが、`POST`リクエストはそうではありません。これには2つの理由があります。

- パスワード（機密データ）を送信する必要がある場合に、`GET`メソッドは使用してはいけません。データがURLバーに表示されるリスクがあるからです。
- 大量のデータを送信するなら、`POST`メソッドがいいでしょう。これは、URLの長さ制限のあるブラウザがあるためです。加えて多くのサーバーは受け入れるURLの長さを制限しています。

### サーバー側：データの取得

`GET, POST`のどちらのHTTPメソッドを選択してもサーバーが受け取る文字列は、`key/value`のペアのリストとして解析されます。このリストにアクセスする方法は、開発プラットフォームやフレームワークに依存します。

**PHPの例**

[PHP](https://www.php.net/)は、データにアクセスするためのグローバルオブジェクトを提供します。`POST`メソッドを使用したと仮定すると、データを取得してユーザに表示する例は以下の通りです。

```php
<?php
  $say = htmlspecialchars($_POST['say']);
  $to = htmlspecialchars($_POST['to']);

  echo $say, ' ', $to
?>
```

PHPの例は、[こちら（ソースコード）](https://github.com/ittoku-ky73/leaning-frontend/tree/main/form/PHP-post-example)にあります。

**Pythonの例**

この例は、同じこと（与えられたデータをWebページに表示）をPythonのFlaskで行います。

```python
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def form():
  return render_template('form.html')

@app.route('/hello', methods=['GET', 'POST'])
def hello():
  return render_template('greeting.html', say=request.form['say'], to=request.form['to'])

if __name__ == '__main__':
  app.run();
```

form.htmlは前の例と同じで、greeting.htmlは次のように書きます。

```html
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <title>Greeting</title>
  </head>
  <body>
    <p>{{say}}  {{to}}</p>
  </body>
</html>
```

Pythonの例は、[こちら（ソースコード）](https://github.com/ittoku-ky73/leaning-frontend/tree/main/form/Python-post-example)にあります。

### その他の言語やフレームワーク

フォームの操作に使用できるサーバー側の技術は、`Perl, Java, .Net, Ruby`などたくさんあります。好きなものを選ぶと良いでしょう。しかしそれらの技術を緑説使用することは一般的ではありません。以下のようなフォームをより簡単に扱えるようにするフレームワークを使用するのが一般的です。

- Django (Python)
- Express (Node.js)
- Laravel (PHP)
- Ruby on rails (Ruby)
- Spring Boot (Java)

### ファイル送信（特別な場合）

ファイルはHTMLフォームで特別なケースです。他のデータが全てテキストデータである中、ファイルはバイナリーデータです。HTTPはテキストのプロトコルであるため、バイナリーデータを扱うための特別な要件があります。

**enctype属性**

この属性は`Content-Type` HTTPヘッダーの値を指定できます。このヘッダーはサーバーに対して送信するデータの種類を伝えることからとても重要です。既定値は、`application/x-www-form-urlencoded`です。人間の言葉で「URL形式でエンコードされたフォームデータ」という意味です。

ファイルをそうしたい場合、2つのステップを踏む必要があります。

- ファイルの内容はURL引数に収めることができないので、`method`属性を`post`に設定する必要があります。
- データは複数の部分に分かれ、それぞれのファイルや文字列データがフォーム本体に含められているので、`enctype`の値を、`multipart/form-data`に設定する必要があります。
- ユーザがアップロードするファイルを選択できるように、1つ以上の`input type file`コントロールが必要です。

```html
<form action="https://www.example.com" method="post" enctype="multipart/form-data">
  <div>
    <label for="file">Choose a file</label>
    <input type="file" name="file" id="file">
  </div>
  <div>
    <button>Send the file</button>
  </div>
</form>
```

### 一般的なセキュリティへの配慮

サーバーにデータを送信するたびに、セキュリティについて考える必要があります。HTMLフォームはサーバーに対する最もよくある攻撃の入口になります。問題がHTMLフォーム自身から発生することはありません。サーバーがどのようにデータを扱うかによって発生します。

### 疑い深くあれ：ユーザーを信用するな

サーバーに来るデータはすべて確認、サニタイズする必要があります。例外はありません。

- 潜在的に危険な文字をエスケープする。注意すべき具体的な文字は、データが使用される状況や使用するサーバー基盤に大きく依存しますが、どのサーバー側言語もそのための機能を持っています。注意すべきことは、`JavaScript, SQL`コマンドといった実行可能なコードのようなキャラクターシーケンスです。
- 入力データの量を、必要なサイズまでしか受け入れないように制限する。
- アップロードされたファイルをサンドボックス化する。ファイルを別のサーバーに保管して別のサブドメイン、またはより良い方法として全く別のドメインを通してのみアクセスを許可する。

### まとめ

とりあえずフロントエンドの勉強はひと段落ついた感じかな。まだちょい残ってるけど。ひとまず勉強はここで区切って、ポートフォリオの方を進めよう😀
