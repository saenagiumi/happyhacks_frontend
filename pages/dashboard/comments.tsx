import AuthGuard from "features/auth/components/AuthGuard";
import CommentsByUserId from "features/comments/components/CommentListByUserId";
import { NextSeo } from "next-seo";

const CommentsDashBoard = () => {
  return (
    <>
      <NextSeo
        noindex={true}
        nofollow={true}
        title="回答の管理 | HappyHacks"
        description="回答の管理 | HappyHacks"
        openGraph={{
          title: "回答の管理 | HappyHacks",
          description: "回答の管理 | HappyHacks",
          url: "https://www.happyhacks.app/dashboard/comments",
        }}
      />
      <AuthGuard>
        <div className="mx-auto max-w-screen-sm">
          <h2 className="mx-3 my-5 text-[20px] text-gray-800">回答の管理</h2>
          <CommentsByUserId />
        </div>
      </AuthGuard>
    </>
  );
};

export default CommentsDashBoard;
