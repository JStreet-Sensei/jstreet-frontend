import { ReactNode, useEffect, useState } from 'react';
import { Player } from '@/types/game';
import PlayerShow from '@/components/game/PlayerShow';

type PlayerListProps = {
  players: Set<Player>;
  currentPlayerUsername: string;
  actualTurn: number;
};

export const PlayerList = ({ currentPlayerUsername, players, actualTurn, ...props }: PlayerListProps) => {
  const [usePlayers, setPlayers] = useState<ReactNode[]>();
  const [usePlayerName, setPlayerName] = useState('');

  // Update the player list
  useEffect(() => {
    setPlayerName(currentPlayerUsername);
    if (players) {
      const playersArray = Array.from(players); // Convert Set to Array
      const newPlayersComponets: ReactNode[] = [];
      let counterKey = 0;
      playersArray.forEach((player: Player) => {
        const playerTurn = player.user_id === actualTurn;
        newPlayersComponets.push(<PlayerShow player={player} key={counterKey} isPlayerTurn={playerTurn} />);
        counterKey += 1;
      });
      setPlayers(newPlayersComponets);
    }
  }, [players, currentPlayerUsername, actualTurn]);

  return (
    <>
      <div className="mt-2">
        <div className="mt-2 pt-5">
          <div className="float-left">{usePlayers ? usePlayers[0] : <></>}</div>
          <div className="float-right">{usePlayers ? usePlayers[1] : <></>}</div>
        </div>
        <div className="clear-both"></div>
      </div>
    </>
  );
};

export default PlayerList;
