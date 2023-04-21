import AuthGuard from "features/auth/components/AuthGuard";
import ProfileForm from "features/users/components/ProfileForm";
import { NextSeo } from "next-seo";

const ProfilePage = () => {
  return (
    <>
      <NextSeo
        noindex={true}
        nofollow={true}
        title={`${"プロフィール編集"} | HappyHacks`}
        description={`${"プロフィール編集"} | HappyHacks`}
      />

      <AuthGuard>
        <div className="mx-8 max-w-screen-xs xs:mx-auto">
          <ProfileForm />
        </div>
      </AuthGuard>
    </>
  );
};

export default ProfilePage;
