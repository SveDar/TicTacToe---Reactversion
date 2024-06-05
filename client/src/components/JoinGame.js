import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CustomInput";


//all of the connections would exist only in the chanel that the user is in

function JoinGame() {                 //component that allows a user to join or start a game with another user
  const [rivalUsername, setRivalUsername] = useState(""); //hook to manage the username of the rival
  const { client } = useChatContext();                     //initializes the StreamChat client
  const [channel, setChannel] = useState(null);           //initializes the channel




  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } }); 
    //query the user with the username of the rival

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    //create a channel with the username of the rival
    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel} />
        </Channel>
      ) : ( //if the channel is null, the user can join or start a game
        <div className="joinGame">
          <h4>Create Game</h4>
          <input
            placeholder="Username of rival..."
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />
          <button onClick={createChannel}> Join/Start Game</button>
        </div>
      )}
    </>
  );
}

export default JoinGame;
