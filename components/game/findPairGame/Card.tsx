import { useEffect, useState } from "react";

type CardProps = {
  frontText: string;
  backText: string;
  selectCard: (index: number, lastState: boolean) => boolean;
  index: number;
  guessed: number;
  selected: boolean;
  isCardClickable: boolean;
};

export const Card: React.FC<CardProps> = ({
  frontText,
  backText,
  selectCard,
  index,
  selected,
  guessed,
  isCardClickable,
}) => {
  // Flip true means that show the back of the cards
  const [useFlip, setFlip] = useState(false);
  const [useIsClickable, setIsClickable] = useState(isCardClickable);

  useEffect(() => {
    setIsClickable(isCardClickable);
  }, [isCardClickable]);

  // Flip the card on states of gueesed and selected
  useEffect(() => {
    if (selected) setFlip(true);
    else if (guessed !== 0) setFlip(true);
    else setFlip(false);
  }, [selected, guessed]);

  const handleFlip = () => {
    console.log(useIsClickable);
    if (useIsClickable) {
      if (selectCard(index, selected) && guessed === 0) setFlip(!useFlip);
    }
  };

  return (
    <div className={`flip-card`} onClick={handleFlip}>
      <div className={`flip-card-inner ${useFlip ? "flip" : ""}`}>
        <div className="flip-card-front">
          <p className="title">{frontText}</p>
          <p>Hover Me</p>
        </div>
        <div className="flip-card-back">
          <p className="title">{backText}</p>
          <p>Leave Me</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
