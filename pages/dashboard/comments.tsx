import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import CommentsByUserId from 'components/Comment/CommentsByUserId';

const CommentsDashBoard = () => {
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
      <CommentsByUserId accessToken={accessToken} />
    </div>
  )
}

export default CommentsDashBoard