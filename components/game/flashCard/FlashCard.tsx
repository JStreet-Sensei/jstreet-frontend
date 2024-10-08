import { useContext, useState } from 'react';
import { SelectedMaterial } from '../../../pages/game/flash-card';
import styles from '@/styles/FlashCard.module.css';
import Link from 'next/link';

interface FlashCardProps {
  loading: boolean; // Add loading prop
  noLearnedWords: boolean;
}

const FlashCard = ({ loading, noLearnedWords }: FlashCardProps) => {
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
  if (noLearnedWords) {
    return (
      <div>
        <div>You should learn more expression!</div>
        <Link href={'./expression'}>Go to expression</Link>
      </div>
    ); // Show a warn message
  }

  if (selectedMaterial && selectedMaterial.correctPhrases.length === selectedMaterial.phrases.length) {
    return (
      <div className="text-center">
        <h1 className="text-2xl lg:text-4xl px-2 lg:px-4 font-semibold text-red-700">Congratulations!</h1>
        <p className="mt-2 text-lg lg:text-2xl text-cyan-700">You&apos;ve completed all flashcards</p>
        <button
          className="mt-4 bg-[var(--savoy-blue)] hover:bg-blue-600 text-white font-bold shadow-md py-2 lg:py-4 px-4 lg:px-8 rounded"
          onClick={handleRestart}
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div
      className="relative flex flex-col items-center bg-white border-2 border-gray-300 rounded-lg shadow-lg p-6 lg:p-12 w-lg h-auto overflow-hidden"
      style={{ minHeight: '330px', minWidth: '300px' }}
    >
      <div className="text-lg lg:text-2xl font-semibold mb-4">💡Correct Count: {correctCount}</div>

      <div
        className={`${styles.flip_card} ${styles.flip_card_inner} ${isBack ? styles.flip : ''}`}
        onClick={() => setIsBack(!isBack)}
        style={{ width: '280px', minHeight: '200px', cursor: 'pointer' }}
      >
        <div className={`${styles.flip_card_front} flex items-center justify-center`}>
          <p className="text-md text-2xl lg:text-4xl font-bold text-gray-800">
            {currentPhrase?.english || 'Loading...'}
          </p>
        </div>
        <div className={`${styles.flip_card_back} flex items-center justify-center font-semibold`}>
          <p className="text-md px-5 font-semibold">
            {currentPhrase?.japanese || 'Loading...'}
            <br />
            <span className="text-md font-semibold block max-h-24 overflow-y-auto">
              {currentPhrase?.description || ''}
            </span>
          </p>
        </div>
      </div>

      {isBack && (
        <div className="mt-6 flex space-x-12">
          <button
            className="bg-cyan-700 hover:bg-cyan-900 text-white font-bold shadow-md py-2 lg:py-4 px-4 lg:px-8 rounded"
            onClick={handleCorrect}
          >
            Correct
          </button>
          <button
            className="bg-red-700 hover:bg-red-800 text-white font-bold shadow-md py-2 lg:py-4 px-4 lg:px-8 rounded"
            onClick={handleWrong}
          >
            Incorrect
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashCard;
