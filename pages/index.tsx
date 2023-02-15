import { useCallback, useEffect } from "react";

// 認証
import { useAuth0 } from "@auth0/auth0-react";

// Recoil
import { useSetRecoilState } from "recoil";
import tokenState from "recoil/atoms/tokenState";

import ActiveTab from "pages/[activeTab]";

export default function Home() {
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();
  const setToken = useSetRecoilState(tokenState);

  // ログイン完了後にトークンを取得しRecoilへ格納
  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({});
        setToken(accessToken);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getToken();
  }, []);

  return (
    <div>
      <ActiveTab />
    </div>
  );
}
