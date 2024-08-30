//This page is for login page.
//User can login and sign up.

import React, { useState, useEffect, FormEvent } from "react";
import SelectGame from "./selectGame";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { data: session } = useSession()
  const router = useRouter()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    //Add authentication functionality here
    if (true) {
      console.log(e)
      router.push("/selectGame")
    }
    router.push("/404")
  }

  return (!session ? (
    <>
      <p>Not signed in</p>
      <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  ) : (
    <>
      <div>
        <h1>Login page.</h1>
        <form onSubmit={handleLogin}>
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"></input>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
          <button type="submit" >Login</button>
        </form>
      </div>
    </>
  ))
}



export default Login