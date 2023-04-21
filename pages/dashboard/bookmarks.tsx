import AuthGuard from "features/auth/components/AuthGuard";
import BookmarkTab from "features/users/components/BookmarkTab";
import { NextSeo } from "next-seo";

const BookmarksDashBoard = () => {
  return (
    <>
      <NextSeo
        noindex={true}
        nofollow={true}
        title="ブックマーク | HappyHacks"
        description="ブックマーク | HappyHacks"
        openGraph={{
          title: "ブックマーク | HappyHacks",
          description: "利用ブックマーク規約 | HappyHacks",
          url: "https://www.happyhacks.app/bookmarks",
        }}
      />
      <AuthGuard>
        <div className="mx-auto max-w-screen-sm">
          <h2 className="mx-3 mt-5 text-[20px] text-gray-800">
            ブックマークの管理
          </h2>
          <BookmarkTab />
        </div>
      </AuthGuard>
    </>
  );
};

export default BookmarksDashBoard;
