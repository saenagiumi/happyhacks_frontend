import CommentsByUserId from "features/comments/components/CommentListByUserId";
import AuthGuard from "features/auth/components/AuthGuard";
import { NextSeo } from "next-seo";

const CommentsDashBoard = () => {
  return (
    <>
      <NextSeo
        title={`回答の管理 | HappyHacks`}
        description={`回答の管理 | HappyHacks`}
        openGraph={{
          url: `https://www.happyhacks.app/dashboard/comments`,
          title: `回答の管理 | HappyHacks`,
          description: `回答の管理 | HappyHacks`,
        }}
      />
      <AuthGuard>
        <div className="max-w-screen-md mx-auto">
          <CommentsByUserId />
        </div>
      </AuthGuard>
    </>
  );
};

export default CommentsDashBoard;
