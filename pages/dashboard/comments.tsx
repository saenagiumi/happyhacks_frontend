import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CommentsByUserId from "features/comments/components/CommentsByUserId";
import AuthGuard from "features/auth/components/AuthGuard";

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
    <AuthGuard>
      <div>
        <CommentsByUserId accessToken={accessToken} />
      </div>
    </AuthGuard>
  );
};

export default CommentsDashBoard;
