import { useAuth0 } from "@auth0/auth0-react";
import RegistrationForm from "features/auth/components/RegistrationForm";
import React from "react";

const Registration = () => {
  const { user } = useAuth0();
  return (
    <div>
      <RegistrationForm user={user} />
    </div>
  );
};

export default Registration;
