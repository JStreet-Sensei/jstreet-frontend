import { useEffect, useState } from "react";

type PlayerListProps = {
  players: string[] | undefined;
  currentPlayerUsername: string;
};

export const PlayerList = ({
  currentPlayerUsername,
  players,
  ...props
}: PlayerListProps) => {
  const [usePlayers, setPlayers] = useState(players);
  const [usePlayerName, setPlayerName] = useState("");

  useEffect(() => {
    setPlayers(players);
    setPlayerName(currentPlayerUsername);
  }, [players, currentPlayerUsername]);

  return (
    <>
      <p>You: {usePlayerName}</p>
      {usePlayers}
    </>
  );
};

export default PlayerList;
