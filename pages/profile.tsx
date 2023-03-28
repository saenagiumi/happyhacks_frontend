import AuthGuard from "features/auth/components/AuthGuard";
import ProfileForm from "features/users/components/ProfileForm";
import { NextSeo } from "next-seo";
import Head from "next/head";

const ProfilePage = () => {
  return (
    <>
      <NextSeo
        title={`${"プロフィール編集"} | HappyHacks`}
        description={`${"プロフィール編集"} | HappyHacks`}
      />

      <AuthGuard>
        <div className="mx-8 xs:mx-auto max-w-screen-xs">
          <ProfileForm />
        </div>
      </AuthGuard>
    </>
  );
};

export default ProfilePage;
