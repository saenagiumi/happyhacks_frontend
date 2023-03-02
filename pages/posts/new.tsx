import { useAuth0 } from "@auth0/auth0-react";
import PostForm from "features/posts/components/PostForm";
import AuthGuard from "features/auth/components/AuthGuard";
import { useEffect, useState } from "react";

const NewPost = () => {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
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
    <>
      <AuthGuard>
        <div className="mx-3">
          <h3 className="text-md text-gray-600">
            質問内容の入力
            <span className="text-xs text-red-400"> ＊は入力必須です</span>
          </h3>
          <p className="text-sm text-gray-600">気軽に質問してみましょう</p>
        </div>
        <PostForm accessToken={accessToken} />
      </AuthGuard>
    </>
  );
};

export default NewPost;
