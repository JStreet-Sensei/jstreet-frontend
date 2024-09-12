import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import axios from "axios";

const SIGNUP_URL = "/api/signup"

export const SignupPage = () => {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    const handlePost = async (event: FormEvent) => {
        event.preventDefault()
        console.log(username, "/", password)
        const fetched = await fetch(SIGNUP_URL, {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
                passwordagain: passwordAgain
            })
        })
        if (fetched.status === 200) {
            router.push("/")
        }
    }

    return (
        <>
            <Link href="/">Home</Link><br />
            <h2>Sign up</h2>
            <form method='POST' onSubmit={handlePost}>
                <input
                    minLength={3}
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                ></input>
                <input
                    minLength={5}
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                ></input>
                <input
                    minLength={5}
                    id="passwordAgain"
                    type="password"
                    value={passwordAgain}
                    onChange={(e) => setPasswordAgain(e.target.value)}
                    placeholder="Password Again"
                ></input>
                <input type="submit" value="Signup" />
            </form>
        </>
    );
}

export default SignupPage