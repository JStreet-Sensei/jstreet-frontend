import { useEffect, useState } from "react";
import { Player } from "../../types/game";

type PlayerListProps = {
  player: Player | undefined;
};

/**
 * Display the player with a <li> and the score
 * @param player - Player type of object
 * @returns void
 */
export const PlayerShow = ({ player }: PlayerListProps) => {
  return (
    <>
      <li>
        {player?.username} - {player?.score}
      </li>
    </>
  );
};

export default PlayerShow;
