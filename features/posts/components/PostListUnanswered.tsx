import Link from "next/link";
import { Post } from "features/posts/components/Post";
import { useFetchArray } from "hooks/useFetchArray";
import { API_BASE_URL } from "const/const";
import { PostWithCommentsCountType } from "../types";

export const PostListUnanswered = () => {
  const { data } = useFetchArray(`${API_BASE_URL}/posts_with_comments_count`);

  // 作成降順ソート
  const sortedData = data ? [...data].sort((a, b) => b.id - a.id) : [];

  // コメント0件
  const filteredData = sortedData.filter((post) => post.comments_count === 0);

  return (
    <ol className="m-0 p-0">
      {filteredData.map((post: PostWithCommentsCountType) => {
        return (
          <li
            key={post.id}
            className="border-0 border-b-[0.5px] border-gray-200 border-solid"
          >
            <Link href={`/posts/${post.id}`} className="no-underline">
              <div className="px-3 xs:px-1.5 xs:hover:bg-slate-100 pb-1.5 ">
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
