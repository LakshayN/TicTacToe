import React, { useState } from "react";
import TicTacToe from "./Components/TicTacToe";
import SymbolSelectionPage from "./Components/SymbolSelectionPage";

function App() {
  const [playerSymbol, setPlayerSymbol] = useState(null);

  const handleSymbolSelect = (symbol) => {
    setPlayerSymbol(symbol);
  };

  return (
    <div>
      {playerSymbol ? (
        <TicTacToe my={playerSymbol} setPlayerSymbol={setPlayerSymbol} />
      ) : (
        <SymbolSelectionPage onSelectSymbol={handleSymbolSelect} />
      )}
    </div>
  );
}

export default App;
