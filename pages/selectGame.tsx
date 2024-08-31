//User can select game.

import React, { useState, useEffect } from "react";

const gameFileNames = ["newExpression", "practice"]
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;





const SelectGame = () => {
  const [gameName, setGameName] = useState(gameFileNames[0])
  const goRightGame = () => {
    setGameName(gameFileNames[(gameFileNames.indexOf(gameName) + 1) % gameFileNames.length])
  }
  const goLeftGame = () => {
    setGameName(gameFileNames[(gameFileNames.indexOf(gameName) + gameFileNames.length - 1) % gameFileNames.length])
  }


  return (
    <>
      <button onClick={goLeftGame}>go right</button>
      <div>
        This is select game page.
        {gameName}
      </div>
      <button onClick={goRightGame}>go left</button>
    </>
  );
};

export default SelectGame;
