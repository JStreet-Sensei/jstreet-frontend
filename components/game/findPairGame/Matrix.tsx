import { ReactNode, useEffect, useRef, useState } from "react";
import Card from "./Card";
import { DataItem } from "../../../types/types";
import {
  checkCardMatch,
  checkDataSelectable,
  getSelectedCards,
  prepareCardDeck,
} from "../../../utils/utils-data";
import { CardData } from "../../../types/game";

type MatrixProps = {
  cardData: DataItem[];
};
export const Matrix: React.FC<MatrixProps> = ({ cardData }) => {
  // Default value
  const GRID_SIZE = 4;

  // Card elements state
  const [useCardElement, setCardElement] = useState<ReactNode>([]);
  const [useCardDeck, setCardDeck] = useState<CardData[]>([]);
  const [useRefresh, setRefresh] = useState(false);

  // Initiliaze card deck
  useEffect(() => {
    setCardDeck(prepareCardDeck(cardData));
  }, [cardData]);

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
            ></Card>,
          );
          counterKey += 1;
        }
      }
      setCardElement(cardList);
    }
  }, [useCardDeck, useRefresh]);

  useEffect(() => {
    const selectedCards = getSelectedCards(useCardDeck);
    // Check if the card match
    if (checkCardMatch(useCardDeck)) {
      // Change card to gueseed
      setCardDeck((prevState) => {
        const newCardDeck = [...prevState];
        // Change to gueesed

        // Extract index of the selected cards
        const cardIndex1 = selectedCards[0];
        const cardIndex2 = selectedCards[1];
        // Change the state to gueeesed
        newCardDeck[cardIndex1].guessedFrom = 1;
        newCardDeck[cardIndex2].guessedFrom = 1;
        // Change to unselected
        newCardDeck[cardIndex1].selected = false;
        newCardDeck[cardIndex2].selected = false;
        return newCardDeck;
      });
      alert("Card gueesed!");
    } else if (selectedCards.length === 2) {
      console.log(selectedCards);
      setCardDeck((prevState) => {
        const newCardDeck = [...prevState];
        // Extract index of the selected cards
        const cardIndex1 = selectedCards[0];
        const cardIndex2 = selectedCards[1];
        // Change to unselected
        newCardDeck[cardIndex1].selected = false;
        newCardDeck[cardIndex2].selected = false;
        return newCardDeck;
      });
      alert("Wrong!");
    }
  }, [useCardDeck]);

  // Handle the selection of a card
  const handleSelectACard = (index: number, lastState: boolean) => {
    // Helper function to flip card
    const flipCard = (prevState: CardData[]) => {
      const newCardDeck = [...prevState];
      // Flip the value
      newCardDeck[index].selected = !lastState;
      return newCardDeck;
    };

    // If already flipped filp again
    if (lastState) {
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

  return (
    <>
      <div className="grid grid-cols 4 gap-4 border-double border-4 border-slate-600 grid-cols-4 ">
        {useCardElement}
      </div>
    </>
  );
};
