import AuthGuard from "features/auth/components/AuthGuard";
import PostTab from "features/users/components/PostTab";
import { NextSeo } from "next-seo";

const DashBoard = () => {
  return (
    <>
      <NextSeo
        noindex={true}
        nofollow={true}
        title="投稿の管理 | HappyHacks"
        description="投稿の管理 | HappyHacks"
        openGraph={{
          title: "投稿の管理 | HappyHacks",
          description: "投稿の管理 | HappyHacks",
          url: "https://www.happyhacks.app/dashboard",
        }}
      />
      <AuthGuard>
        <div className="mx-auto max-w-screen-sm">
          <h2 className="mx-3 mt-5  text-[20px] text-gray-800">投稿の管理</h2>
          <PostTab />
        </div>
      </AuthGuard>
    </>
  );
};

export default DashBoard;
