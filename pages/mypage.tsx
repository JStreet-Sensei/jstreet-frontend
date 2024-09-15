import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { getFetchBackendURL } from '@/utils/utils-data';
import styles from '@/styles/mypage.module.css';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/';

const MyPage = () => {
  const { data: session, status } = useSession({ required: true });
  const [userData, setUserData] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [gameScores, setGameScores] = useState<any[]>([]);
  const [learningHistory, setLearningHistory] = useState<any[]>([]);
  useEffect(() => {
    if (session) {
      getGameScores();
    }
  }, [session]);
  useEffect(() => {
    if (session) {
      getLearningHistory();
    }
  }, [session]);

  const getUserDetails = async (useToken: boolean) => {
    try {
      const response = await axios({
        method: 'get',
        url: getFetchBackendURL('/api/auth/user/'),
        headers: useToken ? { Authorization: 'Bearer ' + session?.access_token } : {},
      });
      setUserData(response.data);
    } catch (error: any) {
      console.error(error.message);
    }
    setShowDetails(true);
  };

  const getGameScores = async () => {
    if (!session) {
      console.error('Session is null');
      return;
    }
    try {
      const response = await axios.get(getFetchBackendURL(`/api/scores/${session.user.pk}/`), {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      setGameScores(response.data);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const getLearningHistory = async () => {
    if (!session) {
      console.error('Session is null');
      return;
    }
    try {
      const response = await axios.get(getFetchBackendURL(`/api/words-learned/${session.user.pk}/`), {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      setLearningHistory(response.data);
    } catch (error: any) {
      console.error(error.message);
    }
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

        <div className="flex flex-col md:flex-row gap-6">
          {/* Game Score History Section */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">Game Score History</h2>
            <div className={styles.custom_scrollbar + 'flex flex-col max-h-80 overflow-y-auto'}>
              {gameScores.map((score, index) => (
                <div key={index} className="border border-gray-300 p-4 mb-4 bg-white rounded">
                  <p>
                    {/* <strong>Game:</strong> {score.game_id || 'Not provided'} */}
                    <strong>Game: Pairing Game</strong>
                  </p>
                  <p>
                    <strong>Score:</strong> {score.score || 'Not provided'}
                  </p>
                  <p>
                    <strong>Players:</strong> {score.winner_username}(Won) vs {score.loser_username}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(score.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Learning History Section */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">Learning History</h2>
            <div className={styles.custom_scrollbar + 'flex flex-col max-h-80 overflow-y-auto'}>
              {learningHistory.map((history, index) => (
                <div key={index} className="border border-gray-300 p-4 mb-4 bg-white rounded">
                  <p>
                    <strong>Expression:</strong> {history.content.japanese_slang}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <></>;
};

export default MyPage;
