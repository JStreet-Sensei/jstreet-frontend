import Image, { ImageLoader } from 'next/image';
import Link from 'next/link';

const StartPairGame: React.FC = () => {
  return (
    <>
      <div className="flex md:flex-row flex-col h-full items-center">
        <div className="flex flex-col">
          <h3 className="text-3xl text-start ">Find Pair Game</h3>
          <h5>
            You play with the other player.<br></br>Choose right pair of formal Japanese<br></br> and street Japanese.
          </h5>
        </div>
        <Image width={150} height={150} src="/pair-game-fox.png" alt="Find Pair Fox Picture" />
      </div>
      <div className="ml-20">
        <Link href={'/lobby'}>
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

export default StartPairGame;
