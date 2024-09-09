import { getSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { GameState } from '../globals/types/game';
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Lobby {
  LobbieName: any;
  owner: number;
  game_id: number;
  name: any;
  owner_id?: number;
  state: any;
}

const Lobby: React.FC = () => {
  const [LobbieName, setLobbieName] = useState<string>('');
  const [Lobbies, setLobbies] = useState<Lobby[]>([]);
  const [error, setError] = useState<string>('');
  const [error2, setError2] = useState<string>('');
  const [selectedLobbyId, setSelectedLobbyId] = useState<number | null>(null);
  const [selectedLobbyName, setSelectedLobbyName] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>("");

  const fetchLobbies = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/lobbies`);
      if (!response.ok) {
        throw new Error('Failed to fetch lobbies');
      }
      const data: Lobby[] = await response.json();
      setLobbies(data);
    } catch (error) {
      console.error('Error fetching lobbies:', error);
    }
  };

  useEffect(() => {
    fetchLobbies();
  }, []);

  useEffect(() => {
    getSession().then((session) => {
      const newGameState: GameState = {
        message: "Test",
        lobby: null,
        playerName: session?.user.username || "Player",
        playerId: session?.user.pk || 0,
      };
      setUserInfo(newGameState.playerId);
    });
  }, []);

  const handleCreateLobby = async () => {
    if (!LobbieName) {
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
          name: LobbieName
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to create a lobby: ${errorData.message || 'Unknown error'}`);
      }

      await fetchLobbies();
      setLobbieName("");
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
      setError2("Select a Lobby");
    }
  }

  return (
    <div className='relative p-6'>
      <h2 className='text-2xl font-bold mb-4'>Lobbies</h2>
      <p className='mb-6'>
        Select an existing Lobby from the list below, or click "Create Lobby"
        to Open a Lobby.
      </p>

      <button
        className='w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded'
      >
        Enter the name of your lobby
      </button>

      <div className='space-y-4'>
        <input
          type='text'
          placeholder='Name'
          value={LobbieName}
          onChange={(e) => setLobbieName(e.target.value)}
          className='w-full px-4 py-2 border rounded'
        />
        {error && <p className='text-red-600'>{error}</p>}
        <button
          onClick={handleCreateLobby}
          className='w-full px-4 py-2 bg-green-600 text-white rounded'
        >
          Create
        </button>
      </div>
      <div className='my-4'>
        <ul className='list-disc pl-5'>
          {Lobbies.map((lobby, index) => (
            <li
              key={index}
              className={`py-2 cursor-pointer hover:text-blue-600 ${selectedLobbyId === lobby.game_id ? 'bg-blue-100' : ''}`}
              onClick={() => handleLobbieClick(lobby.game_id, lobby.name)}
            >
              {lobby.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedLobbyId === null 
        ? <button
            onClick={handleJoinButton}
            className='w-full px-4 py-2 bg-green-600 text-white rounded'
          >
            Join
            {error2 && <p className='text-red-600'>{error2}</p>}
          </button>
        : <Link href={`/Join-Room?game_id=${selectedLobbyId}&name=${selectedLobbyName}`} className="mt-4">
            <button
              className='w-full px-4 py-2 bg-green-600 text-white rounded'
            >
              Join
            </button>
          </Link>
      }
    </div>
  );
};

export default Lobby;
