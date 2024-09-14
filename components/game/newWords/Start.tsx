import Image, { ImageLoader } from 'next/image';
import Link from 'next/link';

const LearningStart: React.FC = () => {
  return (
    <>
      <div className="flex md:flex-row flex-col h-full items-center">
        <div className='flex flex-col'>
          <h3 className="text-3xl text-start">Expression</h3><br></br>
          <h5>You can read many word cards. <br></br>Remenber and test in Practice mode.</h5>
        </div>
        <Image width={150} height={150} src="/new-expression-fox.png" alt="Fox picture" />
      </div>
      <Link href={'/game/expression'}>
        <button
          className="ml-20 mt-5 bg-[var(--savoy-blue)] text-white py-2 
            rounded-full transform -translate-y-1/2 top-1/2 hover:bg-[var(--tekhelet)] transition
            px-8
            cursor-pointer "
        >
          Start!
        </button>
      </Link>
    </>
  );
};

export default LearningStart;
