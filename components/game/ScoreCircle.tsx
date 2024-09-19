import { Player } from '@/types/game';

type ScorCircleProps = {
  player: Player | undefined;
  playerNumber: number;
};

const ScorCircle = ({ player, playerNumber }: ScorCircleProps) => {
  return (
    <>
      <div className="relative size-40">
        <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-gray-200 dark:text-neutral-700"
            stroke-width="2"
          ></circle>
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className={`stroke-current secondary-color`}
            stroke-width="2"
            stroke-dasharray="100"
            stroke-dashoffset={((8 - (player ? player?.score : 0)) / 8) * 100}
            stroke-linecap="round"
          ></circle>
        </svg>

        <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
          <span className="text-center text-2xl font-bold secondary-color ">
            <p>{player?.username}</p>
            <p>{player?.score}</p>
          </span>
        </div>
      </div>
    </>
  );
};

export default ScorCircle;
