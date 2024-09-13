import React, { useEffect, useState } from 'react';
import StartExpression from '@/components/game/newWords/Start';
import StartFlashCard from '@/components/game/flashCard/Start';
import StartPairGame from '@/components/game/findPairGame/Start';
import StartQuickGame from '@/components/game/quickGame/Start';
import { useRouter } from 'next/router';

const gameFileNames = ['newWords', 'flashCard', 'findPairGame', 'quickGame'];

const SelectGame: React.FC = () => {
  const [gameName, setGameName] = useState(gameFileNames[0]);
  const router = useRouter()

  const goRightGame = () => {
    setGameName(gameFileNames[(gameFileNames.indexOf(gameName) + 1) % gameFileNames.length]);
  };
  const goLeftGame = () => {
    setGameName(gameFileNames[(gameFileNames.indexOf(gameName) + gameFileNames.length - 1) % gameFileNames.length]);
  };

  useEffect(() => {
    if (router.asPath.split("game-name=")[1]) {
      const fromHeader = router.asPath.split("game-name=")[1]
      if (gameFileNames.includes(fromHeader)) {
        setGameName(fromHeader)
      }
    }
  }, [])

  const showGameTitle = (gameFileName: string) => {
    switch (gameFileName) {
      case 'newWords':
        return <StartExpression />;
      case 'flashCard':
        return <StartFlashCard />;
      case 'findPairGame':
        return <StartPairGame />;
      case 'quickGame':
        return <StartQuickGame />;
      default:
        return <>Sorry, there is no game.</>;
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white">
      <button
        onClick={goLeftGame}
        className="absolute left-10 bg-[var(--savoy-blue)] text-white px-8 py-2 rounded-full transform -translate-y-1/2 top-1/2 hover:bg-[var(--tekhelet)] transition"
      >
        {'<'} Left
      </button>

      <div className="text-center bg-white">
        <h1 className="text-5xl mb-4">Select Game</h1>
        <div className="p-4 bg-white">{showGameTitle(gameName)}</div>
      </div>

      <button
        onClick={goRightGame}
        className="absolute right-10 bg-[var(--savoy-blue)] text-white px-8 py-2 rounded-full transform -translate-y-1/2 top-1/2 hover:bg-[var(--tekhelet)] transition"
      >
        Right {'>'}
      </button>

      <footer className="absolute bottom-0 w-full bg-blue-900 text-white text-center py-4"></footer>
    </div>
  );
};

export default SelectGame;
