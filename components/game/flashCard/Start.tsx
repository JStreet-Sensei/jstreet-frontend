import Image, { ImageLoader } from 'next/image';
import Link from 'next/link';

const StartFlashCard: React.FC = () => {
  return (
    <>
      <Link href={'/game/flash-card'}>
        <div className="flex flex-col md:flex-row h-full items-center cursor-pointer">
          <div className='flex flex-col'>
            <h3 className="text-3xl text-center">Practice Mode</h3>
            <h4>Test your vocabulary.</h4>
            <h5>Words already learned appears.<br></br>Try to remember what you memorized.</h5>
          </div>
          <Image width={300} height={300} src="/practice-nife.png" alt="Cross nife picture" />
        </div>
      </Link>
    </>
  );
};

export default StartFlashCard;
