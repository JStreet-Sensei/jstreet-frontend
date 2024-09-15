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
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          Lobbies
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 47.41" className="h-7 ml-2">
            <g id="Layer_2" data-name="Layer 2">
              <g id="layer_1-2" data-name="layer 1">
                <path
                  className="cls-1"
                  d="M20 43.71H7a7 7 0 0 1-7-7v-26a7 7 0 0 1 7-7h17v2H7a5 5 0 0 0-5 5v26a5 5 0 0 0 5 5h13zM41 43.71H24v-2h17a5 5 0 0 0 5-5v-26a5 5 0 0 0-5-5H28v-2h13a7 7 0 0 1 7 7v26a7 7 0 0 1-7 7z"
                />
                <path
                  className="cls-1"
                  d="M20.71 9.41 19.29 8l3.3-3.29-3.3-3.3L20.71 0l4 4a1 1 0 0 1 0 1.41zM27.29 47.41l-4-4a1 1 0 0 1 0-1.41l4-4 1.42 1.41-3.3 3.3 3.3 3.29zM17 20.71c-2.76 0-5-2.69-5-6a4.68 4.68 0 0 1 5-5 4.68 4.68 0 0 1 5 5c0 3.29-2.24 6-5 6zm0-9a2.72 2.72 0 0 0-3 3c0 2.2 1.35 4 3 4s3-1.8 3-4a2.72 2.72 0 0 0-3-3zM11 33.71h2v6h-2zM16 36.71h2v3h-2zM21 33.71h2v6h-2z"
                />
                <path
                  className="cls-1"
                  d="M12 36.71h-2a3 3 0 0 1-3-3v-9.42a5 5 0 0 1 4.45-5l5.44-.61.22 2-5.44.61a3 3 0 0 0-2.67 3v9.42a1 1 0 0 0 1 1h1v-10h2v11a1 1 0 0 1-1 1z"
                />
                <path
                  className="cls-1"
                  d="M24 36.71h-2a1 1 0 0 1-1-1v-11h2v10h1a1 1 0 0 0 1-1v-9.42a3 3 0 0 0-2.67-3l-5.44-.61.22-2 5.44.61a5 5 0 0 1 4.45 5v9.42a3 3 0 0 1-3 3z"
                />
                <path
                  className="cls-1"
                  d="M12 32.71h10v2H12zM31 20.71c-2.76 0-5-2.69-5-6a4.68 4.68 0 0 1 5-5 4.68 4.68 0 0 1 5 5c0 3.29-2.24 6-5 6zm0-9a2.72 2.72 0 0 0-3 3c0 2.2 1.35 4 3 4s3-1.8 3-4a2.72 2.72 0 0 0-3-3zM30 36.71h2v3h-2zM35 33.71h2v6h-2z"
                />
                <path
                  className="cls-1"
                  d="M38 36.71h-2a1 1 0 0 1-1-1v-11h2v10h1a1 1 0 0 0 1-1v-9.42a3 3 0 0 0-2.67-3l-5.44-.61.22-2 5.44.61a5 5 0 0 1 4.45 5v9.42a3 3 0 0 1-3 3z"
                />
                <path className="cls-1" d="M28 32.71h8v2h-8z" />
              </g>
            </g>
          </svg>
        </h2>

        <p className="mb-10">
          Select an existing Lobby from the list below, or click &quot;Create Lobby&quot; to Open a Lobby.
        </p>
        <div className="w-90% mt-4 px-4 py-2 mb-2 bg-[#43346dff] text-white rounded text-center">
          Enter the name of your lobby
        </div>

        <div className="space-y-4">
          <div className="w-webkit-fill-available">
            <input
              type="text"
              placeholder="Add Name"
              value={lobbyName}
              onChange={(e) => setLobbyName(e.target.value)}
              className="w-full py-2 border rounded text-center"
            />
          </div>
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
          {Lobbies.length > 0 ? (
            <ul className="list-disc pl-5 mt-10">
              {Lobbies.map((lobby, index) => (
                <li
                  key={index}
                  className={`py-2 cursor-pointer hover:bg-blue-100 ${selectedLobbyId === lobby.game_id ? 'bg-blue-200' : ''}`}
                  onClick={() => handleLobbieClick(lobby.game_id, lobby.name)}
                >
                  {lobby.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No lobby available</p>
          )}
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
