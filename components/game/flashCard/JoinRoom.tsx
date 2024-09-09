import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Player {
  id: string;
  game_id: number;
  name: string;
}

const JoinRoom: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const router = useRouter();
  const { game_id, name } = router.query;

  const isReadyToStart = players.length >= 2;

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center p-6">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full border border-[#A4161A]">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#A4161A] mb-4">Game ID: {game_id}</h1>
          <h2 className="text-xl font-semibold mb-4">Room: {name}</h2>
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-4 text-[#A4161A]">Players in Room</h2>
          <ul>
            {players.map((player) => (
              <li key={player.id} className="text-[#A4161A] mb-2">
                {player.name}
              </li>
            ))}
          </ul>
          {players.length === 1 && (
            <p className="text-red-600 mt-4">Need at least one more player to start the game.</p>
          )}
        </div>

        <div className="text-center mb-6">
          <button
            onClick={() => {}}
            disabled={!isReadyToStart}
            className={`py-3 px-6 rounded-md shadow-md ${isReadyToStart ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400'}`}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
