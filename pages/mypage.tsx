import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/';

const MyPage = () => {
  const { data: session, status } = useSession({ required: true });
  const [userData, setUserData] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock data for game scores and learning history
  const [gameScores] = useState<any[]>([
    { game: 'Quick Answer Game', score: 95, date: '2024-09-12', player1: 'username1', player2: 'username2' },
    { game: 'Pairing Game', score: 88, date: '2024-09-11', player1: 'username1', player2: 'username3' },
    { game: 'Pairing Game', score: 75, date: '2024-09-10', player1: 'username1', player2: 'username4' },
  ]);

  const [learningHistory] = useState<any[]>([
    { card: 'Card 1', date: '2024-09-09' },
    { card: 'Card 2', date: '2024-09-08' },
    { card: 'Card 3', date: '2024-09-07' },
  ]);

  const getUserDetails = async (useToken: boolean) => {
    try {
      const response = await axios({
        method: 'get',
        url: BACKEND_URL + 'api/auth/user/',
        headers: useToken ? { Authorization: 'Bearer ' + session?.access_token } : {},
      });
      setUserData(response.data);
    } catch (error: any) {
      console.error(error.message);
    }
    setShowDetails(true);
  };

  if (status == 'loading') {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <p>User ID: {session.user.pk}</p>
          <p>Username: {session.user.username}</p>
          <p>Email: {session.user.email || 'Not provided'}</p>

          <div>
            <button
              onClick={() => getUserDetails(true)}
              className="px-4 py-1 bg-[var(--magenta)] text-white rounded hover:bg-[var(--turquoise)] transition"
            >
              Show User Name
            </button>
          </div>

          {/* Show user name information only when the button is clicked */}
          {showDetails && userData && (
            <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
              <p>
                <strong>First Name:</strong> {userData.first_name || 'Not provided'}
              </p>
              <p>
                <strong>Last Name:</strong> {userData.last_name || 'Not provided'}
              </p>
            </div>
          )}
        </div>

        {/* Game Score History Section */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Game Score History</h2>
          <div className="flex flex-col max-h-80 overflow-y-auto">
            {gameScores.map((score, index) => (
              <div key={index} className="border border-gray-300 p-4 mb-4 bg-white rounded">
                <p>
                  <strong>Game:</strong> {score.game}
                </p>
                <p>
                  <strong>Score:</strong> {score.score}
                </p>
                <p>
                  <strong>Players:</strong> {score.player1} : {score.player2}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(score.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Learning History Section */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Learning History</h2>
          <div className="flex flex-col max-h-80 overflow-y-auto">
            {learningHistory.map((history, index) => (
              <div key={index} className="border border-gray-300 p-4 mb-4 bg-white rounded">
                <p>
                  <strong>Card:</strong> {history.card}
                </p>
                <p>
                  <strong>Learned on:</strong> {new Date(history.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};

export default MyPage;
