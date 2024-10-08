import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import FlexModal from '@/components/modal';
import React, { useEffect, useState } from 'react';
import SignIn from '@/pages/auth/credentials-signin';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken } from 'next-auth/react';
import SignupPage from '@/pages/auth/signup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface SignInProps {
  csrfToken?: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken: csrfToken || null,
    },
  };
}

const HomePage = ({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const router = useRouter();
  const { data: session, status } = useSession();

  // States for modals buttons
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
        className="relative flex flex-col items-center justify-center min-h-screen bg-no-repeat bg-center md:hidden bg-[#25dad1]"
        style={{ backgroundImage: "url('/LandingPage/landpage_md.jpeg')", backgroundSize: '80%' }}
      >
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex flex-col items-center gap-4 z-10 mt-16">
          <div className="flex flex-row gap-4 items-center justify-center">
            <button
              onClick={openSignInModal}
              className="bg-red-700 h-8 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              Login
            </button>
            {signInModalOpen && (
              <FlexModal closeModal={closeSignInModal} title="" >
                <SignIn />
              </FlexModal>
            )}
            <span className="text-white font-bold py-4 px-8 text-2xl">OR</span>
            <button
              onClick={openSignUpModal}
              className="bg-red-700 h-8 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out"
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
        className="relative flex flex-col items-start justify-center min-h-screen bg-no-repeat bg-[#25dbd1] bg-center hidden md:flex md:bg-contain"
        style={{ backgroundImage: "url('/LandingPage/landpage.svg')", backgroundSize: 'cover' }}
      >
        <div className="absolute bottom-32 left-16 flex flex-row gap-4 items-center">
          <button
            onClick={openSignInModal}
            className="bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out"
          >
            Login
          </button>
          {signInModalOpen && (
            <FlexModal closeModal={closeSignInModal} title="">
              <SignIn />
            </FlexModal>
          )}
          <span className="text-white font-bold text-2xl">OR</span>
          <button
            onClick={openSignUpModal}
            className="bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out"
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
