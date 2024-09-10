import { ReactNode, useEffect, useRef, useState } from 'react';
import Card from './Card';
import { checkDataSelectable } from '@/utils/utils-data';
import { CardData, ClientGameState } from '@/types/game';
import { clone } from 'lodash';

type MatrixProps = {
  handleUpdateDeck: (cardDeck: CardData[]) => void;
  gameState: ClientGameState;
};
export const Matrix: React.FC<MatrixProps> = ({ handleUpdateDeck, gameState }) => {
  // Default value
  const GRID_SIZE = 4;

  // Card elements state
  const [useCardElement, setCardElement] = useState<ReactNode>([]);
  const [useRefresh, setRefresh] = useState(false);
  const [useCardDeck, setCardDeck] = useState(gameState.cardDeck);
  const [isCardClickable, setCardClickable] = useState(false);

  //Is clickable logic
  useEffect(() => {
    setCardDeck([...gameState.cardDeck]);
    console.log('Turn state: ', gameState.user_id, gameState.turn);
    if (gameState.user_id === gameState.turn) setCardClickable(true);
    else setCardClickable(false);
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
              frontText={actualCard.front}
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
      <div className="grid grid-cols 4 gap-4 border-double border-4 border-slate-600 grid-cols-4 place-items-center md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-8 align-middle justify-self-auto">
        {useCardElement}
      </div>
    </>
  );
};
