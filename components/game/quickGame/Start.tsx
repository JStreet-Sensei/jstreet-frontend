import Image, { ImageLoader } from 'next/image';
import Link from 'next/link';

const StartQuickAnswerGame: React.FC = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row h-full items-center">
        <div className="flex flex-col">
          <h3 className="text-3xl text-start">Quick Answer Game</h3>
          <h4>Comming soon...</h4>
        </div>
        <Image width={150} height={150} src="/quick-answer-fox.png" alt="Quick Answer Game Fox Picture" />
      </div>
      <div className="ml-20">
        <Link href={'/'}>
          <button
            className="bg-[var(--savoy-blue)] text-white py-2 
          rounded-full transform -translate-y-1/2 top-1/2 hover:bg-[var(--tekhelet)] transition
          px-8 cursor-pointer 
          "
          >
            Start!
          </button>
        </Link>
      </div>
    </>
  );
};

export default StartQuickAnswerGame;
