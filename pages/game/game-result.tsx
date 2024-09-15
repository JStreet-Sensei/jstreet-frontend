//User can see game result after one game.

import Winner from '@/components/game/Winner';
import ScorCircle from '@/components/game/ScoreCircle';
import { GameResultType, Player } from '@/types/game';
import { useRouter } from 'next/router';
import React, { useState, useEffect, ReactNode } from 'react';
import styles from '@/styles/GameResult.module.css';
import Draw from '@/components/game/Draw';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const GameResult = () => {
  // Get query arguments
  const router = useRouter();
  const { result } = router.query;
  let isDraw: boolean[] = [];

  const [useResult, setResult] = useState<GameResultType>();
  const [useResultComponets, setResultsComponents] = useState<ReactNode[]>();
  const [useWinner, setWinner] = useState<Player>();

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
          isDraw.push((actualPlayer.score - useResult.players[i - 1].score) === 0 ? true : false)
        }
        newComponets.push(<ScorCircle player={actualPlayer} key={i}></ScorCircle>);
        if (lastScore < actualPlayer.score) {
          setWinner(actualPlayer);
          lastScore = actualPlayer.score;
        }
      }
      setResultsComponents(newComponets);
    }
  }, [useResult]);
  console.log(result);
  return (
    <div className={`${styles.expand_until_footer} align-middle background-main`}>
      {isDraw.every(Boolean) ? <Draw></Draw> :
        <Winner player={useWinner}></Winner>
      }
      <div className="mx-auto flex items-center justify-center h-full">{useResultComponets}</div>
    </div>
  );
};

export default GameResult;
