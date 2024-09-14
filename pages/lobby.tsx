import { getSession, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LobbyType } from '@/types/game';
import styles from '@/styles/Game.module.css';
import { getFetchBackendURL } from '@/utils/utils-data';

const Lobby: React.FC = () => {
  const [lobbyName, setLobbyName] = useState<string>('');
  const [Lobbies, setLobbies] = useState<LobbyType[]>([]);
  const [error, setError] = useState<string>('');
  const [error2, setError2] = useState<string>('');
  const [selectedLobbyId, setSelectedLobbyId] = useState<number | null>(null);
  const [selectedLobbyName, setSelectedLobbyName] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>('');

  // Session and router
  const { data: session, status } = useSession({ required: true });

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchLobbies = async () => {
    const response = await fetch(getFetchBackendURL('/api/lobbies'));
    if (!response.ok) {
      throw new Error('Failed to fetch lobbies');
    }
    const data: LobbyType[] = await response.json();
    setLobbies(data);
  };

  useEffect(() => {
    fetchLobbies();
  }, []);

  useEffect(() => {
    getSession().then((session) => {
      // Extract user info and save the user id
      setUserInfo(session?.user.pk);
    });
  }, []);

  const handleCreateLobby = async () => {
    if (!lobbyName) {
      setError('Field is required.');
      return;
    }

    try {
      const response = await fetch(getFetchBackendURL('/api/lobbies/create'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner: userInfo,
          game_type: 1,
          name: lobbyName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create a lobby: ${errorData.message || 'Unknown error'}`);
      }

      await fetchLobbies();
      setLobbyName('');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleLobbieClick = (game_id: number, name: string) => {
    setSelectedLobbyId(game_id);
    setSelectedLobbyName(name);
    console.log('Selected Lobby ID:', game_id);
    console.log('Selected Lobby Name:', name);
  };

  const handleJoinButton = () => {
    if (selectedLobbyId === null) {
      setError2('Select a Lobby');
    }
  };

  return (
    <>
      <div className="relative p-6 w-webkit-fill-available">
        <h2 className="text-2xl font-bold mb-4 ">Lobbies</h2>
        <p className="mb-10">
          Select an existing Lobby from the list below, or click &quot;Create Lobby&quot; to Open a Lobby.
        </p>
        <div className="w-90% mt-4 px-4 py-2 mb-2 bg-[#43346dff] text-white rounded text-center">
          Enter the name of your lobby
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="  Add Name"
            value={lobbyName}
            onChange={(e) => setLobbyName(e.target.value)}
            className="w-full py-2 border rounded "
          />
          {error && <p className="text-red-600">{error}</p>}
          <div className="flex gap-6">
            <button
              onClick={handleCreateLobby}
              className="w-3/6 px-4 py-2 bg-[#4e92b2] text-white rounded hover:bg-[#11dfd9ff]"
            >
              Create
            </button>
            <button
              onClick={fetchLobbies}
              className="w-3/6 px-4 py-2 bg-[#4e92b2] text-white rounded hover:bg-[#11dfd9ff]"
            >
              Refresh
            </button>
          </div>
        </div>
        <div className="my-4">
          <ul className="list-disc pl-5 mt-10">
            {Lobbies.map((lobby, index) => (
              <li
                key={index}
                className={`py-2 cursor-pointer hover:bg-blue-100 ${selectedLobbyId === lobby.game_id ? 'bg-blue-00' : ''}`}
                onClick={() => handleLobbieClick(lobby.game_id, lobby.name)}
              >
                {lobby.name}
              </li>
            ))}
          </ul>
        </div>
        {selectedLobbyId === null ? (
          <button
            onClick={handleJoinButton}
            className="w-full py-2 bg-[#11dfd9ff] text-white rounded hover:bg-[var(--magenta)]"
          >
            Join
            {error2 && <p className="text-[#f3308cff]">{error2}</p>}
          </button>
        ) : (
          <Link href={`game/find-pair?game_id=${selectedLobbyId}&name=${selectedLobbyName}`} className="mt-4">
            <button className="w-full py-2 bg-[#11dfd9ff] text-white rounded hover:bg-[var(--magenta)]">Join</button>
          </Link>
        )}
      </div>
    </>
  );
};

export default Lobby;
