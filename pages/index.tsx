import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const HomePage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div
        className="relative flex flex-col items-start justify-center min-h-screen
        bg-no-repeat bg-center md:hidden bg-[#25dad1] " style={{ backgroundImage: "url('/LandingPage/landpage_md.jpeg')", backgroundSize: "80%" }}
      >

        <div className="flex-1 min-w-full flex items-start justify-center flex-col z-10"> {/* Adiciona padding para afastar do canto */}

          <div className="fixed z-20 flex flex-row gap-4 bottom-72 left-4 items-center justify-center ">
            <button
              onClick={() => {
                signIn(undefined, { callbackUrl: '/mypage' });
              }}
              className="bg-red-700 h-10 text-white font-bold py-4 px-8 rounded-full left-2
              bottom-1 shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              Sign In
            </button>
            <span className=" h-10  text-white font-bold py-4 px-8 text-2xl
              ">OR</span>
            <button className="bg-red-700 h-10 rounded-full  left-80
              bottom-1  text-white font-bold py-4 px-8  shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out">
              <Link href={"/signup"}>Sign Up</Link>
            </button>
          </div>
        </div>
      </div>

      <div className='relative md:flex flex-col items-start justify-center min-h-screen
        bg-no-repeat bg-[#25dbd1] bg-center hidden md:visible bg-contain' style={{ backgroundImage: "url('/LandingPage/landpage.svg')", backgroundSize: "100%" }}>
        <div className="fixed z-20 flex flex-row gap-4 bottom-72 left-40 items-center justify-center ">
          <button
            onClick={() => {
              signIn(undefined, { callbackUrl: '/mypage' });
            }}
            className="bg-red-700 h-10 text-white font-bold py-4 px-8 rounded-full left-2
              bottom-1 shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out"
          >
            Sign In
          </button>
          <span className=" h-10  text-white font-bold py-4 px-8 text-2xl
              ">OR</span>
          <button className="bg-red-700 h-10 rounded-full  left-80
              bottom-1  text-white font-bold py-4 px-8  shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out">
            <Link href={"/signup"}>Sign Up</Link>
          </button>
        </div>
      </div>

    </>
  );
};

export default HomePage;
