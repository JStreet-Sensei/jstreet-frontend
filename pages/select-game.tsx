import React from 'react';
import StartExpression from '@/components/game/newWords/Start';
import StartFlashCard from '@/components/game/flashCard/Start';
import StartPairGame from '@/components/game/findPairGame/Start';
import StartQuickGame from '@/components/game/quickGame/Start';

const SelectGame: React.FC = () => {

  return (
    <>
      <div className='flex md:flex-row flex-col justify-evenly items-center mt-11'>

        <div className='flex flex-col md:ml-5'>
          <h2 className='text-3xl mb-3'>Solo Learning</h2>
          <StartExpression />
          <StartFlashCard />
        </div>
        <div className='flex flex-col md:mr-5 gap-5 md:gap-0'>
          <h2 className='text-3xl md:mb-3 mb-0 md:mt-0 mt-5'>Multi Play</h2>
          <StartPairGame />
          <StartQuickGame />
        </div>
      </div>
    </>
  );
};

export default SelectGame;
