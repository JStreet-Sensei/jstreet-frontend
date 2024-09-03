import { ReactNode, useEffect, useState } from "react";
import Card from "./Card";
import { DataItem } from "../../../types/types";

type MatrixProps = {
  cardData: DataItem[];
};
export const Matrix: React.FC<MatrixProps> = ({ cardData }) => {
  // Default value
  const GRID_SIZE = 4;

  // Card elements state
  const [useCardElement, setCardElement] = useState<ReactNode>([]);

  // Create all cards
  useEffect(() => {
    if (cardData.length != 0) {
      const cardList = [];
      let counterKey = 0;
      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          let actualCard = cardData[counterKey];
          cardList.push(
            <Card
              frontText={actualCard.front}
              backText={actualCard.back}
              key={counterKey}
            ></Card>,
          );
          counterKey += 1;
        }
      }
      setCardElement(cardList);
    }
  }, [cardData]);

  return (
    <>
      <div className="grid grid-cols 4 gap-4 border-double border-4 border-slate-600 grid-cols-4 ">
        {useCardElement}
      </div>
    </>
  );
};
