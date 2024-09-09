import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const isGamePage = router.pathname === "/game(.*)";
  const isMyPage = router.pathname === "/mypage";

  return (
    <>
      <div className="flex flex-row">
        <div className="basis-1/6">
          <Link href={"/"}>Home</Link>
        </div>
        <div className="basis-3/6">This is empty space</div>
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
                    <Link href={"/mypage"}>My page</Link>
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
                router.push("/login");
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
