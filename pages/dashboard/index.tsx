import React, { useEffect, useState } from "react";
import PostsByUserId from "features/posts/components/PostsByUserId";
import { useAuth0 } from "@auth0/auth0-react";
import AuthGuard from "features/auth/components/AuthGuard";

const DashBoard = () => {
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
        <PostsByUserId accessToken={accessToken} />
      </div>
    </AuthGuard>
  );
};

export default DashBoard;
