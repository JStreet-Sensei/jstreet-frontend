import Image, { ImageLoader } from 'next/image';
import Link from 'next/link';

const StartPairGame: React.FC = () => {
  return (
    <>
      <Link href={'/lobby'}>
        <div className="flex md:flex-row flex-col h-full items-center cursor-pointer">
          <div className="flex flex-col">
            <h3 className="text-3xl text-center">Find Pair Game</h3>
            <h4>Compete with the others.</h4>
            <h5>You play with the other player.<br></br>Choose right pair of formal Japanese and slang Japanese.</h5>
          </div>
          <Image width={300} height={300} src="/pair-game-fox.png" alt="Find Pair Fox Picture" />
        </div>
      </Link>
    </>
  );
};

export default StartPairGame;
