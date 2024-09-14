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
    <>
      <div className='flex justify-evenly items-center mt-11'>

        <div className='flex flex-col ml-5'>
          <h2 className='text-3xl mb-3'>Solo Learning</h2>
          <StartExpression />
          <StartFlashCard />
        </div>
        <div className='flex flex-col mr-5'>
          <h2 className='text-3xl mb-3'>Multi Play</h2>
          <StartPairGame />
          <StartQuickGame />
        </div>
      </div>
      {/* <div className='mb-10 mt-10'>
        <h1 className="text-5xl my-6 flex justify-center items-center">Select Game</h1>
      </div>
      <div className="flex flex-col justify-around bg-white md:min-h-[50vh] min-h-[80svh]">
        <div className="p-4 bg-white h-60 w-[100vw] flex justify-center items-center">{showGameTitle(gameName)}</div>
        <div className="text-center bg-white  h-7 flex justify-center items-center gap-5 mt-16">
          <button
            onClick={goLeftGame}
            className="ml-20 left-52 bg-[var(--savoy-blue)] text-white py-2 
            rounded-full transform -translate-y-1/2 top-1/2 hover:bg-[var(--tekhelet)] transition
            px-8
             text-nowrap"
          >
            {'<'} Left
          </button>

          <button
            onClick={goRightGame}
            className="mr-20 right-52 bg-[var(--savoy-blue)] text-white 
         py-2 rounded-full transform -translate-y-1/2 top-1/2 hover:bg-[var(--tekhelet)] transition
         px-8 text-nowrap
        "
          >
            Right {'>'}
          </button>
        </div>
      </div> */}

    </>
  );
};

export default SelectGame;
