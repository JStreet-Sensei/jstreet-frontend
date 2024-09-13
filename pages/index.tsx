import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from '../styles/homepage.module.css';
import FlexModal from '@/components/modal'; 
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
import React, { useState } from 'react';
import SignIn from '@/pages/auth/credentials-signin'; 
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken } from "next-auth/react";
import SignupPage from '@/pages/signup'; 


// Fetch the CSRF token server-side
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  return {
      props: {
          csrfToken,
      },
  };
}


const HomePage = ({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>)  => {
  const router = useRouter();
  const { data: session, status } = useSession();

  //states for modals buttons
  const [signInModalOpen, setSignInModalOpen] = useState<boolean>(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState<boolean>(false);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // If the user is authenticated redirect to `/profile`
  // if (session) {
  //   router.push("mypage");
  //   return;
  // }

   // Modals for buttons
   const openSignInModal = () => setSignInModalOpen(true);
   const closeSignInModal = () => setSignInModalOpen(false);
 
   const openSignUpModal = () => setSignUpModalOpen(true);
   const closeSignUpModal = () => setSignUpModalOpen(false);

  return (
    <>
    <div className={styles.graffiti}>
  <div
    className="relative flex flex-col items-start justify-center min-h-screen bg-[url('/LandingPage/landpage.svg')] bg-no-repeat bg-cover bg-center"
  >
    <div className="flex-1 max-w-xl flex items-start justify-center flex-col z-10 px-4"> {/* Adiciona padding para afastar do canto */}
      <div className="relative z-20 flex flex-row gap-4">
        {/* <button
          onClick={() => {
            signIn(undefined, { callbackUrl: '/mypage' });
          }}
          className="bg-red-700 ml-96 mt-96 text-white font-bold py-4 px-8 rounded-md shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out"
        >
          Sign In
        </button> */}

        {/* Sign In button modal */}
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

        {/* Sign Up button modal */}
               <button
                onClick={openSignUpModal}
                className="bg-red-700 ml-11 mt-96 text-white font-bold py-4 px-8 rounded-md shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out"
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
</div>



      {/* <div className={styles.graffiti}>
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-[url('/LandingPage/wave_top_draw.svg')] bg-no-repeat bg-top bg-contain">
          <div className="absolute inset-0 bg-[url('/LandingPage/wave_bottom_draw.svg')] bg-no-repeat bg-bottom bg-contain z-0" />
          <div className="flex-1 max-w-xl flex items-center justify-center flex-col z-10 ml-96">
            <p className="ml-96">You are not authenticated.</p>
          </div>
        </div>
        <Image src="/LandingPage/oni.svg" alt="Oni" width={400} height={100} className="absolute top-0 left-0 " />
        <Image src="/LandingPage/wild_talk.png" alt="Wild Talk" width={600} height={100} className="mx-auto my-4" />
        <Image src="/LandingPage/street1.jpg" alt="Wild Talk" width={800} height={100} className="mx-auto my-4" />
      </div> */}


      {/* <div className="relative z-20 ">
        <button
          onClick={() => {
            signIn(undefined, { callbackUrl: '/mypage' });
          }}
          className="m-10 bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out ml-96"
        >
          Sign In
        </button>

        <button className="m-10 bg-red-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-red-600 focus:ring-2 focus:ring-opacity-75 transition duration-300 ease-in-out ml-96">
          <Link href={"/signup"}>Sign Up</Link>
        </button>
      </div> */}
    </>
  );
};

export default HomePage;
