import { ReactNode, useEffect, useState } from 'react';
import { Player } from '@/types/game';
import PlayerShow from '@/components/game/PlayerShow';

type PlayerListProps = {
  players: Set<Player>;
  currentPlayerUsername: string;
};

export const PlayerList = ({ currentPlayerUsername, players, ...props }: PlayerListProps) => {
  const [usePlayers, setPlayers] = useState<ReactNode>();
  const [usePlayerName, setPlayerName] = useState('');

  // Update the player list
  useEffect(() => {
    setPlayerName(currentPlayerUsername);
    if (players) {
      const newPlayersComponets: ReactNode[] = [];
      let counterKey = 0;
      players.forEach((player: Player) => {
        newPlayersComponets.push(<PlayerShow player={player} key={counterKey}></PlayerShow>);
        counterKey += 1;
      });
      setPlayers(newPlayersComponets);
    }
  }, [players, currentPlayerUsername]);

  return (
    <>
      <p>You: {usePlayerName}</p>
      {usePlayers}
    </>
  );
};

export default PlayerList;
