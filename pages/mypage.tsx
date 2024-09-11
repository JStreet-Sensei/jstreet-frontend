//User can review their history.

import { getFetchBackendURL } from '@/utils/utils-data';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

const MyPage = () => {
  const { data: session, status } = useSession({ required: true });
  const [response, setResponse] = useState('{}');

  const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log(BACKEND);

  const getUserDetails = async (useToken: boolean) => {
    try {
      const response = await axios({
        method: 'get',
        url: getFetchBackendURL('/api/auth/user/'),
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
          <p>PK: {session.user.pk}</p>
          <p>Username: {session.user.username}</p>
          <p>Email: {session.user.email || 'Not provided'}</p>
          <p>{response}</p>
        </div>
        <div>
          <button onClick={() => getUserDetails(true)}>User details (with token)</button>
          <button onClick={() => getUserDetails(false)}>User details (without token)</button>
          <button onClick={() => signOut({ callbackUrl: '/' })}>Sign out</button>
        </div>
      </div>
    );
  }

  return <></>;
};

export default MyPage;
