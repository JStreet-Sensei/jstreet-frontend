import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
});

export const Header: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const isGamePage = router.pathname.includes('/game');
  const isMyPage = router.pathname === '/mypage';
  const isSelectGamePage = router.pathname === '/selectGame';
  const isExpressionPage = router.pathname === '/game/expression';
  const isLearningPage = router.pathname === '/game/learning';
  const isGameFindPair = router.pathname === '/game/find-pair';
  const isGameQuickAnswer = router.pathname === '/game/quick-answer';

  return (
    <>
      <div
        className={`flex items-center p-4 bg-gradient-to-r from-[#12dcd8] to-[#0bbfb7] shadow-lg ${poppins.className}`}
      >
        <div className="flex space-x-6">
          <div className="cursor-pointer text-white text-lg font-medium px-3 py-1 hover:bg-[#0bbfb7] rounded-md transition-all duration-300 border-b-2 border-transparent">
            <Link href={'/'}>Home</Link>
          </div>
          {!isExpressionPage && !isSelectGamePage && (
            <div className="cursor-pointer text-white text-lg font-medium px-3 py-1 hover:bg-[#0bbfb7] rounded-md transition-all duration-300 border-b-2 border-transparent">
              <Link href={'/game/expression'}>Expression</Link>
            </div>
          )}
          {!isLearningPage && !isSelectGamePage && (
            <div className="cursor-pointer text-white text-lg font-medium px-3 py-1 hover:bg-[#0bbfb7] rounded-md transition-all duration-300 border-b-2 border-transparent">
              <Link href={'/game/learning'}>Learning</Link>
            </div>
          )}
          {!isGameFindPair && !isSelectGamePage && (
            <div className="cursor-pointer text-white text-lg font-medium px-3 py-1 hover:bg-[#0bbfb7] rounded-md transition-all duration-300 border-b-2 border-transparent">
              <Link href={'/game/find-pair'}>Pairing Game</Link>
            </div>
          )}
          {!isGameQuickAnswer && !isSelectGamePage && (
            <div className="cursor-pointer text-white text-lg font-medium px-3 py-1 hover:bg-[#0bbfb7] rounded-md transition-all duration-300 border-b-2 border-transparent">
              <Link href={'/game/quick-answer'}>Quick Answer Game</Link>
            </div>
          )}
        </div>

        {session ? (
          <div className="ml-auto flex space-x-6">
            {!isGamePage && (
              <div
                className="cursor-pointer text-white text-lg font-medium px-3 py-1 hover:bg-[var(--magenta)] rounded-md transition-all duration-300 border-b-2 border-transparent"
                onClick={() => {
                  signOut();
                }}
              >
                Log out
              </div>
            )}
            {!isGamePage && !isMyPage && (
              <div className="cursor-pointer text-white text-lg font-medium px-3 py-1 hover:bg-[var(--magenta)] rounded-md transition-all duration-300 border-b-2 border-transparent">
                <Link href={'/mypage'}>My page</Link>
              </div>
            )}
          </div>
        ) : (
          <div
            className="ml-auto cursor-pointer text-white text-lg font-medium px-3 py-1 hover:bg-[var(--magenta)] rounded-md transition-all duration-300 border-b-2 border-transparent"
            onClick={() => router.push('/login')}
          >
            Log in
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
