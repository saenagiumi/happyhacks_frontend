import { useAuth0 } from "@auth0/auth0-react";
import { LOCAL_STORAGE_KEY } from "const/const";
import { getUser } from "features/auth/api/getUser";
import { useSetAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { currentUserAtom } from "state/currentUser";

type Props = {
  children: React.ReactNode;
};

const Auth = ({ children }: Props) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const setCurrentUser = useSetAtom(currentUserAtom);
  const router = useRouter();

  const checkFirstAccess = async (sub: string | undefined) => {
    const accessToken = await getAccessTokenSilently();
    const res = await getUser({ accessToken, sub: user?.sub });

    if (!res?.sub) {
      router.push("/registration");
      return;
    }

    setCurrentUser(res);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res));
  };

  useEffect(() => {
    if (user) {
      checkFirstAccess(user.sub);
    }
  }, [user, getAccessTokenSilently, router.asPath]);

  return <div>{children}</div>;
};

export default Auth;
