# 一般的なタイプ

> 参考: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

ここでは、JavaScriptコードで最もよく見る型を取り上げ、TypeScriptでどのように記述するのかをみていきます。

## string, number, boolean

JavaScriptには、`string, number, boolean, typeof`の非常によく使われるプリミティブ型があります。これらの型は次のようなものです。

- string - "Hello, world"
- number - 1234
- boolean - true, false

## Array

配列は、`[1, 2, 3]`のようなものです。配列の中には上記のプリミティブ型全てを入れることもできます。
配列には、`Array<number>`のようなものがありますが、これはジェネリクスといい、のちに説明します。

## any

`any`はTypeScriptに、型チェックをしてほしくない時に使う特別な型です。オブジェクトに使う場合が多いかも...

```typescript
let obj: any = { x: 0 };
```

**nolmplicitAnyオプション**

コンパイラフラグ`nolmplicitAny`を使うことで、`any`のあるコードをエラーにすることができます。

## 変数の型注釈

以下のように変数に型注釈を行います。

```typescript
let myName: string = "Alice";
```

ですが、上記の場合は型注釈なしで描かれる場面が多いです。

```typescript
let myName = "Alice";
```

## 関数

関数のパラメータに型注釈を付ける場合は以下のように書きます。パラメータに型を指定することで、型の不一致によるエラーを、エディタが教えてくれます。

```typescript
function greet(name: string) {
  console.log(`Hello, ${name.toUpperCase()} !!`);
}
```

戻り値に型注釈をつける場合は次のように書きます。

```typescript
function getFavoriteNumber(): number {
  return 26;
}
```

無名関数は、普通の関数とは異なり、TypeScriptが呼び出し元の型をみて、自動で型注釈をつけてくれます。
このプロセスは、コンテキスト型付けと呼ばれます。

## オブジェクトの種類

プリミティブ型を除けば、最も遭遇する可能性の高い一般的な型はオブジェクト型です。これは、ほとんど全てのプロパティを持つJavaScript値を指します。オブジェクトの型注釈は次のように書きます。

```typescript
function pointCoord(pt: { x: number, y: number }) {
  console.log("The coordinate's x value is: ", pt.x);
  console.log("The coordinate's y value is: ", pt.y);
}
pointCoord({ x: 3, y: 7});
```

また、関数のプロパティ名の後ろに`?`を書くことで、必須ではない引数を指定することもできます。

```typescript
function printName(obj: { first: string, last?: string }) {
  console.log(obj.last?.toUpperCase());
}
printName({ first: 'ittoku' });
printName({ first: 'ittoku', last: 'neo' });
```

## ユニオンの種類

`union`型は、2つ以上の他の型から形成された型で、これらのいずれかの型であると定義します。以下のように書きます。

```typescript
function printId(id: number | string) {
  console.log("Your ID is:", id);
}
printId(100);
printId("200");
// printId({ myID: 123456 }); // error!!!
```

`union`型は便利ですが、メソッドを使う時に少し不便なところがあります。複数の型注釈で1つの型がそのメソッドを使えない場合、エラーを吐きます。解決方法は、`typeof`演算子を使う方法です。
配列では、`isArray`メソッドを使用します。

```typescript
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpeerCase());
  } else {
    console.log(id);
  }
}

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    console.log("Hello,", x.join(" and "));
  } else {
    console.log("Welcome lone traveler", x);
  }
}
```

## 型エイリアス

上記の共用体型を複数回使用する場合、定義できた方が良いです。型エイリアスを定義するには次のように書きます。

```typescript
type Point = {
  x: number;
  y: number;
}

function printPoint(pt: Point) {
  console.log("The Point is:", pt);
}

printPoint({ x: 123, y: 456 });
```

## インターフェース

`interface`宣言は次のようにします。

```typescript
interface Point {
  x: number;
  y: number;
}

function printPoint(pt: Point) {
  console.log("The Point is:", pt);
}

printPoint({ x: 123, y: 456});
```

型エイリアスとインターフェースの違いは、型を再度開いて新しいプロパティを追加できないことと、常に拡張可能なインターフェースが異なることです。

```typescript
// interface
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}

interface Window {
  title: string;
}

interface Window {
  ts: TypeScriptAPI;
}

// type alias
type Animal = {
  name: string;
}

type Bear = Animal & {
  honey: boolean;
}

type Window = {
  title: string;
}

// error !!!
type Window {  
  ts: TypeScriptAPI;
}
```

## 型アサーション

TypeScriptが認識できない型の値はあります。`document`などがそうでしょう。この場合、型アサーションを使用して、具体的な型を指定することができます。

```typescript
const myCanvas = document.querySelector("#main_canvas") as HTMLCanvasElement;
```

## リテラル型

リテラルを共用体に結合することで、便利な概念を表現することができます。

```typescript
function printText(s: string, alignment: "left" | "center" | "right") {
  console.log(`${s} is:`, alignment);
}
printText('Hello World', "left")
// printText('Hello World', "hogebar")  // error !!1
```

**リテラル推論**

オブジェクトで変数を初期化すると、TypeScriptはそのオブジェクトのプロパティが後で値を変更する可能性があると推定します。ではプロパティを変更できないようにする方法はないのでしょうか。解決方法は2つあります。

```typescript
// 型アサーションを使用する
const counter = { num: 0 as 0, str: "zero" as "zero" };
// counter.str = "two"; // error !!!

// as constを使う
const counter = { num: 0, str: "zero" } as const;
```

## nullとundefined

JavaScriptには、nullとundefinedの存在しない値、初期化されていない値を表現する2つプリミティブ値があります。 
TypeScriptには、2つに対応する同じ名前の型があります。

**strictNullChecksオフ**

このオプションをオフにすると、nullをチェックしません。これは`C#, Java`などの言語の動作に似ています。ただバグの主な原因がnullにアクセスすることだったりするので、常にオンにすることをお勧めします。

**非nullアサーション演算子 Postfix `!`**

TypeScriptには、明示的なチェックを行わずに型から`null`を削除する特別な構文もあります。ただしこれには注意が必要です。値が`null, undefined`にならないことがわかっている場合にのみ使用しましょう。

```typescript
function liveDangerrously(x?: number | null) {
  console.log(x!.toFixed());
}
```

## 列挙型

列挙型は、TypeScriptによってJavaScriptに追加された機能であり、可能な名前付き定数のセットの1つである値を記述することができます。これはJavaScriptへの型レベルの追加ではなく、言語とランタイムに追加されたものです。
詳しくは、[列挙型のリファレンスページ](https://www.typescriptlang.org/docs/handbook/enums.html)を参照してください。

## あまり一般的でないプリミティブ

**bigint**

```typescript
const oneHundred: bigint = BigInt(100);
const anotherHundred: bigint = 100n;
```

**symbol**

```typescript
const a = Symbol("name");
const b = Symbol("name");
// if (a === b) {} // error !!!
```
