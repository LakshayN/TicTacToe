import React, { useState } from "react";
import "./TicTacToe.css";
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  fontWeight: "bold",
  borderRadius: "5px",
  backgroundColor: "#3498db", // You can customize the background color
  color: "#fff", // You can customize the text color
  cursor: "pointer",
  border: "none",
  outline: "none",
  transition: "background-color 0.3s ease-in-out",
  margin: "10px",
};

const SymbolSelectionPage = ({ onSelectSymbol }) => {
  const handleSymbolSelect = (symbol) => {
    onSelectSymbol(symbol);
  };

  return (
    <div className='btn-align'>
      <button style={buttonStyle} onClick={() => handleSymbolSelect("X")}>
        Select X
      </button>
      <button style={buttonStyle} onClick={() => handleSymbolSelect("O")}>
        Select O
      </button>
    </div>
  );
};

export default SymbolSelectionPage;
