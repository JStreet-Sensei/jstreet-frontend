import { CardData } from "../types/game";
import { ApiResponse, DataItem } from "../types/types";

//Fetch data from an API for pair game
/**
 * Read the data json from the api
 * @returns {DataItem} inside data.json
 */
export const fetchData = async (
  path: string = "/api/data",
): Promise<DataItem[]> => {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

// Get the index of selected cards
export const getSelectedCards = (data: CardData[]) => {
  return data.reduce((accumulator, actualCard, currentIndex) => {
    if (actualCard.selected) accumulator.push(currentIndex);
    return accumulator;
  }, [] as number[]);
};

// Check if the card match
/**
 * Check if the selected card matches
 * @param data array of cards
 * @returns {boolean} if match
 */
export const checkCardMatch = (cardDeck: CardData[]) => {
  const selectedIndexes = getSelectedCards(cardDeck);
  const cardIndex1 = selectedIndexes[0];
  const cardIndex2 = selectedIndexes[1];

  if (selectedIndexes.length === 2) {
    if (cardDeck[cardIndex1].match === cardIndex2) {
      // The card match
      return true;
    }
  }

  return false;
};

// Prepare card deck with initial values
/**
 *
 * @param cardDeck raw data from API request
 * @returns {CardData} with initial default values
 */
export const prepareCardDeck = (cardDeck: DataItem[]) => {
  const expandedDeck: CardData[] = cardDeck.map((card) => {
    const newCard = card as CardData;
    newCard.guessedFrom = 0;
    newCard.selected = false;
    return newCard;
  });
  return expandedDeck;
};

// Check if inside cardDesk there are less than 2 card selected
export const checkDataSelectable = (cardDeck: CardData[]) => {
  const number = cardDeck.reduce((counter, actualCard) => {
    if (actualCard.selected) return (counter += 1);
    return counter;
  }, 0);

  if (number === 2) return true;
  return false;
};

export const isObjectEmpty = (obj: object) => {
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};
