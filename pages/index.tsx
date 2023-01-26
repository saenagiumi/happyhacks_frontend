import { useEffect } from "react";

// 投稿一覧
import { PostList } from "components/Post/PostList";

// 認証
import { useAuth0 } from "@auth0/auth0-react";

// Recoil
import { useSetRecoilState } from "recoil";
import tokenState from "recoil/atoms/tokenState";

export default function Home() {
  const { getAccessTokenSilently } = useAuth0();
  const setToken = useSetRecoilState(tokenState);

  // ログイン時にトークンを取得しRecoilへ格納
  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getToken();
  }, []);

  return (
    <div>
      <PostList />
    </div>
  );
}
