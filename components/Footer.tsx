import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <>
      <div className="z-10 portrait:hidden landscape:visible fixed bottom-0 flex flex-row justify-around items-center w-full bg-[#f179a7] h-20 font-bold">
        <div className="flex justify-center items-center w-1/3">Thanks for playing!</div>
        <Link
          className="flex justify-center items-center w-1/3 underline cursor-pointer"
          href={'https://github.com/Nihongo-Jouzu/nihongo-jouzu-frontend'}
        >
          Our repo Link for frontend
        </Link>
        <Link
          className="flex justify-center items-center w-1/3 underline cursor-pointer"
          href={'https://github.com/Nihongo-Jouzu/nihongo-jouzu-backend'}
        >
          Our repo Link for backend
        </Link>
      </div>
    </>
  );
};

export default Footer;
