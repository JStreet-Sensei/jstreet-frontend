import Image, { ImageLoader } from 'next/image';
// import gamePic from './../../../public/practice-nife.png';
import Link from 'next/link';

// const baseUrl = process.env.NEXTAUTH_URL;

// const imageLoader: ImageLoader = ({ src, width, quality }) => {
//   return `${baseUrl}/${src}?w=${width}&q=${quality || 75}`;
// };

const StartFlashCard: React.FC = () => {
  return (
    <>
      <Link href={'/game/flash-card'}>
        <div className="grid grid-cols-2 gap-4 h-full items-center cursor-pointer">
          <div className="flex justify-center items-center">
            <div>
              <h3 className="text-3xl text-center">Practice Mode</h3>
            </div>
          </div>

          <div className="flex justify-center items-center">
            {/* <Image loader={imageLoader} width={300} height={300} src={gamePic} alt="Cross nife picture" /> */}
            <Image width={300} height={300} src="/practice-nife.png" alt="Cross nife picture" />
          </div>
        </div>
      </Link>
    </>
  );
};

export default StartFlashCard;
