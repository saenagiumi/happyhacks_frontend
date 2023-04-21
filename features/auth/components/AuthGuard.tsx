import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const RedirectToLogin = () => {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return <></>;
};

const AuthGuard = ({ children }: Props) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    return <RedirectToLogin />;
  }

  return <div>{children}</div>;
};

export default AuthGuard;
