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
      <div className="flex flex-row">
        <div className="basis-1/6">
          <Link href={'/'}>Home</Link>
        </div>
        {/* {!isExpressionPage && (
          <div className="basis-1/6 cursor-pointer">
            <Link href={'/game/expression'}>Expression</Link>
          </div>
        )}
        {!isLearningPage && (
          <div className="basis-1/6 cursor-pointer">
            <Link href={'/game/learning'}>Learning</Link>
          </div>
        )}
        {!isGameFindPair && (
          <div className="basis-1/6 cursor-pointer">
            <Link href={'/game/find-pair'}>Paring Game</Link>
          </div>
        )}
        {!isGameQuickAnswer && (
          <div className="basis-1/6 cursor-pointer">
            <Link href={'/game/quick-answer'}>Quick Answer Game</Link>
          </div>
        )} */}
        {session ? (
          <>
            {!isGamePage && (
              <>
                <div
                  className="basis-1/6 cursor-pointer"
                  onClick={() => {
                    signOut();
                  }}
                >
                  Log out
                </div>
                {!isGamePage && !isMyPage && (
                  <div className="basis-1/6 cursor-pointer">
                    <Link href={'/mypage'}>My page</Link>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <div className="basis-1/6"></div>
            <div
              className="basis-1/6 cursor-pointer"
              onClick={() => {
                router.push('/login');
              }}
            >
              Log in
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Header;
