//User can play quick answer game.

import React, { useState, useEffect } from "react";
import GameStateProvider from "../../components/GameStateProvider";
import SocketProvider from "../../components/SocketProvider";
import GamePair from "../../components/GamePair";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const FindPair = () => {
  return (
    <div>
      <GameStateProvider>
        <SocketProvider>
          <GamePair></GamePair>
        </SocketProvider>
      </GameStateProvider>
    </div>
  );
};

export default FindPair;
