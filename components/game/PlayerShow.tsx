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
    <div className={`px-2 font-bold ${isPlayerTurn ? animationClass : ''}`}>
      {player?.username} - {player?.score} match {isPlayerTurn ? '' : ''}
    </div>
  );
};

export default PlayerShow;
