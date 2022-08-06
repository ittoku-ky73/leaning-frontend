# JavaScriptのトラブルシューティング

> 参考：https://developer.mozilla.org/ja/docs/Learn/JavaScript/First_steps/What_went_wrong

このページでは、JavaScriptのエラーを見つけて直す方法について見ていきます。

### エラーの種類

コードに誤りがある場合、一般的に2つのどちらかが問題である場合が多いです。

**構文エラー**

プログラムが全く動かなかったり、途中で止まったりするような記述エラー。エラーメッセージが出力される。エラーメッセージの内容が分かれば、無理なく修正が可能。

**論理エラー**

書き方は正しいが、意図した通りに動かないエラー。エラーメッセージは出力されない。エラーが表示されないので修正が困難。プログラムは動く。

### 誤りの例

飛ばす。

### 構文エラーを修正する

ブラウザの開発者ツールのJavaScriptコンソールは、コードに構文エラーがあれば、エラ〜メッセージを出力してくれるので、修正するときに便利。

### 論理エラー

飛ばす。

### ロジックを修正する

飛ばす。

### その他のよくあるエラー

**SyntaxError: missing ; before statement**

このエラーは、コード行のどこかの末尾にセミコロンがないことを意味しています。

**SyntaxError: missing ) after argument list**

このエラーは、関数やメソッドの呼び出しで閉じ括弧を忘れたことを表しています。

**SyntaxError: missing : after property id**

このエラーは、JavaScriptのオブジェクトの書き方が正しくない場合に出てきます。

**SyntaxError: missing } after function body**

このエラーは、関数や条件ブロックの閉じ括弧が抜けていると出てきます。

**SyntaxError: expected expression, got 'string' or SyntaxError: unterminated string literal**

これらのエラーは、文字列の初めか終わりの引用符が抜けていると出てきます。

### 関連情報

- [JavaScript エラーリファレンス](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Errors)
- エラーリファレンスを読んでもまだわからない場合は、助けを求めましょう！
