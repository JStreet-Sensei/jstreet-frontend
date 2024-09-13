import { useSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Poppins } from 'next/font/google';
import { useState } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
});

export const Header: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isInGamePage = router.pathname.includes('/find-pair');
  const isMyPage = router.pathname === '/mypage';

  const handleSelectGame = (path: string) => {
    if (!session) {
      signIn(undefined, { callbackUrl: path });
    }
    router.push(path);
  };

  return (
    <>
      <div
        className={`flex items-center justify-between p-4 bg-gradient-to-r from-[#12dcd8] to-[#0bbfb7] shadow-lg ${poppins.className}`}
      >
        <div className="text-white text-lg font-medium">
          <Link href={session ? '/select-game' : '/'}>Home</Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl focus:outline-none">
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>
        </div>

        <div className="hidden md:flex space-x-6">
          {!isInGamePage && (
            <>
              <button
                onClick={() => handleSelectGame('/game/expression')}
                className="text-white text-lg font-medium hover:bg-[#0bbfb7] px-3 py-1 rounded-md"
              >
                Expression
              </button>
              <button
                onClick={() => handleSelectGame('/game/flash-card')}
                className="text-white text-lg font-medium hover:bg-[#0bbfb7] px-3 py-1 rounded-md"
              >
                Learning
              </button>
              <button
                onClick={() => handleSelectGame('/lobby')}
                className="text-white text-lg font-medium hover:bg-[#0bbfb7] px-3 py-1 rounded-md"
              >
                Pairing Game
              </button>
              <button
                onClick={() => handleSelectGame('/lobby')}
                className="text-white text-lg font-medium hover:bg-[#0bbfb7] px-3 py-1 rounded-md"
              >
                Quick Answer Game
              </button>
            </>
          )}

          {session ? (
            <>
              <button
                onClick={() => signOut()}
                className="text-white text-lg font-medium hover:bg-[var(--magenta)] px-3 py-1 rounded-md"
              >
                Log out
              </button>
              {!isMyPage && (
                <Link
                  href={'/mypage'}
                  className="text-white text-lg font-medium hover:bg-[var(--magenta)] px-3 py-1 rounded-md"
                >
                  My Page
                </Link>
              )}
            </>
          ) : (
            <button
              onClick={() => signIn(undefined, { callbackUrl: '/mypage' })}
              className="text-white text-lg font-medium hover:bg-[var(--magenta)] px-3 py-1 rounded-md"
            >
              Log in
            </button>
          )}
        </div>
      </div>

      {/* Mobile*/}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-[#12dcd8] to-[#0bbfb7] shadow-lg flex flex-col space-y-4 p-4">
          {!isInGamePage && (
            <>
              <button
                onClick={() => handleSelectGame('/game/expression')}
                className="text-white text-lg font-medium hover:bg-[#0bbfb7] px-3 py-1 rounded-md"
              >
                Expression
              </button>
              <button
                onClick={() => handleSelectGame('/game/flash-card')}
                className="text-white text-lg font-medium hover:bg-[#0bbfb7] px-3 py-1 rounded-md"
              >
                Learning
              </button>
              <button
                onClick={() => handleSelectGame('/lobby')}
                className="text-white text-lg font-medium hover:bg-[#0bbfb7] px-3 py-1 rounded-md"
              >
                Pairing Game
              </button>
              <button
                onClick={() => handleSelectGame('/lobby')}
                className="text-white text-lg font-medium hover:bg-[#0bbfb7] px-3 py-1 rounded-md"
              >
                Quick Answer Game
              </button>
            </>
          )}

          {session ? (
            <>
              <button
                onClick={() => signOut()}
                className="text-white text-lg font-medium hover:bg-[var(--magenta)] px-3 py-1 rounded-md"
              >
                Log out
              </button>
              {!isMyPage && (
                <Link
                  href={'/mypage'}
                  className="text-white text-lg font-medium hover:bg-[var(--magenta)] px-3 py-1 rounded-md"
                >
                  My Page
                </Link>
              )}
            </>
          ) : (
            <button
              onClick={() => signIn(undefined, { callbackUrl: '/mypage' })}
              className="text-white text-lg font-medium hover:bg-[var(--magenta)] px-3 py-1 rounded-md"
            >
              Log in
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
