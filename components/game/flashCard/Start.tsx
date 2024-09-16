import Image, { ImageLoader } from 'next/image';
import Link from 'next/link';

const StartFlashCard: React.FC = () => {
  return (
    <>
      <div className="flex md:flex-row flex-col h-full items-center">
        <div className="flex flex-col">
          <h3 className="text-3xl text-start">Practice Mode</h3>
          <h5>
            Check learned words in Expressions.<br></br>Memorize with Flashcards!
          </h5>
        </div>
        <Image width={150} height={150} src="/practice-nife.png" alt="Cross nife picture" />
      </div>
      <div className="ml-20">
        <Link href={'/game/flash-card'}>
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

export default StartFlashCard;
