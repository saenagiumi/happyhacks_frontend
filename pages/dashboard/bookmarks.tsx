import AuthGuard from "features/auth/components/AuthGuard";
import BookmarksByUserId from "features/users/components/BookmarksByUserId";
import { NextSeo } from "next-seo";

const BookmarksDashBoard = () => {
  return (
    <>
      <NextSeo
        title={`ブックマーク | HappyHacks`}
        description={`ブックマーク | HappyHacks`}
        openGraph={{
          url: `https://www.happyhacks.app/bookmarks`,
          title: `ブックマーク | HappyHacks`,
          description: `利用ブックマーク規約 | HappyHacks`,
        }}
      />
      <AuthGuard>
        <div className="max-w-screen-sm mx-auto">
          <BookmarksByUserId />
        </div>
      </AuthGuard>
    </>
  );
};

export default BookmarksDashBoard;
