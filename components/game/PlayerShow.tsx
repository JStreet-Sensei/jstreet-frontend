import { useEffect, useState } from 'react';
import { Player } from '../../types/game';

type PlayerListProps = {
  player: Player | undefined;
  isPlayerTurn: boolean;
};

/**
 * Display the player with a <li> and the score
 * @param player - Player type of object
 * @returns void
 */
export const PlayerShow = ({ player, isPlayerTurn }: PlayerListProps) => {
  return (
    <>
      <div
        className={`border-dashed border-2 px-2 text-white font-bold ${+isPlayerTurn ? ' border-red-600 ' : ' border-sky-700 '}`}
      >
        {player?.username} - {player?.score} match {isPlayerTurn}
      </div>
    </>
  );
};

export default PlayerShow;
