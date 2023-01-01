# JavaScriptプログラマのためのTypeScript

> 参考: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

TypeScriptとJavaScriptは変わった関係にあります。TypeScriptはJavaScriptの機能の上に、型システムを導入しています。
例えば、JavaScriptでは文字列や数値などのプリミティブを提供しますが、型チェックなどは行いません。それをTypeScriptではチェックします。

TypeScriptの主な利点は、コード内の予期せぬ動作を強調し、バグの可能性を低くすることです。このページでは、TypeScriptの概要、型システムについて見ていきます。

## 型推論

TypeScriptでは以下のように型を指定して使用します。

```typescript
let helloWorld: string = "Hello World";
```

これにより、JavaScriptのコードを受け入れつつ、型を持つ型システムを構築することができます。

## 型の定義

JavaScriptでは、様々なデザインパターンを利用することができます。しかしデザインパターンによっては型推論が難しいものがあります。例えば、動的プログラミングを用いたパターンなどです。TypeScriptではこのようなケースにも対応しています。

```typescript
interface User {
  name: string;
  id: number;
};

const user: User = {
  name: "Hayes",
  id: 0,
};
```

上記では、`interface`キーワードを使って、Userインターフェースを作成しています。使用する時は、変数名の後に型を指定します。
また提供したインターフェースと一致しないオブジェクトを使用した場合TypeScriptは警告を発します。

JavaScriptはクラスとオブジェクト指向プログラミングをサポートしています。TypeScriptでもクラスと一緒にインターフェース宣言を使うことができます。

```typescript
interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);
```

また関数へのパラメータや戻り値にも型を指定できます。

```typescript
function getAdminUser(): User {
  // ...
}

function deleteUser(user: User) {
  // ...
}
```

JavaScriptには、`boolean, bigint, null, number, string, symbol, undefined`などの、プリミティブ型があります。TypeScriptではこれに、`any, unknown, never, void`を追加しています。

## 型の組み合わせ

TypeScriptでは、単純な型を組み合わせて複雑な型を作ることができます。

**Unions**

ユニオンは、ある型がいずれかの型であることを宣言することができます。例えば、`boolean`型は`true, false`のどちらかであると宣言できます。

```typescript
type MyBool = true | false
```

ユニオン型の使用例として、ある値が許される文字列や数値のリテラルのセットを記述することがあります。

```typescript
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
```

ユニオンは、関数にも使用できます。

```typescript
function getLength(obj: string | string[]) {
  return obj.length;
}
```

変数の型を知りたい時は、`typeof`を使います。

| Type      | Predicate                        |
| --------- | -------------------------------- |
| string    | typeof s === "string"            |
| number    | typeof n === "number"            |
| boolean   | typeof b === "boolean"           |
| undefined | typeof undefined === "undefined" |
| function  | typeof f === "function"          |
| array     | Array.isArray(a)                 |

以下の例では、関数が文字列と配列のどちらが渡されたかによって、異なる値を返しています。

```typescript
function wrapInArray(obj: string | string[]) {
  if (typeof obj === "string") {
    return [obj];
  }
  return obj;
}
```

**Generics**

ジェネリックスは、型に変数を提供します。一般的には配列が挙げられます。ジェネリクスのない配列には、なんでも入れることができます。

```typescript
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```

以下の例はジェネリクスを使用して独自の型を宣言しています。

```typescript
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

declare const backpack: Backpack<string>;

const object = backpack.get();

backpack.add(23); // error
```

## 構造体の型システム

TypeScriptの基本原則の1つに、値の持つ形状に着目した型チェックがあります。これはダックタイピング、構造的型付けと呼ばれます。これは2つのオブジェクトが同じ形であれば、同じ型とみなされます。

```typescript
interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

const point = { x: 12, y: 26 };
logPoint(point);
```

`point`変数はPoint型であると宣言されていません。TypeScriptは型チェックで`point`の形状を自動で比較してくれるのでエラーになりません。

```typescript
const point3 = { x: 12, y: 34, z: 56 };
const rect   = { x: 12, y: 34, width: 56, height: 78 };
const color  = { hex: "#123456" };

logPoint(point3);  // Ok
logPoint(rect);    // Ok
logPoint(color);   // Error!!!
```

クラスでも同様に動作します。

```typescript
class VirtualPoint {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const newVPoint = new VirtualPoint(12, 34);
logPoint(newVPoint);  // Ok
```

次は、TypeScriptの基本を学んでいきます。
