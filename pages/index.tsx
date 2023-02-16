import { useAuth0 } from "@auth0/auth0-react";
import ActiveTab from "pages/[activeTab]";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");

  console.log({ user, accessToken });

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
    console.log("走ってるよ");
  }, [getAccessTokenSilently, user?.sub]);

  return <div>{/* <ActiveTab /> */}</div>;
}
