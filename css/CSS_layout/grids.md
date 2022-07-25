# グリッド

> 参考：https://developer.mozilla.org/ja/docs/Learn/CSS/CSS_layout/Grids

このページでは、2次元レイアウトシステムであるCSSグリッドレイアウトを見ていきます。

## グリッドレイアウトとは

グリッドとは、水平方向と垂直方向のラインを集めたもので、デザイン要素を並べて表示することができます。ページ間を移動するときに要素が跳び回ったり、幅が変わったりしないようなデザインを作成するのに役立ちます。

グリッドは列（column）、行（row）、それぞれの行と列の間のギャップ（gutter）があります。

## CSSでグリッドを作成する

<iframe width="560" height="315" src="https://www.youtube.com/embed/KOvGeFUHAC0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

上記はグリッドレイアウトの基本機能について説明しています。

### グリッドを定義する

`display: grid;`でグリッドを定義します。これによりコンテナの直接の子がグリッド項目になります。

よりグリッドらしく見せるには、いくつかの列を追加する必要があります。

```css
.grid {
  display: grid;
  grid-template-column: 200px 200px 200px;
}
```

### fr単位での柔軟なグリッド

fr単位を使用して範囲を決めることで柔軟にグリッドの行と列のサイズを変更することができます。下記の例は合計で4つの範囲が指定されていて、4/2, 4/1, 4/1のようにそれぞれの範囲が指定されています。

```css
.grid {
  display: grid;
  grid-template-column: 2fr 1fr 1fr;
}
```

### トラック間のギャップ

`grid-column-gap, grid-row-gap`プロパティで、列と行のギャップを設定できます。

```css
.grid {
  display: grid;
  grid-template-column: 2fr 1fr 1fr;
  grid-gap: 20px;
}
```

### トラックリストの繰り返し

反復記法を使用して、トラックリストの全部、一部を繰り返すことができます。

 ```css
 .grid {
   display: grid;
   grid-template-column: repeat(3, 1fr);
 }
 ```

### 暗黙的グリッドと明示的グリッド

`grid-template-columns, grid-template-rows`プロパティは、明示的にトラックのサイズを指定します。

`grid-auto-columns, grid-auto-rows`プロパティは、暗黙的にトラックのサイズを指定します。デフォルトでは`auto`でサイズ調整されています。

```css
.grid {
  display: grid;
  grid-template-column: repeat(3, 1fr);
  grid-auto-rows: 100px;
}
```

### minmax()関数

この関数は、トラックの最小サイズと最大サイズを設定できます。これはオーバーフローが発生しそうな場面で有効です。

```css
.grid {
  display: grid;
  grid-template-column: repeat(3, 1fr);
  grid-auto-rows: minmax(100px, auto);
}
```

### 収まる限りの多くの列

下記の例では、repeat記法を使用して`grid-template-columns`を設定し、その中にminmax()関数を使用し最小値と最大値を設定しています。

```css
.grid {
  display: grid;
  grid-template-column: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, auto);
}
```

### ラインベースの配置

グリッドは常にラインを持っており、1から始まり、文書の書字方向モード（writing Mode）に関連しています。

開始ラインと終了ラインを指定することで、これらのラインに従って物を配置できます。プロパティは次のとおりです。

- `grid-column-start, grid-column-end`、列の開始、終了ラインを指定します。
- `grid-row-start, grid-row-end`、行の開始、終了ラインを指定します。

下記は上記の一括指定プロパティです。値は開始ラインと終了ラインをスラッシュ（/）で区切ります。

- `grid-column`
- `grid-row`

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 3fr;
}

header {
  grid-column: 1 / 3;
  grid-row: 1;
}

article {
  grid-column: 2;
  grid-row: 2;
}

aside {
  grid-column: 1;
  grid-row: 2;
}

footer {
  grid-column: 1 / 3;
  grid-row: 3;
}
```

### grid-template-areasでの配置

`grid-template-areas`プロパティは、デザインのさまざまな要素に名前をつけることで、項目を配置します。名前は`grid-area`プロパティでつけることができます。

`grid-template-area`の規則は次のとおりです。

- グリッドのすべてのセルを塗りつぶす必要があります。
- 2つのセルにまたがるようにするには、名前を繰り返します。
- セルを空のままにするにはピリオド（.）を使用します。
- 領域は長方形である必要があります。
- 領域は異なる場所で繰り返すことはできません

```css
.grid {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  grid-template-columns: 1fr 3fr;
}

header {
  grid-area: header;
}

article {
  grid-area: content;
}

aside {
  grid-area: sidebar;
}

footer {
  grid-area: footer;
}
```

### CSSグリッド、グリッドフレームワーク

飛ばす。
