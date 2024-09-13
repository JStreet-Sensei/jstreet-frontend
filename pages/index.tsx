import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/homepage.module.css';
import FlexModal from '@/components/modal';
import React, { useState } from 'react';
import SignIn from '@/pages/auth/credentials-signin';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken } from "next-auth/react";
import SignupPage from '@/pages/signup';

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
        className="relative flex flex-col items-start justify-center min-h-screen bg-[url('/LandingPage/landpage.svg')] bg-no-repeat bg-cover bg-center"
      >
        <div className="flex-1 max-w-xl flex items-start justify-center flex-col z-10 px-4"> {/* Adiciona padding para afastar do canto */}
          <div className="relative z-20 flex flex-row gap-4">
            <button
              onClick={openSignInModal}
              className="bg-red-700 ml-96 mt-96 text-white font-bold py-4 px-8 rounded-md shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out"
            >
              Sign In
            </button>
            {signInModalOpen && (
              <FlexModal closeModal={closeSignInModal} title="">
                <SignIn csrfToken={csrfToken} />
              </FlexModal>
            )}

            <button onClick={openSignUpModal} className="bg-red-700 ml-11 mt-96 text-white font-bold py-4 px-8 rounded-md shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out">
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

      <div className='relative md:flex flex-col items-start justify-center min-h-screen
        bg-no-repeat bg-[#25dbd1] bg-center hidden md:visible bg-contain' style={{ backgroundImage: "url('/LandingPage/landpage.svg')", backgroundSize: "100%" }}>
        <div className="fixed z-20 flex flex-row gap-4 bottom-72 left-40 items-center justify-center ">
          <button
            onClick={openSignInModal}
            className="bg-red-700 h-10 text-white font-bold py-4 px-8 rounded-full left-2
              bottom-1 shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out"
          >
            Sign In
          </button>
          {signInModalOpen && (
            <FlexModal closeModal={closeSignInModal} title="">
              <SignIn csrfToken={csrfToken} />
            </FlexModal>
          )}
          <span className=" h-10  text-white font-bold py-4 px-8 text-2xl
              ">OR</span>
          <button className="bg-red-700 h-10 rounded-full  left-80
              bottom-1  text-white font-bold py-4 px-8  shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out"
            onClick={openSignUpModal}>
            Sign Up
          </button>
          {signUpModalOpen && (
            <FlexModal closeModal={closeSignUpModal} title="">
              <SignupPage />
            </FlexModal>
          )}
        </div>
      </div>

    </>
  );
};

export default HomePage;
