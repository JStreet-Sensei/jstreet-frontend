import { Player } from '@/types/game';

type WinnerProps = {
  player: Player | undefined;
};
export const Winner = ({ player }: WinnerProps) => {
  return (
    <>
      <div className="mx-auto flex items-center justify-center">
        <p className="text-4xl font-extrabold leading-tight secondary-inverse mt-10">
          The winner is {player ? player.username : ' nobody'}
        </p>
      </div>
    </>
  );
};

export default Winner;
