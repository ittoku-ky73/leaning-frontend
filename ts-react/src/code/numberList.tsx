function ListItem(props: { value: string }): JSX.Element {
  return <li>{props.value}</li>;
}

function NumberList(props: { numbers: number[] }): JSX.Element {
  const numbers = props.numbers;
  const listItems = numbers.map(number => 
    <ListItem key={number.toString()} value={number.toString()} />
  );

  return (
    <ul>{listItems}</ul>
  )
}

<NumberList numbers={[1, 2, 3, 4, 5]} />
