import { Player } from '@/types/game';
import gameStyles from '@/styles/Game.module.css';

type PlayerListProps = {
  player: Player | undefined;
  isPlayerTurn: boolean;
  playerIndex: number;
};

/**
 * Display the player with a <li> and the score
 * @param player - Player type of object
 * @returns void
 */
export const PlayerShow = ({ player, isPlayerTurn, playerIndex }: PlayerListProps) => {
  const animationClass =
    playerIndex === 0
      ? gameStyles.animate_shadowRotate_player0
      : playerIndex === 1
        ? gameStyles.animate_shadowRotate_player1
        : '';

  return (
    <div className={`px-2 py-2 ${isPlayerTurn ? animationClass : ''}`}>
      <span className='italic md:text-3xl text-2xl'>
        {player?.username}
        -
      </span>
      <span className='md:text-5xl text-3xl'>
        {player?.score}
      </span>
      <span className='md:text-3xl text-2xl'>
        match {isPlayerTurn ? '★' : ''}
      </span>
    </div>
  );
};

export default PlayerShow;
