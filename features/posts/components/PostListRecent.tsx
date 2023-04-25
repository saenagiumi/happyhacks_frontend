import { API_BASE_URL } from "const/const";
import { Post } from "features/posts/components/Post";
import { useFetchArray } from "hooks/useFetchArray";
import Link from "next/link";

import { PostReturnType } from "../types";
import PostsLayout from "./PostsLayout";

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
            className="border-0 border-t-[0.5px] border-solid border-gray-200"
          >
            <Link href={`/posts/${post.id}`} className="pb-1.5 no-underline">
              <PostsLayout post={post} />
            </Link>
          </li>
        );
      })}
    </ol>
  );
};
