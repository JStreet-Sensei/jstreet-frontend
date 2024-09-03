import { ReactNode, useEffect, useState } from "react";
import Card from "./Card";

export const Matrix = () => {
  // Default value
  const GRID_SIZE = 4;

  // Card elements state
  const [useCardElement, setCardElement] = useState<ReactNode>([]);

  // Create all cards
  useEffect(() => {
    const cardList = [];
    let counterKey = 0;
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        cardList.push(<Card key={counterKey}></Card>);
        counterKey += 1;
      }
    }
    setCardElement(cardList);
  }, []);

  return (
    <>
      <div className="grid grid-cols 4 gap-4 border-double border-4 border-slate-600 grid-cols-4 ">
        {useCardElement}
      </div>
    </>
  );
};
