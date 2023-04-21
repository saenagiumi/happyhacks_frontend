import AuthGuard from "features/auth/components/AuthGuard";
import RegistrationForm from "features/auth/components/RegistrationForm";
import { NextSeo } from "next-seo";
import React from "react";

const RegistrationPage = () => {
  return (
    <div>
      <NextSeo
        noindex={true}
        nofollow={true}
        title="ユーザー登録 | HappyHacks"
        description="ユーザー登録 | HappyHacks"
        openGraph={{
          title: "ユーザー登録| HappyHacks",
          description: "ユーザー登録 | HappyHacks",
          url: "https://www.happyhacks.app/registration",
        }}
      />
      <AuthGuard>
        <div className="mx-7 max-w-screen-xs xs:mx-auto">
          <RegistrationForm />
        </div>
      </AuthGuard>
    </div>
  );
};

export default RegistrationPage;
