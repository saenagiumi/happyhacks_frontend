import { useAuth0 } from "@auth0/auth0-react";
import getUser from "features/auth/api/getUser";
import AuthGuard from "features/auth/components/AuthGuard";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import ActiveTab from "pages/[activeTab]";
import { useEffect, useState } from "react";
import { currentUserAtom } from "state/currentUser";

const LOCAL_STORAGE_KEY = "currentUser";

export default function Home() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [isRegisterd, setIsRegisterd] = useState(false);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const router = useRouter();

  useEffect(() => {
    const checkFirstAccess = async (sub: string | undefined) => {
      // 初回アクセスかどうかを判断する
      const res = await getUser(user?.sub);
      if (res?.sub == null) {
        setIsRegisterd(false);
        router.push("/registration");
      }
      if (res?.sub) {
        setCurrentUser(res);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res)); // ローカルストレージに保存
      }
    };
    if (user) {
      checkFirstAccess(user.sub);
    }
  }, [user, getAccessTokenSilently]);

  return <div>{<ActiveTab />}</div>;
}
