import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Header: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const isGamePage = router.pathname.includes('/game');
  const isMyPage = router.pathname === '/mypage';
  const isExpressionPage = router.pathname === '/game/expression';
  const isLearningPage = router.pathname === '/game/learning';
  const isGameFindPair = router.pathname === '/game/find-pair';
  const isGameQuickAnswer = router.pathname === '/game/quick-answer';

  return (
    <>
      <div className="flex items-center p-4 bg-gray-200">
        <div className="flex space-x-4">
          <div className="cursor-pointer">
            <Link href={'/'}>Home</Link>
          </div>
          {!isExpressionPage && (
            <div className="cursor-pointer">
              <Link href={'/game/expression'}>Expression</Link>
            </div>
          )}
          {!isLearningPage && (
            <div className="cursor-pointer">
              <Link href={'/game/learning'}>Learning</Link>
            </div>
          )}
          {!isGameFindPair && (
            <div className="cursor-pointer">
              <Link href={'/game/find-pair'}>Paring Game</Link>
            </div>
          )}
          {!isGameQuickAnswer && (
            <div className="cursor-pointer">
              <Link href={'/game/quick-answer'}>Quick Answer Game</Link>
            </div>
          )}
        </div>

        {session ? (
          <div className="ml-auto flex space-x-4">
            {!isGamePage && (
              <div
                className="cursor-pointer"
                onClick={() => {
                  signOut();
                }}
              >
                Log out
              </div>
            )}
            {!isGamePage && !isMyPage && (
              <div className="cursor-pointer">
                <Link href={'/mypage'}>My page</Link>
              </div>
            )}
          </div>
        ) : (
          <div className="ml-auto cursor-pointer" onClick={() => router.push('/login')}>
            Log in
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
