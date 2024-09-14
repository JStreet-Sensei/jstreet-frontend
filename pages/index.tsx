import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import FlexModal from '@/components/modal';
import React, { useEffect, useState } from 'react';
import SignIn from '@/pages/auth/credentials-signin';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken } from 'next-auth/react';
import SignupPage from '@/pages/signup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken,
    },
  };
}

const HomePage = ({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  //states for modals buttons
  const [signInModalOpen, setSignInModalOpen] = useState<boolean>(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (session === null && router.asPath.includes('CredentialsSignin')) {
      toast.error('Incorrect username or password', {
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
    if (session) {
      router.push('/select-game');
    }
    return;
  }, [session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const openSignInModal = () => setSignInModalOpen(true);
  const closeSignInModal = () => setSignInModalOpen(false);

  const openSignUpModal = () => setSignUpModalOpen(true);
  const closeSignUpModal = () => setSignUpModalOpen(false);

  return (
    <>
      <div
        className="relative flex flex-col items-start justify-center min-h-screen
        bg-no-repeat bg-center md:hidden bg-[#25dad1] "
        style={{ backgroundImage: "url('/LandingPage/landpage_md.jpeg')", backgroundSize: '80%' }}
      >
        <div className="flex-1 min-w-full flex items-start justify-center flex-col z-10">
          <div className="fixed z-20 flex flex-row gap-4 bottom-72 left-4 items-center justify-center ">
            <button
              onClick={openSignInModal}
              className="bg-red-700 h-10 text-white font-bold py-4 px-8 rounded-full left-2
              bottom-1 shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              Login
            </button>
            {signInModalOpen && (
              <FlexModal closeModal={closeSignInModal} title="">
                <SignIn csrfToken={csrfToken} />
              </FlexModal>
            )}
            <span className=" h-10  text-white font-bold py-4 px-8 text-2xl">OR</span>
            <button
              onClick={openSignUpModal}
              className="bg-red-700 h-10 rounded-full  left-80
              bottom-1  text-white font-bold py-4 px-8  shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              Sign Up
            </button>
            {signUpModalOpen && (
              <FlexModal closeModal={closeSignUpModal} title="">
                <SignupPage />
              </FlexModal>
            )}
          </div>
        </div>
      </div>

      <div
        className="relative md:flex flex-col items-start justify-center min-h-screen
        bg-no-repeat bg-[#25dbd1] bg-center hidden md:visible bg-contain"
        style={{ backgroundImage: "url('/LandingPage/landpage.svg')", backgroundSize: '100%' }}
      >
        <div className="fixed z-20 flex flex-row gap-4 bottom-72 left-40 items-center justify-center ">
          <button
            onClick={openSignInModal}
            className="bg-red-700 h-10 text-white font-bold py-4 px-8 rounded-full left-2
              bottom-1 shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out"
          >
            Login
          </button>
          {signInModalOpen && (
            <FlexModal closeModal={closeSignInModal} title="">
              <SignIn csrfToken={csrfToken} />
            </FlexModal>
          )}
          <span
            className=" h-10  text-white font-bold py-4 px-8 text-2xl
              "
          >
            OR
          </span>
          <button
            className="bg-red-700 h-10 rounded-full  left-80
              bottom-1  text-white font-bold py-4 px-8  shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out"
            onClick={openSignUpModal}
          >
            Sign Up
          </button>
          {signUpModalOpen && (
            <FlexModal closeModal={closeSignUpModal} title="">
              <SignupPage />
            </FlexModal>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default HomePage;
