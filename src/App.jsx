import { useState } from "react";
import "./App.css";

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameOver, setGameOver] = useState("");
  const playerName = currentPlayer === "X" ? "Player 1" : "Player 2";

  function handleClick(index) {
    if (gameOver) return;
    if (board[index] !== null) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (currentPlayer === "X") {
      setCurrentPlayer("O");
    } else {
      setCurrentPlayer("X");
    }

    for (let combo of winningCombos) {
      const [a, b, c] = combo;

      if (
        newBoard[a] === newBoard[b] &&
        newBoard[b] === newBoard[c] &&
        newBoard[a] !== null
      ) {
        const winner = currentPlayer === "X" ? "Player 1" : "Player 2";
        setGameOver(`${winner} Won!`);
      }
    }

    if (newBoard.every((item) => item !== null)) {
      setGameOver("Match Draw!");
    }
  }

  function restartBtn() {
    setGameOver("");
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
  }

  return (
    <>
      <section id="center">
        {!gameOver && <p>{playerName}'s turn</p>}
        {gameOver && <p className="winner">{gameOver}</p>}
        <div id="tic-tac-toe-wrapper" className="game-grid">
          {board.map((cell, index) => (
            <div
              key={index}
              className="grid-cell"
              onClick={() => handleClick(index)}
            >
              {cell && (
                <img
                  src={cell === "X" ? "/bread.png" : "/jam.png"}
                  alt={cell}
                  className="cell-icon"
                />
              )}
            </div>
          ))}
        </div>

        <button
          id="restart-btn"
          className="restart-button"
          onClick={restartBtn}
        >
          Restart Game
        </button>
      </section>
    </>
  );
}

export default App;
