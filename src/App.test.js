import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// App Example
// const user = {
//   nameVar: 'John Doe',
//   ageVar: 42,
//   imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
// };

// const products = [
//   {title: 'Bread', amount: 2},
//   {title: 'Cheese', amount: 1},
//   {title: 'Tomatoes', amount: 3},
// ];

// const listItems = products.map((product) =>
//   <li key={product.amount}>{product.title}</li>
// );


// function MyBox() {
//   const [count, setCount] = useState(0);
//   function handleClick() {
//     setCount(count + 1);
//   }
//   return (
//     <div className="MyBox">
//       <h2>My Box</h2>
//       <p>Some text</p>
//       <MyButton count={count} onClick={handleClick}/>
//       <MyButton count={count} onClick={handleClick}/>
//     </div>
//   );
// }

// function MyButton({count, onClick}) {
//   // const [count, setCount] = useState(0);
//   // function handleClick() {
//   //   setCount(count + 1);
//   // }
//   return (
//     <button onClick={onClick} className="App-button">
//       Click me {count} times
//     </button>
//   );
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload. Did it work?
//         </p>
//         <MyBox />
//         <h1>Who are YOU<br/>{user.nameVar}, {user.ageVar}</h1>
//         <img src={user.imageUrl} alt="user" />
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//         <ul>{listItems}</ul>
//       </header>
//     </div>
//   );
// }
// export default App;

// Tic Tac Toe Tutorial

// function Square({value, onSquareClick}) {
//   return (
//     <button 
//       className="square"
//       onClick={onSquareClick}
//     >
//       {value}
//     </button>
//   );
// }

// function Board({ xIsNext, squares, onPlay }) {
//   const winner = calculateWinner(squares);
//   let status;
//   if (winner) {
//     status = 'Winner: ' + winner;
//   } else {
//     status = 'Next player: ' + (xIsNext ? 'X' : 'O');
//   }
//   function handleClick(i) {
//     if (squares[i] || calculateWinner(squares)) {
//       return;
//     }
//     const nextSquares = squares.slice();
//     if (xIsNext) {
//       nextSquares[i] = 'X';
//     } else {
//       nextSquares[i] = 'O';
//     }
//     onPlay(nextSquares);
//   }

//   return (
//   <>
//     <div className="status">{status}</div>
//     <div className="board-row">
//       <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
//       <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
//       <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
//     </div>
//     <div className="board-row">
//       <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
//       <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
//       <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
//     </div>    
//     <div className="board-row">
//       <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
//       <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
//       <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
//     </div>
//   </>
//   );
// }

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6]
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

// export default function Game() {
//   const [history, setHistory] = useState([Array(9).fill(null)]);
//   const [currentMove, setCurrentMove] = useState(0);
//   const xIsNext = currentMove % 2 === 0;
//   const currentSquares = history[currentMove];

//   function handlePlay(nextSquares) {
//     const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
//     setHistory(nextHistory);
//     setCurrentMove(nextHistory.length - 1);
//   }

//   function jumpTo(nextMove) {
//     setCurrentMove(nextMove);
//   }

//   const moves = history.map((squares, move) => {
//     let description;
//     if (move > 0) {
//       description = 'Go to move #' + move;
//     } else {
//       description = 'Go to game start';
//     }
//     return (
//       <li key={move}>
//         <button onClick={() => jumpTo(move)}>{description}</button>
//       </li>
//     );
//   });

//   return (
//     <div className="game">
//       <div className="game-board">
//         <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
//       </div>
//       <div className="game-info">
//         <div>{/* status */}</div>
//         <ol>{moves}</ol>
//       </div>
//     </div>
//   );
// }