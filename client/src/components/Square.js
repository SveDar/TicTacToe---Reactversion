import React from "react";


// component that allows a user to choose a square on the board
function Square({ chooseSquare, val }) {
  // onclick couse
  return (
    <div className="square" onClick={chooseSquare}>
      {val}
    </div>
  );
}

export default Square;
