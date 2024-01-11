import React from "react";
import "./TicTacToe.css";

const Square = React.memo(({ value, onClick, index, winner }) => {
  console.log("winner component ", winner);
  const style = {
    border: "2px solid darkblue",
    fontSize: "30px",
    fontWeight: "800",
    cursor: "pointer",
    outline: "none",
    background: winner ? "red" : "lightblue",
  };
  return (
    <button style={style} onClick={() => onClick(index)}>
      {value}
    </button>
  );
});
export default Square;
