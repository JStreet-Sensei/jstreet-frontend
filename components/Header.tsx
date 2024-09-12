import { useSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

export const Header: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const isGamePage = router.pathname.includes('/game');
  const isMyPage = router.pathname === '/mypage';
  const isSelectGamePage = router.pathname === '/select-game';
  const isExpressionPage = router.pathname === '/game/expression';
  const isLearningPage = router.pathname === '/game/learning';
  const isGameFindPair = router.pathname === '/game/find-pair';
  const isGameQuickAnswer = router.pathname === '/game/quick-answer';

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <div className="flex items-center p-4 bg-gradient-to-r from-[#12dcd8] to-[#0bbfb7] shadow-lg">
        <div className="flex space-x-6">
          <div className="cursor-pointer text-white text-lg font-medium px-3 py-1 hover:bg-[#0bbfb7] rounded-md transition-all duration-300 border-b-2 border-transparent">
            <Link href={'/'}>Home</Link>
          </div>
          {!isExpressionPage && !isSelectGamePage && (
            <div className="cursor-pointer text-white text-lg font-medium px-3 py-1 hover:bg-[#0bbfb7] rounded-md transition-all duration-300 border-b-2 border-transparent">
              <button onClick={() => {
                signIn(undefined, { callbackUrl: '/select-game' });
              }}>Expression</button>
            </div>
          )}
          {!isLearningPage && !isSelectGamePage && (
            <div className="cursor-pointer text-white text-lg font-medium px-3 py-1 hover:bg-[#0bbfb7] rounded-md transition-all duration-300 border-b-2 border-transparent">
              <button onClick={() => {
                signIn(undefined, { callbackUrl: '/select-game' });
              }}>Learning</button>
            </div>
          )}
          {!isGameFindPair && !isSelectGamePage && (
            <div className="cursor-pointer text-white text-lg font-medium px-3 py-1 hover:bg-[#0bbfb7] rounded-md transition-all duration-300 border-b-2 border-transparent">
              <button onClick={() => {
                signIn(undefined, { callbackUrl: '/select-game' });
              }}>Pairing Game</button>
            </div>
          )}
          {!isGameQuickAnswer && !isSelectGamePage && (
            <div className="cursor-pointer text-white text-lg font-medium px-3 py-1 hover:bg-[#0bbfb7] rounded-md transition-all duration-300 border-b-2 border-transparent">
              <button onClick={() => {
                signIn(undefined, { callbackUrl: '/select-game' });
              }}>Quick Answer Game</button>
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
            onClick={() => {
              signIn(undefined, { callbackUrl: '/mypage' });
            }}
          >
            Log in
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
