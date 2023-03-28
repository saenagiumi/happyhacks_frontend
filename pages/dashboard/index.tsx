import PostsByUserId from "features/posts/components/PostsByUserId";
import AuthGuard from "features/auth/components/AuthGuard";
import { NextSeo } from "next-seo";

const DashBoard = () => {
  return (
    <>
      <NextSeo
        title={`質問の管理 | HappyHacks`}
        description={`質問の管理 | HappyHacks`}
        openGraph={{
          url: `https://www.happyhacks.app/dashboard`,
          title: `質問の管理 | HappyHacks`,
          description: `質問の管理 | HappyHacks`,
        }}
      />
      <AuthGuard>
        <div className="max-w-screen-md mx-auto">
          <PostsByUserId />
        </div>
      </AuthGuard>
    </>
  );
};

export default DashBoard;
