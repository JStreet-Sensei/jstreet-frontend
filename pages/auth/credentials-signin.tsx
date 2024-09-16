import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

export default function SignIn() {
  const session = useSession();
  const [csrfToken, setCsrfToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function fetchCsrfToken() {
      const result = await getCsrfToken();
      if (!result) {
        throw new Error('Can not sign in without CSRF token');
      }
      setCsrfToken(result);
    }
    if (session.status !== 'loading') {
      fetchCsrfToken();
    }
  }, [session.status]);

  const handlePost = (event: FormEvent) => {
    event.preventDefault();
    signIn('credentials', {
      username,
      password,
      redirect: false,
      callbackUrl: '/select-game',
    })
      .then((response) => {
        if (response?.status === 401) {
          toast.error('Wrong username or password. Try again.', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      })
      .catch((error) => {
        console.log(1, error);
        toast.error('Something went wrong.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  return (
    <>
      <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
      <form method="post" onSubmit={handlePost} className="flex flex-col items-center w-full max-w-sm mx-auto">
        <div className="mb-6 w-full">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label className="block text-sm font-medium mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            className="border-black border-2 p-2 rounded-lg w-full"
            placeholder="Username"
          />
        </div>
        <div className="mb-6 w-full">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border-black border-2 p-2 rounded-lg w-full"
            placeholder="Password"
            autoComplete="on"
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-[var(--turquoise)] text-[var(--blue-dark)] font-semibold 
            py-3 px-10 rounded-lg shadow-md hover:bg-[var(--magenta)] 
            hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 m-4 w-40"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}
