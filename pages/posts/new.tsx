import { useAuth0 } from "@auth0/auth0-react";
import PostForm from "components/Post/PostForm";
import { useEffect, useState } from "react";

const RedirectToLogin = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return <></>;
};

const NewPost = () => {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();
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
  }, [getAccessTokenSilently, user?.sub]);

  return (
    <>
      {isAuthenticated ? (
        //認証済み時はログイン後の画面を表示
        <div>
          <div className="mx-3">
            <h3 className="text-md text-gray-600">
              質問内容の入力
              <span className="text-xs text-red-400"> ＊は入力必須です</span>
            </h3>
            <p className="text-sm text-gray-600">気軽に質問してみましょう</p>
          </div>
          <PostForm accessToken={accessToken} />
        </div>
      ) : isLoading ? (
        //ログイン試行中はローディング画面を表示
        <div>Loading...</div>
      ) : (
        //未認証時はAuth0のログイン画面にリダイレクト
        <RedirectToLogin />
      )}
    </>
  );
};

export default NewPost;
