import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { getUser } from "features/auth/api/getUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import { currentUserAtom } from "state/currentUser";

// import { API_BASE_URL } from "utils/const";

const LOCAL_STORAGE_KEY = "currentUser";

const RedirectToLogin = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return <></>;
};
const RedirectToRegistration = () => {
  const router = useRouter();
  router.push("/registration");
  return <></>;
};

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isCheckingRegistration, setIsCheckingRegistration] = useState(true);


  useEffect(() => {
    const checkIsRegistered = async (sub: string | undefined) => {
      // 初回アクセスかどうかを判断する
      if (isAuthenticated && user) {
        const res = await getUser(user.sub);

        if (res?.sub) {
          setIsRegistered(true);
          setCurrentUser(res);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res)); // ローカルストレージに保存
        }
        setIsCheckingRegistration(false);
      }
    };

    // ローカルストレージから値を取得する
    const storedCurrentUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }

    if (user) {
      checkIsRegistered(user.sub);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading || isCheckingRegistration) {
    return <div>isLoading</div>;
  }

  if (isAuthenticated && isRegistered) {
    return <>{children}</>;
  }

  if (isAuthenticated && !isRegistered) {
    return <RedirectToRegistration />;
  }

  return <RedirectToLogin />;
};

export default AuthGuard;
