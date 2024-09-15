import { useEffect } from 'react';
import Link from 'next/link';

export const Footer = () => { 
  //useEffect to change overflow for mobile view
  useEffect(() => {
    const handleScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    handleScroll(); 

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="z-10 portrait:hidden landscape:visible fixed bottom-0 flex flex-row justify-around items-center w-full bg-[#f179a7] h-20 font-bold">
      <div className="flex justify-center items-center w-1/3">Thanks for start playing!</div>
      <Link className="flex justify-center items-center w-1/3 underline cursor-pointer" href={"https://github.com/Nihongo-Jouzu/nihongo-jouzu-frontend"}>Our repo Link for frontend</Link>
      <Link className="flex justify-center items-center w-1/3 underline cursor-pointer" href={"https://github.com/Nihongo-Jouzu/nihongo-jouzu-backend"}>Our repo Link for backend</Link>
    </div>
  );
};

export default Footer;
