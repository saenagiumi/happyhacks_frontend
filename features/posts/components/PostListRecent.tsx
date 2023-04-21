import { API_BASE_URL } from "const/const";
import { Post } from "features/posts/components/Post";
import { useFetchArray } from "hooks/useFetchArray";
import Link from "next/link";

import { PostReturnType } from "../types";

export const PostListRecent = () => {
  const { data } = useFetchArray(`${API_BASE_URL}/posts`);

  // 作成降順ソート
  const sortedData = data ? [...data].sort((a, b) => b.id - a.id) : [];

  return (
    <ol className="m-0 p-0">
      {sortedData?.map((post: PostReturnType) => {
        return (
          <li
            key={post.id}
            className="border-0 border-t-[0.5px] border-gray-200 border-solid"
          >
            <Link href={`/posts/${post.id}`} className="no-underline pb-1.5">
              <div className="px-5 py-1 xs:px-1.5 xs:hover:bg-slate-100">
                <Post
                  id={post.id.toString()}
                  userId={post.user_id.toString()}
                  title={post.title}
                  body={post.body}
                  name={post.name}
                  iconSrc={post.picture}
                  postedAt={post.created_at}
                  comments_count={post.comments_count}
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ol>
  );
};
