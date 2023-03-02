import { useAuth0 } from "@auth0/auth0-react";
import getUser from "features/auth/api/getUser";
import { useRouter } from "next/router";
import ActiveTab from "pages/[activeTab]";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [isRegisterd, setIsRegisterd] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkFirstAccess = async (sub: string | undefined) => {
      // 初回アクセスかどうかを判断する
      const res = await getUser(user?.sub);
      if (res?.sub == null) {
        setIsRegisterd(false);
        router.push("/registration");
      }
    };
    if (user) {
      checkFirstAccess(user.sub);
    }
  }, [user, getAccessTokenSilently]);

  return <div>{<ActiveTab />}</div>;
}
