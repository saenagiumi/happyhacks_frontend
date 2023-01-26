import { useAuth0 } from "@auth0/auth0-react";
import PostForm from "components/Post/PostForm";

const RedirectToLogin = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return <></>;
};

const NewPost = () => {
  const { isAuthenticated, isLoading } = useAuth0();

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
          <PostForm />
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
