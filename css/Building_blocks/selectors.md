# CSSセレクター

> 参考：https://developer.mozilla.org/ja/docs/Learn/CSS/Building_blocks/Selectors

このページとサブページでは、さまざまなセレクタのタイプについてどのように機能するかを詳しく紹介します。

**サブページはこちら**

- [要素・クラス・IDによるセレクター](https://github.com/ittoku703/leaning-frontend/blob/main/css/Building_blocks/type_class_and_id_selectors.md)

- [属性セレクター](https://github.com/ittoku703/leaning-frontend/blob/main/css/Building_blocks/attribute_selectors.md)

- [擬似クラスと擬似要素](https://github.com/ittoku703/leaning-frontend/blob/main/css/Building_blocks/pseudo-classes_and_pseudo-elements.md)

- [結合子](https://github.com/ittoku703/leaning-frontend/blob/main/css/Building_blocks/combinators.md)

## セレクターとは

CSSの最も基本的なルールとなるもので、要素やその他を選択してCSSプロパティ値を適用するHTML要素をブラウザに伝えるものです。
セレクタによって選択される要素は、選択要素（subject of the selector）と呼ばれます。

CSSのセレクタは、CSSセレクター仕様（CSS Selectors specification）で定義されています。
よく使うセレクタは確定仕様である [Level 3 Selectors specification](https://www.w3.org/TR/selectors-3/)で定義されているため、ブラウザサポートも期待できます。

## セレクタ一覧

同じCSSを使用するものが複数ある場合は、セレクタリストでまとめてルールを適用することができます。

```css
h1 {
  color: blue;
}

.special {
  color: blue;
}

/* 一緒にすることもできる */
h1, .special {
  color: blue;
}

/* 改行した方が見やすい */
h1,
.special {
  color: blue;
}
```

## セレクタの種類

**要素・クラス・IDによるセレクタ**

```css
h1 {}
.box {}
#unique {}
```

**属性によるセレクタ**

```css
a[title] {}
a[href="https://example.com"] {}
```

**擬似クラスおよび擬似要素によるセレクタ**

```css
a:hover {}
p::first-line {}
```

**結合子**

```css
article > p {}
```

## セレクタのリファレンス表

| セレクター           | 例                |
| -------------------- | ----------------- |
| 要素セレクター       | h1 {}             |
| 全称セレクター       | * {}              |
| クラスセレクター     | .box {}           |
| IDセレクター         | #unique {}        |
| 属性セレクター       | a[title] {}       |
| 擬似セレクター       | p:first-child {}  |
| 擬似クラスセレクター | p::first-child {} |
| 擬似要素セレクター   | p::first-line {}  |
| 子孫結合子           | article p {}      |
| 子結合子             | article > p {}    |
| 隣接兄弟結合子       | h1 + p            |
| 一般兄弟結合子       | h1 ~ p            |
