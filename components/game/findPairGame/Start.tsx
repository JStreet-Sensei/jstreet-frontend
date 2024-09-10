import Image, { ImageLoader } from 'next/image';
// import gamePic from './../../../public/pair-game-fox.png';
import Link from 'next/link';

// const baseUrl = process.env.NEXTAUTH_URL;

// const imageLoader: ImageLoader = ({ src, width, quality }) => {
//   return `${baseUrl}/${src}?w=${width}&q=${quality || 75}`;
// };

const StartPairGame: React.FC = () => {
  return (
    <>
      <Link href={'/game/find-pair'}>
        <div className="grid grid-cols-2 gap-4 h-full items-center cursor-pointer">
          <div className="flex justify-center items-center">
            <div>
              <h3 className="text-3xl text-center">Find Pair Game</h3>
            </div>
          </div>

          <div className="flex justify-center items-center">
            {/* <Image loader={imageLoader} width={300} height={300} src={gamePic} alt="Find Pair Fox Picture" /> */}
            <Image width={300} height={300} src="/pair-game-fox.png" alt="Find Pair Fox Picture" />
          </div>
        </div>
      </Link>
    </>
  );
};

export default StartPairGame;
