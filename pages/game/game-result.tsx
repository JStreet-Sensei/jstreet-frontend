//User can see game result after one game.

import Winner from '@/components/game/findPairGame/Winner';
import ScorCircle from '@/components/game/ScoreCircle';
import { GameResultType, Player } from '@/types/game';
import { useRouter } from 'next/router';
import React, { useState, useEffect, ReactNode } from 'react';
import styles from '@/styles/GameResult.module.css';
import Draw from '@/components/game/findPairGame/Draw';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const GameResult = () => {
  // Get query arguments
  const router = useRouter();
  const { result } = router.query;

  const [useResult, setResult] = useState<GameResultType>();
  const [useResultComponets, setResultsComponents] = useState<ReactNode[]>();
  const [useWinner, setWinner] = useState<Player>();
  const [isDraw, setIsDraw] = useState<Boolean[]>([]);

  useEffect(() => {
    const resultString = result as string;
    setResult(JSON.parse(resultString));
  }, []);

  useEffect(() => {
    if (useResult) {
      const newComponets: ReactNode[] = [];
      let lastScore = 0;
      for (let i = 0; i < useResult.players.length; i++) {
        const actualPlayer = useResult.players[i];
        if (i > 0) {
          if (actualPlayer.score - useResult.players[i - 1].score === 0) {
            setIsDraw([...isDraw, true]);
          } else {
            setIsDraw([...isDraw, false]);
          }
        }
        newComponets.push(<ScorCircle player={actualPlayer} key={i}></ScorCircle>);
        if (lastScore < actualPlayer.score) {
          setWinner(actualPlayer);
          lastScore = actualPlayer.score;
        }
      }
      setResultsComponents(newComponets);
      console.log('isDraw', isDraw);
      console.log('isDraw every', isDraw.every(Boolean));
    }
  }, [useResult]);
  console.log(result);
  return (
    <div className={` align-middle background-main rounded-3xl border-4 border-[#43346dff] my-5 shadow-2xl`}>
      {isDraw.every(Boolean) ? <Draw></Draw> : <Winner player={useWinner}></Winner>}
      <div className="my-5 flex items-center justify-center h-full">{useResultComponets}</div>
    </div>
  );
};

export default GameResult;
