//This page is for login page.
//User can login and sign up.

import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    //Add authentication functionality here
    if (session) {
      router.push("/select-game");
    }
    router.push("/404");
  };

  return !session ? (
    <>
      <div>
        <h1>Login page.</h1>
        <p>Not signed in</p>
        <br />
        <button onClick={() => signIn()}>Login by other providers </button>
        <br></br>
        <form onSubmit={handleLogin}>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          ></input>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          ></input>
          <button type="submit">Login by your username</button>
        </form>
      </div>
    </>
  ) : (
    <>
      Alredy logged in.
      <Link href={"/select-game"}>Play games!</Link>
    </>
  );
};

export default Login;
