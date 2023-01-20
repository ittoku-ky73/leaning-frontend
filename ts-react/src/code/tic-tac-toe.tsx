import React from "react";

/** Component::Square(props)
 *  罰か丸のテキストの入った四角形のボックス
 */
type Square = {
  value: string;
  onSquareClick: () => void;
};

function Square(props: Square): JSX.Element {
  const { value, onSquareClick } = props;

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

/** Component::Board(props, state)
 *  9つのSquareを配置したゲームボード
 */
type BoardProps = {
  squares: string[];
  xIsNext: boolean; 
  onPlay: (squares: string[]) => void;
};

function Board(props: BoardProps): JSX.Element {
  const { squares, xIsNext, onPlay } = props;
  const player = (xIsNext) ? "X" : "O";
  let status = "Next Player: " + player;

  if (calculateWinner(squares)) 
    status = `Winner: ${(player === "X") ? "O" : "X"}`;
  else if (!squares.includes(""))
    status = "Game Over ...";

  const handleClick = (i: number) => {
    const nextSquares = squares.slice();

    // すでにボタンが押されていたら、勝負がついていたら
    if (calculateWinner(squares) || squares[i]) 
      return <></>;

    nextSquares[i] = (xIsNext) ? "X" : "O";
    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

/** Component::Game
 *  このゲームの管理を行う。主に値の処理を行う
 *  また、ヒストリー機能がついており、ゲームの巻き戻りができる
 */
type GameState = {
  history: string[][];  // ゲームの記録を行う
  currentMove: number;  // 現在のゲームターン
};

class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      history: [ Array(9).fill("") ],
      currentMove: 0,
    }

    this.handlePlay = this.handlePlay.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
    this.moves_map_callback = this.moves_map_callback.bind(this);
  }

  // ゲームの状況をヒストリーに追加する
  handlePlay(nextSquares: string[]) {
    const { history, currentMove} = this.state;
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    this.setState({
      history: nextHistory,
      currentMove: nextHistory.length - 1,
    });
  }

  // ゲームを巻き戻す
  jumpTo(nextMove: number) {
    this.setState({
      history: this.state.history.slice(0, nextMove + 1),
      currentMove: nextMove
    });
  }

  moves_map_callback(_: string[], move: number): JSX.Element {
    let description = (move > 0)
      ? "Go to move #" + move
      : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => this.jumpTo(move)}>{description}</button>
      </li>
    );
  }

  render(): React.ReactNode {
    const { history, currentMove } = this.state;
    const xIsNext = (currentMove % 2) === 0;
    const currentSquares: string[] = history[currentMove];
    const moves = history.map(this.moves_map_callback);

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={currentSquares} xIsNext={xIsNext} onPlay={this.handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

/** method::calculateWinner(squares)
 *  もしもボードで縦横斜めに同じテキストが並んだらTrueを返す
 */
function calculateWinner(squares: string[]): boolean {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i=0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return true;
  } 
  return false;
}

export default Game;
