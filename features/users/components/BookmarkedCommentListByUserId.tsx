import Link from "next/link";

import { Comment } from "../types";

const BookmarkedCommentListByUserId = ({
  comments,
}: {
  comments: Comment[];
}) => {
  return (
    <div>
      {!comments && (
        <div>
          <p className="mb-5 pl-3">まだブックマークがありません</p>
        </div>
      )}

      {comments && (
        <ul className="mx-3">
          {comments.map((comment: Comment) => (
            <Link
              className="no-underline"
              href={`/posts/${comment.post_id}#comments/${comment.id}`}
              key={comment.id}
            >
              <li className="border-0 border-b-[1px] border-solid border-gray-200 py-2 pb-6  xs:px-7 xs:py-5 xs:hover:bg-slate-100">
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

export default BookmarkedCommentListByUserId;
