import { useEffect } from "react";

// 認証
import { useAuth0 } from "@auth0/auth0-react";

// Recoil
import { useSetRecoilState } from "recoil";
import tokenState from "recoil/atoms/tokenState";

import ActiveTab from "pages/[activeTab]";

export default function Home() {
  console.log(process.env["NEXT_PUBLIC_BASE_URL"]);
  console.log(process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"]);
  console.log(process.env["NEXT_PUBLIC_AUTH0_DOMAIN"]);
  console.log(process.env["NEXT_APP_REST_URL"]);
  console.log(process.env["NEXT_PUBLIC_AUTH0_AUDIENCE"]);
  
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
      <ActiveTab />
    </div>
  );
}
