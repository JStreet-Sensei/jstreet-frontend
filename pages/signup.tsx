import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const SignupPage = () => {
    const router = useRouter()
    const [canSignUp, setCanSignUp] = useState<string>("waiting")
    return (
        <>
            <Link href="/">Home</Link><br />
            <h2>Sign up</h2>
            <form action='/api/signup' method='POST'>
                <input minLength={3} name="username" id="username" type="text" placeholder='username' required></input><br />
                <input minLength={5} name="password" id="password" type="password" placeholder='password' required></input><br />
                <input minLength={5} name="passwordagain" id="passwordagain" type="password" placeholder='password again' required></input><br />
                <input type="submit" value="Signup" />
            </form>
        </>
    );
}

export default SignupPage