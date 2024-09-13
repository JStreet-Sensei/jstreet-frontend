import Image, { ImageLoader } from 'next/image';
import Link from 'next/link';

const LearningStart: React.FC = () => {
  return (
    <>
      <Link href={'/game/expression'}>
        <div className="flex flex-col md:flex-row h-full items-center cursor-pointer">
          <div className='flex flex-col'>
            <h3 className="text-3xl text-center">Expression</h3><br></br>
            <h4>Dive into the wide words world.</h4>
            <h5>You can read many world cards. <br></br>Remenber and test in Practice mode.</h5>
          </div>
          <Image width={300} height={300} src="/new-expression-fox.png" alt="Fox picture" />
        </div>
      </Link>
    </>
  );
};

export default LearningStart;
