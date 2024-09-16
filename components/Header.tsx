import { useSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Poppins } from 'next/font/google';
import { useState, useRef, useEffect } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
});

export const Header: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); 

  const isInGamePage = router.pathname.includes('/find-pair');
  const isMyPage = router.pathname === '/mypage';

  const handleSelectGame = (path: string) => {
    if (!session) {
      signIn(undefined, { callbackUrl: path });
    }
    router.push(path);
    if (menuOpen) setMenuOpen(false); // Close menu on selection
  };

  // Handle click outside of the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <div
        className={`flex items-center justify-between p-4 bg-gradient-to-r from-[#12dcd8] to-[#0bbfb7] shadow-lg ${poppins.className}`}
      >
        <div className="text-white text-lg font-medium hover:bg-[#0bbfb7] px-3 py-1 rounded-md">
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
              {!isMyPage && (
                <Link
                  href={'/mypage'}
                  className="text-white text-lg font-medium hover:bg-[var(--magenta)] px-3 py-1 rounded-md"
                >
                  My Page
                </Link>
              )}
              <button
                onClick={() => signOut()}
                className="text-white text-lg font-medium hover:bg-[var(--magenta)] px-3 py-1 rounded-md"
              >
                Log out
              </button>
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div
        ref={menuRef}
        className="md:hidden fixed right-0 bg-[#12dcd8] shadow-lg flex flex-col space-y-4 p-4 items-center justify-center w-1/2 transition-transform transform translate-x-0 z-50">
          {!isInGamePage && (
            <>
              <button
                onClick={() => handleSelectGame('/game/expression')}
                className="text-white text-lg font-medium bg-transparent hover:bg-[#0bbfb7] w-full py-1 transition-all"
              >
                Expression
              </button>
              <button
                onClick={() => handleSelectGame('/game/flash-card')}
                className="text-white text-lg font-medium bg-transparent hover:bg-[#0bbfb7] w-full py-1 transition-all"
              >
                Learning
              </button>
              <button
                onClick={() => handleSelectGame('/lobby')}
                className="text-white text-lg font-medium bg-transparent hover:bg-[#0bbfb7] w-full py-1 transition-all"
              >
                Pairing Game
              </button>
              <button
                onClick={() => handleSelectGame('/lobby')}
                className="text-white text-lg font-medium bg-transparent hover:bg-[#0bbfb7] w-full py-1 transition-all"
              >
                Quick Answer Game
              </button>
            </>
          )}

          {session ? (
            <>
              {!isMyPage && (
                <button
                  onClick={() => handleSelectGame('/mypage')}
                  className="text-white text-lg font-medium hover:bg-[var(--magenta)] w-full py-1 transition-all"
                >
                  My Page
                </button>
              )}
              <button
                onClick={() => { signOut(); if (menuOpen) setMenuOpen(false); }}
                className="text-white text-lg font-medium hover:bg-[var(--magenta)] w-full py-1 transition-all"
              >
                Log out
              </button>
            </>
          ) : (
            <button
              onClick={() => { signIn(undefined, { callbackUrl: '/mypage' }); if (menuOpen) setMenuOpen(false); }}
              className="text-white text-lg font-medium hover:bg-[var(--magenta)] px-6 py-2 transition-all"
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
