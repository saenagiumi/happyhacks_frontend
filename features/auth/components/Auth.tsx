import { useAuth0 } from "@auth0/auth0-react";
import { useSetAtom } from "jotai";
import { getUser } from "features/auth/api/getUser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { currentUserAtom } from "state/currentUser";
import { LOCAL_STORAGE_KEY } from "const/const";

type Props = {
  children: React.ReactNode;
};

const Auth = ({ children }: Props) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const setCurrentUser = useSetAtom(currentUserAtom);
  const router = useRouter();

  const checkFirstAccess = async (sub: string | undefined) => {
    const accessToken = await getAccessTokenSilently();
    const res = await getUser({ sub: user?.sub, accessToken });

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
