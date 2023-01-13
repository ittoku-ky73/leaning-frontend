import React from "react";

type Product = {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
};

interface SearchBarInput {
  filterText: string;
  inStockOnly: boolean;
};

interface SearchBarInputAndProducts extends SearchBarInput {
  products: Product[];
};

interface SearchBarInputAndHandle extends SearchBarInput {
  onFilterTextChange: (filterText: string) => void;
  onInStockChange: (inStockOnly: boolean) => void;
};

/** ProductCategoryRow
 * 商品のカテゴリーを表示する
 */
function ProductCategoryRow(props: { category: string}): JSX.Element  {
  return (
    <tr>
      <th colSpan={2}>{props.category}</th>
    </tr>
  );
}

/** ProductRow
 * 商品の詳細（商品名と値段）を表示する
 */
function ProductRow(props: { product: Product }): JSX.Element {
  const product = props.product;
  const name = (product.stocked)
    ? product.name
    : <span style={{ color: "red" }}>{product.name}</span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

/** ProductTable
 * 商品の一覧を表示する
 * また検索に引っかかった商品の表示も行う
 */
function ProductTable(props: SearchBarInputAndProducts) {
  const { products, filterText, inStockOnly } = props;
  const rows: JSX.Element[] = [];
  let lastCategory: string = "";

  products.forEach(product => {
    // 検索フォームの値と一致する商品がなければ
    if (product.name.indexOf(filterText) === -1)
      return;
    // 検索フォームの在庫チェックが入って、かつ商品の在庫がなければ
    if (inStockOnly && !product.stocked)
      return;
    // 同じカテゴリーが続かなかったら
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
      lastCategory = product.category;
    }

    rows.push(
      <ProductRow
        product={product}
        key={product.name}
      />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

/** SearchBar
 * 商品検索フォーム
 * 商品の検索と、在庫があるかのフィルタリングを行う
 */
class SearchBar extends React.Component<SearchBarInputAndHandle, {}> {
  constructor(props: SearchBarInputAndHandle) {
    super(props);

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onFilterTextChange(event.target.value);
  }

  handleInStockChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onInStockChange(event.target.checked);
  }

  render(): React.ReactNode {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            onChange={this.handleInStockChange}
          />
          {" "}
          Only show products in stock
        </p>
      </form>
    )
  }
}

/** FilterableProductTable
 * 商品検索フォームと商品テーブルの入ったコンポーネント
 * 検索フォームの値はここで管理を行う
 */
class FilterableProductTable extends React.Component<{ products: Product[] }, SearchBarInput> {
  constructor(props: { products: Product[] }) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false,
    }

    this.onFilterTextChange = this.onFilterTextChange.bind(this);
    this.onInStockChange = this.onInStockChange.bind(this);
  }

  onFilterTextChange(filterText: string) {
    this.setState({ filterText: filterText });
  }

  onInStockChange(inStockOnly: boolean) {
    this.setState({ inStockOnly: inStockOnly });
  }

  render(): React.ReactNode {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.onFilterTextChange}
          onInStockChange={this.onInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
} 

const PRODUCTS: Product[] = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' },
];

<FilterableProductTable products={PRODUCTS}/>
