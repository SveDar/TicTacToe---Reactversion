import React, { useEffect, useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import Square from "./Square";
import { Patterns } from "../WinningPatterns";
function Board({ result, setResult }) { // component that allows a user to choose a square on the board
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [turn, setTurn] = useState("X");

  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  useEffect(() => { // checks if there is a tie
    checkIfTie();
    checkWin();
  }, [board]);
  const chooseSquare = async (square) => {  // function that allows a user to choose a square on the board
    if (turn === player && board[square] === "") {
      setTurn(player === "X" ? "O" : "X");

      await channel.sendEvent({ // sends an event to the server
        type: "game-move",
        data: { square, player },
      });
      setBoard( // updates the board
        board.map((val, idx) => { //map through the board
          if (idx === square && val === "") {
            return player;
          }
          return val;
        })
      );
    }
  };

  const checkWin = () => {  // checks if there is a winning pattern
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: board[currPattern[0]], state: "won" });
      }
    });
  };

  const checkIfTie = () => {   //Checks if the board is full and sets the result to a tie if it is.
    let filled = true;
    board.forEach((square) => { // for each square in the board, if the square is empty, the board is not filled
      if (square == "") {
        filled = false;
      }
    });

    if (filled) { // if the board is filled, set the result to tie
      setResult({ winner: "none", state: "tie" });
    }
  };

  channel.on((event) => { // when a move is made, update the board
    if (event.type == "game-move" && event.user.id !== client.userID) {
      const currentPlayer = event.data.player === "X" ? "O" : "X";
      setPlayer(currentPlayer);
      setTurn(currentPlayer);
      setBoard(
        board.map((val, idx) => { //map the board to update the square that was clicked
          if (idx === event.data.square && val === "") {
            return event.data.player;
          }
          return val;
        })
      );
    }
  });

  return (
    <div className="board">
      <div className="row">
        <Square
          val={board[0]}
          chooseSquare={() => {
            chooseSquare(0);
          }}
        />
        <Square
          val={board[1]}
          chooseSquare={() => {
            chooseSquare(1);
          }}
        />
        <Square
          val={board[2]}
          chooseSquare={() => {
            chooseSquare(2);
          }}
        />
      </div>
      <div className="row">
        <Square
          val={board[3]}
          chooseSquare={() => {
            chooseSquare(3);
          }}
        />
        <Square
          val={board[4]}
          chooseSquare={() => {
            chooseSquare(4);
          }}
        />
        <Square
          val={board[5]}
          chooseSquare={() => {
            chooseSquare(5);
          }}
        />
      </div>
      <div className="row">
        <Square
          val={board[6]}
          chooseSquare={() => {
            chooseSquare(6);
          }}
        />
        <Square
          val={board[7]}
          chooseSquare={() => {
            chooseSquare(7);
          }}
        />
        <Square
          val={board[8]}
          chooseSquare={() => {
            chooseSquare(8);
          }}
        />
      </div>
    </div>
  );
}

export default Board;
