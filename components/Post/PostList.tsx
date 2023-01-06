import Link from "next/link";
import { Post } from "components/Post/Post";
import { useFetchArray } from "hooks/useFetchArray";
import { API_URL } from "utils/const";

type Post = {
  id: number;
  title: string;
  body: string;
  user: string;
  created_at: string;
};

export const PostList = () => {
  const { data, error, isLoading, isEmpty } = useFetchArray(`${API_URL}/posts`);

  return (
    <ol className="mx-2">
      {data?.map((post: Post) => {
        return (
          <li key={post.id} className="mb-2">
            <Link href={`/posts/${post.id}`} className="no-underline">
              <Post
                title={post.title}
                body={post.body}
                user={post.user}
                postedAt={post.created_at}
              />
            </Link>
          </li>
        );
      })}
    </ol>
  );
};
