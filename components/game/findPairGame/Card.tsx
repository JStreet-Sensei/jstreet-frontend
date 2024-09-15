import { useEffect, useState } from 'react';
import styles from '@/styles/Card.module.css';
import NinjaLogo from '@/public/ninjaLogo.svg';
import Image from 'next/image';

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
    if (useIsClickable) {
      if (selectCard(index, selected) && guessed === 0) setFlip(!useFlip);
    }
  };

  return (
    <div className={styles.flip_card} onClick={handleFlip}>
      <div className={`${styles.flip_card_inner} ${useFlip ? styles.flip : ''}`}>
        <div className={styles.flip_card_front}>
          <Image src={NinjaLogo} alt="NinjaLogo" width={100} height={100} className="bg-white rounded-full p-0.5" />
          <p className={styles.title}>J-Sensei</p>
        </div>
        <div className={styles.flip_card_back}>
          <p className={styles.title}>{backText}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
