import AuthGuard from "features/auth/components/AuthGuard";
import BookmarksByUserId from "features/users/components/BookmarksByUserId";

const BookmarksDashBoard = () => {
  return (
    <AuthGuard>
      <div>
        <BookmarksByUserId />
      </div>
    </AuthGuard>
  );
};

export default BookmarksDashBoard;
