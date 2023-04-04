import Link from "next/link";
import { Post } from "features/posts/components/Post";
import { useFetchArray } from "hooks/useFetchArray";
import { API_BASE_URL } from "const/const";
import { PostWithCommentsCountType } from "../types";

export const PostListTrend = () => {
  const { data } = useFetchArray(`${API_BASE_URL}/posts_with_comments_count`);

  // postに紐づいたcommentsの件数で降順ソート
  const sortedData = data
    ? [...data].sort((a, b) => b.comments_count - a.comments_count)
    : [];

  return (
    <ol className="m-0 p-0">
      {sortedData.map((post: PostWithCommentsCountType) => {
        return (
          <li
            key={post.id}
            className="border-0 border-b-[0.5px] border-gray-200 border-solid"
          >
            <Link href={`/posts/${post.id}`} className="no-underline pb-1.5">
              <div className="px-3 xs:px-1.5 xs:hover:bg-slate-100">
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
