import AuthGuard from "features/auth/components/AuthGuard";
import RegistrationForm from "features/auth/components/RegistrationForm";
import { NextSeo } from "next-seo";
import React from "react";

const RegistrationPage = () => {
  return (
    <div>
      <NextSeo
        title={`ユーザー登録 | HappyHacks`}
        description={`ユーザー登録 | HappyHacks`}
        openGraph={{
          url: `https://www.happyhacks.app/registration`,
          title: `ユーザー登録| HappyHacks`,
          description: `ユーザー登録 | HappyHacks`,
        }}
      />
      <AuthGuard>
        <div className="max-w-screen-xs mx-7 xs:mx-auto">
          <RegistrationForm />
        </div>
      </AuthGuard>
    </div>
  );
};

export default RegistrationPage;
