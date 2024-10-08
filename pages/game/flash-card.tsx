import React, { useState, useEffect, createContext } from 'react';
import { phraseType, learningContextType } from '../../types/types';
import FlashCard from '../../components/game/flashCard/FlashCard';
import styles from '@/styles/Card.module.css';
import { getSession } from 'next-auth/react';
import { getFetchBackendURL } from '@/utils/utils-data';
import { useRouter } from 'next/router';

export const SelectedMaterial = createContext<LearningContextProps | null>(null);

interface LearningContextProps {
  topic: string;
  phrases: phraseType[];
  correctPhrases: number[];
  storeCorrectPhrases: (id: number) => void;
  resetGame: () => void;
}

interface ContentType {
  content_id: number;
  japanese_slang: string;
  english_slang: string;
  formal_version: string;
  description: string;
}

// Shuffle function to randomize the cards
const shuffleArray = (array: phraseType[]): phraseType[] => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const FlashCardPage = () => {
  const router = useRouter(); // Use the router hook
  const { userInfo: queryUserInfo } = router.query;

  const [phrases, setPhrases] = useState<phraseType[]>([]);
  const [correctPhrases, setCorrectPhrases] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [noLearnedWords, setNoLearnedWords] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Get user info
  useEffect(() => {
    if (!queryUserInfo) {
      getSession().then((session) => {
        const newGameState: any = {
          message: 'Test',
          FlashCardPage: null,
          playerName: session?.user.username || 'Player',
          playerId: session?.user.pk || 0,
        };
        setUserInfo(newGameState.playerId);
      });
    } else {
      setUserInfo(queryUserInfo);
    }
  }, []);

  // Fetch cards
  const fetchPhrases = async () => {
    if (userInfo !== null) {
      setLoading(true); // Set loading to true
      try {
        const response = await fetch(getFetchBackendURL(`/api/flash-card`, `limits=10&user-id=${userInfo}`));
        const result = await response.json();

        const data: ContentType[] = result.data || [];

        //The fetch return no data
        if (data.length === 0) setNoLearnedWords(true);

        // Transform data
        const transformedPhrases: phraseType[] = data.map((phrase) => ({
          id: phrase.content_id,
          japanese: phrase.japanese_slang,
          english: phrase.english_slang,
          description: phrase.description,
        }));

        setPhrases(shuffleArray(transformedPhrases));
        setCorrectPhrases([]);
      } catch (error) {
        console.error('Error fetching phrases:', error);
      } finally {
        setLoading(false); // Set loading to false
      }
    }
  };

  useEffect(() => {
    fetchPhrases();
  }, [userInfo]); // Add userInfo as a dependency so that it re-fetches when userInfo changes

  // Reset function
  const resetGame = () => {
    fetchPhrases(); // Re-fetch and shuffle the phrases
    // console.log(userInfo);
  };

  const storeCorrectPhrases = (id: number) => {
    setCorrectPhrases((prev) => [...prev, id]);
  };

  return (
    <SelectedMaterial.Provider
      value={{
        topic: 'General',
        phrases,
        correctPhrases,
        storeCorrectPhrases,
        resetGame,
      }}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <FlashCard loading={loading} noLearnedWords={noLearnedWords} />
      </div>
    </SelectedMaterial.Provider>
  );
};

export default FlashCardPage;
