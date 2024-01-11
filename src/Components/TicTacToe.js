import React, { useState, useEffect, useCallback } from "react";
import "./TicTacToe.css";
import Square from "./Square";
import { calculateWinner, getWinnerIndex } from "../utils/calculateWinner";

const style = {
  border: "4px solid darkblue",
  borderRadius: "10px",
  width: "250px",
  height: "250px",
  margin: "0 auto",
  display: "grid",
  gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
};

const TicTacToe = ({ my }) => {
  const [gameState, setGameState] = useState({
    activePlayer: "M",
    board: [null, null, null, null, null, null, null, null, null],
  });
  const [idxs, setIdxs] = useState([null, null, null]);

  const [winnerFound, setWinnerFound] = useState(false);

  useEffect(() => {
    const winner = calculateWinner(gameState.board);
    if (winner !== null) {
      setWinnerFound(winner);
      return;
    }
    if (winnerFound === false && gameState.activePlayer === "C") {
      handlePostRequest().then((res) => {
        setGameState((prev) => ({
          activePlayer: "M",
          board: prev.board.map((val, i) =>
            i === res ? (my == "X" ? "O" : "X") : val
          ),
        }));
      });
    }
  }, [gameState.activePlayer]);

  useEffect(() => {
    if (winnerFound) {
      const temp = getWinnerIndex(gameState.board);
      setIdxs(temp);
    }
  }, [winnerFound]);

  const handlePostRequest = async () => {
    try {
      const postData = gameState.board;
      const response = await fetch(
        "https://hiring-react-assignment.vercel.app/api/bot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Response data:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleSquareClick = useCallback(
    (index) => {
      //my move
      setGameState((prev) => ({
        activePlayer: prev.board[index] !== null ? "M" : "C",
        board: prev.board.map((val, i) =>
          i === index && !winnerFound
            ? prev.board[index] !== null && !winnerFound
              ? prev.board[index]
              : my
            : val
        ),
      }));
    },
    [winnerFound]
  );

  return (
    <div style={style}>
      {gameState?.board?.map((square, index) => {
        return (
          <Square
            key={index}
            value={square}
            index={index}
            onClick={handleSquareClick}
            winner={idxs?.includes(index)}
          />
        );
      })}
    </div>
  );
};

export default TicTacToe;
