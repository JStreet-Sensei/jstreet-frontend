import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken } from 'next-auth/react';

export default function SignIn({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h2 className="text-center text-2xl font-bold">Login</h2>
      <form method="post" action="/api/auth/callback/credentials" className="m-10 flex flex-col items-center">
        <div className="m-10">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label className="text-sm font-medium mb-1">
            Username
            <input
              name="username"
              type="text"
              className="ml-5 border-black border-2 p-2 rounded-lg"
              placeholder="Username"
            />
          </label>
        </div>
        <div className="m-10">
          <label className="text-sm font-medium mb-1">
            Password
            <input
              name="password"
              type="password"
              className="ml-5 border-black border-2 p-2 rounded-lg"
              placeholder="Password"
              autoComplete="on"
            />
          </label>
        </div>
        <div>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
