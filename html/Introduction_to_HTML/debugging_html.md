# HTMLのデバッグ

> Ref: https://developer.mozilla.org/ja/docs/Learn/HTML/Introduction_to_HTML/Debugging_HTML

ここではHTML内のエラーの発見、および修正の手助けをしてくれる幾つかのツールを紹介します。

### デバッグは怖くない

![error-message](https://mdn.mozillademos.org/files/12435/error-message.png)

上記は`println!(Hello, world!");`に二重引用符がない可能性があるというエラー。

またプログラムが大きくなるにつれて、エラーメッセージも複雑になっていき、解釈しにくくなる。

### HTMLとデバッグ

HTMLはブラウザが解析して結果を表示するまで、別の形式でコンパイルされることはない。

そしてHTMLの[element](https://developer.mozilla.org/ja/docs/Glossary/Element)構文は、Rust、JavaScript、またはPythonのようなプログラミング言語よりはるかに理解しやすい。

ブラウザがHTMLを解析する方法は、プログラミング言語の実行方法よりもはるかに**寛容**です。これは良いことと悪いことの両方持っています。

#### 許容コード

主な２つのタイプのエラー

- シンタックスエラー（syntax error）
  - コード内のスペルミスでプログラムが実行されないエラー。これらは修正が簡単
- ロジックエラー（Logic error）
  - シンタックスは正しく、コードが意図しないプログラムが実行された場合のエラー。エラーメッセージが表示されないため修正が困難。

HTML自体に構文エラーはないですが、構文におかしな部分があった場合、ブラウザは関係なくそれを表示します。

### HTMLバリデーション

小さなHTML文書の場合、エラーを見つけるのは良いだが、巨大で複雑なHTML文書だとそうはいかない。

この場合、W3Cが作成、管理している [Markup Validation Service](https://validator.w3.org/)を介してHTMLページを実行すると良い。

![validator](https://mdn.mozillademos.org/files/12441/validator.png)

検証するには、Webアドレスを指定するか、HTMLファイルをアップロードするか、HTMLコードを直接入力する。

#### エラーメッセージの解釈

以前のエラーを修正すると他のエラーメッセージが消えることもある（ドミノ効果）

