//User can play quick answer game.

import React, { useState, useEffect } from "react";
import GameQuickAnswer from "../../components/GameQuickAnswer";
import SocketProvider from "../../components/SocketProvider";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const QuickAnswer = () => {
  // 0 means no lobby_id selected
  const [useLobbySelected, setLobbySelected] = useState(0);

  return (
    <div>
      {/* <GameStateProvider> */}
      <SocketProvider>
        <GameQuickAnswer></GameQuickAnswer>
      </SocketProvider>
      {/* </GameStateProvider> */}
    </div>
  );
};

export default QuickAnswer;
