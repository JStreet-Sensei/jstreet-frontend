import Image, { ImageLoader } from 'next/image';
import Link from 'next/link';

const StartQuickAnswerGame: React.FC = () => {
  return (
    <>
      <Link href={'/lobby'}>
        <div className="flex flex-col md:flex-row h-full items-center cursor-pointer">
          <div className="flex flex-col">
            <h3 className="text-3xl text-center">Quick Answer Game</h3>
            <h4>Comming soon...</h4>
          </div>
          <Image width={300} height={300} src="/quick-answer-fox.png" alt="Quick Answer Game Fox Picture" />
        </div>
      </Link>
    </>
  );
};

export default StartQuickAnswerGame;
