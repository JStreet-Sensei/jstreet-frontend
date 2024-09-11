import React, { useState, useEffect, createContext } from 'react';
import { phraseType, learningContextType } from '../../types/types';
import FlashCard from '../../components/game/flashCard/FlashCard';
import { getSession } from 'next-auth/react';

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


//shuffle functions to ramdom the cards
const shuffleArray = (array: phraseType[]): phraseType[] => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const FlashCardPage = () => {
  const [phrases, setPhrases] = useState<phraseType[]>([]);
  const [correctPhrases, setCorrectPhrases] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<any>("");

  //get user info
  // useEffect(() => {
  //   getSession().then((session) => {
  //     const newGameState: any = {
  //       message: "Test",
  //       FlashCardPage: null,
  //       playerName: session?.user.username || "Player",
  //       playerId: session?.user.pk || 0,
  //   };
  //     setUserInfo(newGameState.playerId);
  //  });
  // }, []);

  // Fetch cards
  const fetchPhrases = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await fetch(`http://localhost:8000/api/flash-card?limits=10&user-id=4`);
      const result = await response.json();
      console.log('API Response:', result);
      console.log(userInfo);
      

      const data: ContentType[] = result.data || [];
    
      // Transform data 
      const transformedPhrases: phraseType[] = data.map(phrase => ({
        id: phrase.content_id,
        japanese: phrase.japanese_slang,
        english: phrase.english_slang,
        description: phrase.description
      }));

      setPhrases(shuffleArray(transformedPhrases));
      setCorrectPhrases([]);
    } catch (error) {
      console.error('Error fetching phrases:', error);
    }finally {
      setLoading(false); // Set loading to false
    }
  };

  useEffect(() => {
    fetchPhrases();
  }, []);

   // Reset function
   const resetGame = () => {
    fetchPhrases(); // Re-fetch and shuffle the phrases
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
        resetGame
      }}
    >
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <FlashCard loading={loading} />
      </div>
    </SelectedMaterial.Provider>
  );
};

export default FlashCardPage;

