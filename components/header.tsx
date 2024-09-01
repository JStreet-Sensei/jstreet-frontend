import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
    const { data: session } = useSession()
    const router = useRouter()

    return (
        <>
            <div className="flex flex-row">
                <div className="basis-1/6">To Homepage</div>
                <div className="basis-3/6">This is empty space</div>
                {session ?
                    <>
                        <div className="basis-1/6 cursor-pointer" onClick={() => { signOut() }} >
                            Log out</div>
                        <div className="basis-1/6 cursor-pointer">
                            <Link href={"/mypage"}>My page</Link>
                        </div>
                    </>
                    :
                    <>
                        <div className="basis-1/6"></div>
                        <div className="basis-1/6 cursor-pointer" onClick={() => { router.push("/login") }}>Log in</div>
                    </>
                }
            </div>
        </>
    )
}

export default Header