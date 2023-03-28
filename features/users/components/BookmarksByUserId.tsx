import { useFetchArray } from "hooks/useFetchArray";
import { API_BASE_URL } from "const/const";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "state/currentUser";
import { Comment } from "../types";

const BookmarksByUserId = () => {
  const currentUser = useAtomValue(currentUserAtom);
  const isCurrentUserSet = currentUser.id !== "";

  const { data } = useFetchArray(
    isCurrentUserSet
      ? `${API_BASE_URL}/users/${currentUser.id}/bookmarks`
      : null
  );

  return (
    <div className="max-w-screen-md mx-auto mt-10">
      <h2 className="mx-3 mb-3  text-gray-800 text-[20px]">
        ブックマークした回答
      </h2>

      {data?.length == 0 && (
        // まだ投稿がない場合
        <div>
          <p className="pl-3 mb-5">まだブックマークがありません</p>
        </div>
      )}

      {data?.length > 0 && (
        // 投稿がある場合
        <ul className="mx-3">
          {data?.map((comment: Comment) => (
            <Link
              className="no-underline"
              href={`/posts/${comment.post_id}#comments/${comment.id}`}
              key={comment.id}
            >
              <li className="border-0 border-b-[1px] pb-6 xs:px-7 py-2 xs:py-5  border-gray-200 border-solid xs:hover:bg-slate-100">
                <div className="flex items-center justify-between pt-2 pb-3">
                  <h3 className="text-[16px] text-gray-800">{comment.title}</h3>
                </div>
                <p className="pb-3">{comment.body}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarksByUserId;
