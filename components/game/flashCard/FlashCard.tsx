import { useContext, useState } from 'react';
import { SelectedMaterial } from '../../../pages/game/flash-card';
import styles from '@/styles/Card.module.css';

interface FlashCardProps {
  loading: boolean; // Add loading prop
}

const FlashCard = ({ loading }: FlashCardProps) => {
  // data used in this component
  const selectedMaterial = useContext(SelectedMaterial);

  // the current card index
  const [currentIndex, setCurrentIndex] = useState(0);
  // boolean to card, if it's flip or not
  const [isBack, setIsBack] = useState(false);
  // count the correct cards
  const [correctCount, setCorrectCount] = useState(0);

  // Check if selectedMaterial is not null
  const currentPhrase = selectedMaterial ? selectedMaterial.phrases[currentIndex] : null;

  const handleCorrect = () => {
    if (currentPhrase && selectedMaterial) {
      selectedMaterial.storeCorrectPhrases(currentPhrase.id);
      setCorrectCount((prev) => prev + 1);
      goToNextCard();
    }
  };

  const handleWrong = () => {
    goToNextCard();
  };

  const goToNextCard = () => {
    if (selectedMaterial) {
      if (currentIndex < selectedMaterial.phrases.length - 1) {
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 300);
      } else {
        setCurrentIndex(0);
      }
      setIsBack(false);
    }
  };

  const handleRestart = () => {
    if (selectedMaterial) {
      setCurrentIndex(0);
      setIsBack(false);
      setCorrectCount(0);
      selectedMaterial.resetGame(); // Call the reset function from flash-card
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  if (selectedMaterial && selectedMaterial.correctPhrases.length === selectedMaterial.phrases.length) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-green-600">Congratulations!</h1>
        <p className="mt-2 text-lg text-gray-700">You&apos;ve completed all flashcards</p>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleRestart}
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center bg-white border border-gray-300 rounded-lg shadow-lg p-6">
      <div
        className={`${styles.flip_card} ${styles.flip_card_inner} ${isBack ? styles.flip : ''}`}
        onClick={() => setIsBack(!isBack)}
        style={{ width: '400px', height: '300px', cursor: 'pointer' }}
      >
        <div className={`${styles.flip_card_front} flex items-center justify-center`}>
          <p className="text-2xl font-bold text-gray-800">
            {currentPhrase?.english || 'Loading...'}
          </p>
        </div>
        <div className={`${styles.flip_card_back} flex items-center justify-center`}>
          <p className="text-xl font-semibold">
            {currentPhrase?.japanese || 'Loading...'}
            <br />
            <span className="text-sm text-gray-400">{currentPhrase?.description || ''}</span>
          </p>
        </div>
      </div>

      {isBack && (
        <div className="mt-4 flex space-x-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleCorrect}
          >
            Correct
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleWrong}
          >
            Wrong
          </button>
        </div>
      )}

      <div className="mt-4 text-lg font-semibold">
        Correct Count: {correctCount}
      </div>
    </div>
  );
};

export default FlashCard;
