import { getSession, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LobbyType } from '@/types/game';
import styles from '@/styles/Game.module.css';

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
    try {
      const response = await fetch(`${BACKEND_URL}/api/lobbies`);
      if (!response.ok) {
        throw new Error('Failed to fetch lobbies');
      }
      const data: LobbyType[] = await response.json();
      setLobbies(data);
    } catch (error) {
      console.error('Error fetching lobbies:', error);
    }
  };

  useEffect(() => {
    fetchLobbies();
  }, [fetchLobbies]);

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
      const response = await fetch(BACKEND_URL + '/api/lobbies/create', {
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
    <div className={`${styles.pattern_bg}`}>
      <div className="relative p-6">
        <h2 className="text-2xl font-bold mb-4 text-white ">Lobbies</h2>
        <p className="mb-6 text-white ">
          Select an existing Lobby from the list below, or click &quot;Create Lobby&quot; to Open a Lobby.
        </p>
        <div className="flex items-center">
          <p className="mt-4 py-2 mx-auto text-white rounded">Enter the name of your lobby</p>

          <div className="space-y-4 mt-4 mx-auto">
            <input
              type="text"
              placeholder="Name"
              value={lobbyName}
              onChange={(e) => setLobbyName(e.target.value)}
              className="w-auto px-4 py-2 border rounded"
            />
            {error && <p className="text-red-600">{error}</p>}
            <button
              onClick={handleCreateLobby}
              className="w-full px-4 py-2 text-black font-semibold rounded background-main"
            >
              Create
            </button>
          </div>
        </div>
        <div className="my-4">
          <ul className="list-disc pl-5 text-white border-solid border-2 border-white p-2 ">
            {Lobbies.map((lobby, index) => (
              <li
                key={index}
                className={`py-2 cursor-pointer hover:secondary-color ${selectedLobbyId === lobby.game_id ? 'underline font-bold' : ''}`}
                onClick={() => handleLobbieClick(lobby.game_id, lobby.name)}
              >
                {lobby.name}
              </li>
            ))}
          </ul>
        </div>
        {selectedLobbyId === null ? (
          <button onClick={handleJoinButton} className="w-full px-4 py-2 background-main text-black rounded">
            Join
            {error2 && <p className="text-red-600">{error2}</p>}
          </button>
        ) : (
          <Link href={`game/find-pair?game_id=${selectedLobbyId}&name=${selectedLobbyName}`} className="mt-4">
            <button className="w-full px-4 py-2 background-main text-black font-semibold rounded">Join</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Lobby;
