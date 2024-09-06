import { useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";
import { useGameState } from "./GameStateProvider";

export default function GameQuickAnswer() {
  const socket = useSocket();
  const gameState = useGameState();

  const [useResponse, setResponse] = useState("No answer");

  useEffect(() => {
    console.log("gamestate ", gameState, ".");
  }, [gameState]);

  const sendMessage = () => {
    if (socket) {
      // Invia un messaggio al server
      socket.emit("message", "Hello from GameQuickAnswer");
    }
  };

  return (
    <>
      <p>Game QuickAnswer</p>
      <p>LOL2</p>
      <button onClick={sendMessage}>Send Message</button>
      <p>Response: {useResponse}</p>
    </>
  );
}
