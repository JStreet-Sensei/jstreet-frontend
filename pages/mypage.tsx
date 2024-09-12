//User can review their history.

import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + '/';

const MyPage = () => {
  const { data: session, status } = useSession({ required: true });
  const [response, setResponse] = useState('{}');

  const getUserDetails = async (useToken: boolean) => {
    try {
      const response = await axios({
        method: 'get',
        url: BACKEND_URL + 'api/auth/user/',
        headers: useToken ? { Authorization: 'Bearer ' + session?.access_token } : {},
      });
      setResponse(JSON.stringify(response.data));
    } catch (error: any) {
      setResponse(error.message);
    }
  };

  if (status == 'loading') {
    return <p>Loading</p>;
  }

  if (session) {
    return (
      <div>
        <div>
          <p>User ID: {session.user.pk}</p>
          <p>Username: {session.user.username}</p>
          <p>Email: {session.user.email || 'Not provided'}</p>
          <p>{response}</p>
        </div>
        <div>
          <button onClick={() => getUserDetails(true)}>Show User Information</button>

          {/* Do we need this without token user info? */}
          {/* <button onClick={() => getUserDetails(false)}>User details (without token)</button> */}

          {/* Remove sign out here since we have logout button in header */}
          {/* <button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button> */}
        </div>
      </div>
    );
  }

  return <></>;
};

export default MyPage;
