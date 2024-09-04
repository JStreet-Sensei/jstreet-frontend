//User can select game.

import React, { useState } from "react";
import NewExpressionStart from "../components/game/newExpression/start";
import PracticeStart from "../components/game/practice/start";
import StartFlashCard from "../components/game/flashCard/Start";

const gameFileNames = ["newExpression", "practice", "FlashCard"]

const SelectGame = () => {
  const [gameName, setGameName] = useState(gameFileNames[0]);

  const goRightGame = () => {
    setGameName(
      gameFileNames[
        (gameFileNames.indexOf(gameName) + 1) % gameFileNames.length
      ],
    );
  };
  const goLeftGame = () => {
    setGameName(
      gameFileNames[
        (gameFileNames.indexOf(gameName) + gameFileNames.length - 1) %
          gameFileNames.length
      ],
    );
  };

  const showGameTitle = (gameFileName: string) => {
    switch (gameFileName) {
      case "newExpression":
        return <NewExpressionStart></NewExpressionStart>;
      case "practice":
        return <PracticeStart></PracticeStart>
      case "FlashCard":
        return <StartFlashCard></StartFlashCard>
      default:
        return <>Sorry, there is no game.</>;
    }
  };

  return (
    <>
      <button onClick={goLeftGame}>go right</button>
      <div>
        This is select game page.
        <br />
        {showGameTitle(gameName)}
      </div>
      <button onClick={goRightGame}>go left</button>
    </>
  );
};

export default SelectGame;
