import { useEffect, useState } from 'react';
import { useSocket } from '@/context/SocketProvider';
import { Matrix } from '@/components/game/findPairGame/Matrix';
import PlayerList from '@/components/game/PlayerList';
import { isObjectEmpty } from '@/utils/utils-data';
import { CardData, ClientGameState, Player } from '@/types/game';

type Props = {
  handleUpdateDeck: (cardDeck: CardData[]) => void;
  gameState: ClientGameState;
  players: Set<Player>;
};

export default function GamePair({
  gameState,
  handleUpdateDeck,
  players,
}: Props) {
  const { socket } = useSocket();

  const [useGameState, setGameState] = useState(gameState);
  const [usePlayerList, setPlayerList] = useState(players);

  useEffect(() => {
    setGameState(gameState);
  }, [gameState]);

  useEffect(() => {
    setPlayerList(players);
  }, [players]);

  if (isObjectEmpty(socket)) {
    console.log('The game is not ready');
    return <p>The game state and the socket is loading...</p>;
  }

  return (
    <>
      <Matrix
        handleUpdateDeck={handleUpdateDeck}
        gameState={useGameState}
      ></Matrix>
      <div className="m-5">
        <p>User_id turn: {useGameState.turn}</p>
        <p>Players</p>
        <PlayerList
          currentPlayerUsername={useGameState.username}
          players={usePlayerList}
        ></PlayerList>
      </div>
    </>
  );
}
