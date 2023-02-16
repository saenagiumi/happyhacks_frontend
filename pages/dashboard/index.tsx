import React, { useEffect, useState } from 'react'
import PostsByUserId from 'components/Post/PostsByUserId';
import { useAuth0 } from '@auth0/auth0-react';

const index = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");

  // アクセストークン取得
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently({});
        setAccessToken(token);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getToken();
  }, []);

  return (
    <div>
      <PostsByUserId accessToken={accessToken} />
    </div>
  )
}

export default index