import Link from "next/link";
import { Post } from "components/Post/Post";
import { useFetchArray } from "hooks/useFetchArray";
import { API_URL } from "utils/const";

type Post = {
  id: number;
  title: string;
  body: string;
  name: string;
  picture: string;
  created_at: string;
  comments_count: number;
};

export const PostsOrderByCommentsLength = () => {
  const { data, error, isLoading, isEmpty } = useFetchArray(
    `${API_URL}/posts_with_comments_count`
  );

  // postに紐づいたcommentsの件数で降順ソート
  const sortedData = data
    ? [...data].sort((a, b) => b.comments_count - a.comments_count)
    : [];

  return (
    <ol>
      {sortedData.map((post: Post) => {
        return (
          <li
            key={post.id}
            className="pb-1.5 border-0 border-b-4  border-gray-200 border-solid"
          >
            <Link href={`/posts/${post.id}`} className="no-underline">
              <div className="mx-1.5">
                <Post
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
