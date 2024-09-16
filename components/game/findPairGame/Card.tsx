import { useEffect, useState } from 'react';
import styles from '@/styles/Card.module.css';
import NinjaLogo from '@/public/ninjaLogo.svg';
import Image from 'next/image';
import { Player } from '@/types/game';

type CardProps = {
  players: Set<Player>;
  backText: string;
  selectCard: (index: number, lastState: boolean) => boolean;
  index: number;
  guessed: number;
  selected: boolean;
  isCardClickable: boolean;
};

export const Card: React.FC<CardProps> = ({
  players,
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
  const playerArray = Array.from(players);

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

  const getBackClass = () => {
    if (guessed === 0) {
      return styles.flip_card_back;
    }

    if (playerArray.length > 0 && guessed === playerArray[1].user_id) {
      return styles.flip_card_back0;
    } else {
      return styles.flip_card_back1;
    }
  };

  return (
    <div className={styles.flip_card + ` cursor-grab`} onClick={handleFlip}>
      <div className={`${styles.flip_card_inner} ${useFlip ? styles.flip : ''}`}>
        <div className={` ${styles.flip_card_front} `}>
          <Image src={NinjaLogo} alt="NinjaLogo" width={100} height={100} className="bg-white rounded-full p-0.5" />
          <p className={styles.title}>J-Sensei</p>
        </div>
        <div className={getBackClass()}>
          <p className={`${styles.title}`}>{backText}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
