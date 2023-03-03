import { useFetchArray } from "hooks/useFetchArray";
import { API_BASE_URL } from "const/const";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "state/currentUser";

const BookmarksByUserId = () => {
  const user = useAtomValue(currentUserAtom);

  const { data, error, isLoading, isEmpty } = useFetchArray(
    `${API_BASE_URL}/users/${user.id}/bookmarks`
  );

  return (
    <div>
      <h2 className="mx-3 mb-3  text-gray-800 text-[20px]">
        ブックマークしたコメント
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
          {data?.map((comment: any) => (
            <Link className="no-underline" href={`/posts/${comment.post_id}#comments/${comment.id}`}>
              <li
                key={comment.id}
                className="border-0 border-b-[1px] border-gray-200 border-solid"
              >
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
