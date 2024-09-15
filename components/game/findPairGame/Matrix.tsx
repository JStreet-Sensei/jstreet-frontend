import { ReactNode, useEffect, useState } from 'react';
import Card from './Card';
import { checkDataSelectable, getSelectedCards } from '@/utils/utils-data';
import { CardData, ClientGameState, Player } from '@/types/game';
import { clone } from 'lodash';
import styles from '@/styles/Game.module.css';

type MatrixProps = {
  handleUpdateDeck: (cardDeck: CardData[]) => void;
  gameState: ClientGameState;
  players: Set<Player>;
};
export const Matrix: React.FC<MatrixProps> = ({ handleUpdateDeck, gameState, players }) => {
  // Default value
  const GRID_SIZE = 4;

  // Card elements state
  const [useCardElement, setCardElement] = useState<ReactNode[]>([]);
  const [useRefresh, setRefresh] = useState(false);
  const [useCardDeck, setCardDeck] = useState(gameState.cardDeck);
  const [isCardClickable, setCardClickable] = useState(false);

  //Is clickable logic
  useEffect(() => {
    setCardDeck([...gameState.cardDeck]);
    if (gameState.user_id === gameState.turn) {
      if (getSelectedCards(gameState.cardDeck).length < 2) setCardClickable(true);
      else setCardClickable(false);
    } else setCardClickable(false);
    setRefresh(!useRefresh);
  }, [gameState]);

  // Create all cards
  useEffect(() => {
    if (useCardDeck.length != 0) {
      const cardList = [];
      let counterKey = 0;
      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          let actualCard = useCardDeck[counterKey];
          cardList.push(
            <Card
              players={players}
              backText={actualCard.back}
              key={counterKey}
              selectCard={handleSelectACard}
              index={counterKey}
              guessed={actualCard.guessedFrom}
              selected={actualCard.selected}
              isCardClickable={isCardClickable}
            ></Card>
          );
          counterKey += 1;
        }
      }
      setCardElement(cardList);
    }
  }, [useCardDeck, useRefresh, isCardClickable]);

  useEffect(() => {}, [useCardDeck]);

  // Handle the selection of a card
  const handleSelectACard = (index: number, lastState: boolean) => {
    // Helper function to flip card
    const flipCard = () => {
      const newCardDeck = clone(useCardDeck);
      // Flip the value
      newCardDeck[index].selected = true;
      handleUpdateDeckWithDelay(newCardDeck);

      return newCardDeck;
    };

    // If not flipped flip
    if (lastState === false) {
      setCardDeck(flipCard);
      return true;
    }
    // Check if there are less than 2 cards selected
    else if (checkDataSelectable(useCardDeck)) {
      setCardDeck(flipCard);
    } else {
      return false;
    }

    return true;
  };

  // Helper function that enable the delay after 2 cards choosed
  const handleUpdateDeckWithDelay = (newCardDeck: CardData[]) => {
    const timer = new Promise((resolve) => {
      setCardClickable(false);
      setTimeout(resolve, 200);
    }).then(() => {
      handleUpdateDeck(newCardDeck);
    });
  };

  return (
    <>
      <div
        className={`${styles.table_background} border-4 border-solid border-black grid grid-cols-2 gap-4 place-items-center md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 align-middle justify-self-auto py-2`}
      >
        {useCardElement ? (
          useCardElement.map((card, index) => (
            <div
              key={index}
              className="transition-shadow duration-300 hover:shadow-[0_20px_35px_-15px_rgba(17,223,217,0.9)]"
            >
              {card}
            </div>
          ))
        ) : (
          <p>No cards available</p>
        )}
      </div>
    </>
  );
};
