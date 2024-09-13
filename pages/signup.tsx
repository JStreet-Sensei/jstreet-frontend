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
            <h2 className="text-center text-2xl font-bold">Sign Up</h2>
            <form method="POST" onSubmit={handlePost} className="m-10 flex flex-col items-center">
                <div className="mb-5 w-full max-w-xs">
                    <label htmlFor="username" className="block text-sm font-medium mb-1">
                        Username
                        <input
                            id="username"
                            type="text"
                            minLength={3}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="mt-1 block w-full border-black border-2 p-2 rounded-lg"
                        />
                    </label>
                </div>
                <div className="mb-5 w-full max-w-xs">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Password
                        <input
                            id="password"
                            type="password"
                            minLength={5}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="mt-1 block w-full border-black border-2 p-2 rounded-lg"
                        />
                    </label>
                </div>
                <div className="mb-5 w-full max-w-xs">
                    <label htmlFor="passwordAgain" className="block text-sm font-medium mb-1">
                        Password Again
                        <input
                            id="passwordAgain"
                            type="password"
                            minLength={5}
                            value={passwordAgain}
                            onChange={(e) => setPasswordAgain(e.target.value)}
                            placeholder="Password Again"
                            className="mt-1 block w-full border-black border-2 p-2 rounded-lg"
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className="bg-[var(--turquoise)] text-[var(--blue-dark)] font-semibold py-3 px-10 rounded-lg shadow-md hover:bg-[var(--magenta)] hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                >
                    Sign Up
                </button>
            </form>
        </>
    )
}

export default SignupPage