import React, { useState } from "react";
import Board from "./Board";
import { Window, MessageList, MessageInput } from "stream-chat-react";  
import "./Chat.css";
function Game({ channel, setChannel }) {            
  // component that allows a user to join or start a game with another user
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);// check if all players have joined
  });
  if (!playersJoined) { // if not all players have joined, wait for them to join
    return <div> Waiting for other player to join...</div>;
  }
  return (  //if all players have joined, start the game
    <div className="gameContainer"> 
      <Board result={result} setResult={setResult} />
      <Window>
        <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]}
        />
        <MessageInput noFiles />
      </Window>
      <button
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        {" "}
        Leave Game
      </button>
      {result.state === "won" && <div> {result.winner} Won The Game</div>}
      {result.state === "tie" && <div> Game Tieds</div>}
    </div>
  );
}

export default Game;
