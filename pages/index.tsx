import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const HomePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status == "loading") {
    return <p>Loading...</p>;
  }

  // If the user is authenticated redirect to `/profile`
  if (session) {
    router.push("mypage");
    return;
  }

  return (
    <div>
      <p>You are not authenticated.</p>
      <button
        onClick={() => {
          signIn(undefined, { callbackUrl: "/mypage" });
        }}
      >
        Sign In
      </button>
      <Link href={"/selectGame"}> Play game!</Link>
    </div>
  );
};

export default HomePage;
