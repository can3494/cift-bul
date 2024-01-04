import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const symbols = ['🏜️​', '🛤️​', '🌅​', '🏞️​', '🌉​', '🏙️​', '🌆​', '🛣️​'];
  const defaultSymbol = '⚛️​'; 

  const [boxes, setBoxes] = useState([]);
  const [openedBoxes, setOpenedBoxes] = useState([]);

  useEffect(() => {
   
    const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    const newBoxes = shuffledSymbols.map((symbol, index) => ({
      id: index,
      symbol: symbol,
      isOpen: false,
      isMatched: false,
    }));
    setBoxes(newBoxes);
    setOpenedBoxes([]);
  }, []);

  const handleBoxClick = (index) => {
    const updatedBoxes = [...boxes];

    
    if (updatedBoxes[index].isOpen || updatedBoxes[index].isMatched) {
      return;
    }

    
    updatedBoxes[index].isOpen = true;
    setBoxes(updatedBoxes);

    
    const newOpenedBoxes = [...openedBoxes, updatedBoxes[index]];
    setOpenedBoxes(newOpenedBoxes);

    
    if (newOpenedBoxes.length === 2) {
      const [firstBox, secondBox] = newOpenedBoxes;

      if (firstBox.symbol !== secondBox.symbol) {
       
        setTimeout(() => {
          const updatedClosedBoxes = updatedBoxes.map((box) =>
            newOpenedBoxes.includes(box) ? { ...box, isOpen: false } : box
          );
          setBoxes(updatedClosedBoxes);
        }, 1000);
      } else {
        
        const updatedMatchedBoxes = updatedBoxes.map((box) =>
          newOpenedBoxes.includes(box) ? { ...box, isMatched: true } : box
        );
        setBoxes(updatedMatchedBoxes);
      }

     
      setOpenedBoxes([]);
    }
  };

  const handleRestartGame = () => {
 
    setOpenedBoxes([]);
    setBoxes([]);

    window.location.reload();
  };

  return (
    <div className="App">
      <div className="game-board">
        {boxes.map((box, index) => (
          <div
            key={box.id}
            className={`box ${box.isOpen || box.isMatched ? 'open' : ''}`}
            onClick={() => handleBoxClick(index)}
          >
            {box.isOpen || box.isMatched ? box.symbol : defaultSymbol}
          </div>
        ))}
      </div>
      <div className="restart-button">
        <button onClick={handleRestartGame}>Yeniden Başla</button>
      </div>
    </div>
  );
}

export default App;
