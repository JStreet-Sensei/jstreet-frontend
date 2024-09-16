import React from 'react';
import StartExpression from '@/components/game/newWords/Start';
import StartFlashCard from '@/components/game/flashCard/Start';
import StartPairGame from '@/components/game/findPairGame/Start';
import StartQuickGame from '@/components/game/quickGame/Start';

const SelectGame: React.FC = () => {
  return (
    <>
      <div className="flex md:flex-row flex-col md:justify-evenly justify-center items-center mt-12">
        <div className="flex flex-col md:ml-5 gap-5 md:gap-0">
          <h1 className="text-4xl mb-5 font-bold drop-shadow-lg">Solo Learning</h1>
          <StartExpression />
          <StartFlashCard />
        </div>
        <div className="flex flex-col md:mr-5 gap-5 md:gap-0 mt-12 md:mt-0">
          <h1 className="text-4xl mb-5 font-bold drop-shadow-lg ">Multi Play</h1>
          <StartPairGame />
          <StartQuickGame />
        </div>
      </div>
    </>
  );
};

export default SelectGame;
