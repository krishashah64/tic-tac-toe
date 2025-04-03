import './App.css';
import { useState } from 'react';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningSquares, setWinningSquares] = useState([]);

  const checkWinner = (newBoard) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        setWinningSquares(combo);
        return newBoard[a]; // Return "X" or "O" as the winner
      }
    }
    return newBoard.includes(null) ? null : "Draw"; // If board is full, it's a draw
  };

  const handleBoxClick = (index) => {
    if (board[index] || winner) return; // Prevent moves after win

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) setWinner(gameWinner);
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningSquares([]);
  };

  return (
    <div className="container">
      <h1 className="title">Tic Tac Toe</h1>

      <div className="board">
        {board.map((value, index) => (
          <div 
            key={index} 
            className={`square ${winningSquares.includes(index) ? "winner-square" : ""}`} 
            onClick={() => handleBoxClick(index)}
          >
            {value}
          </div>
        ))}
      </div>  

      {winner && (
        <div className="winner-message">
          {winner === "Draw" ? "It's a Draw! 😐" : `🎉 Winner: ${winner} 🎉`}
          <button onClick={restartGame} className="restart-button">Restart Game</button>
        </div>
      )}
    </div>
  );
}

export default App;
