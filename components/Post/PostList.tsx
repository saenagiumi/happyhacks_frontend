import Link from "next/link";
import { Post } from "components/Post/Post";
import { useFetchArray } from "hooks/useFetchArray";
import { API_URL } from "utils/const";

type Post = {
  id: number;
  title: string;
  body: string;
  name: string;
  created_at: string;
};

export const PostList = () => {
  const { data, error, isLoading, isEmpty } = useFetchArray(`${API_URL}/posts`);  

  return (
    <ol className="mx-1">
      {data?.map((post: Post) => {
        return (
          <li key={post.id} className="pb-1.5 mx-0.5 border-0 border-b border-li-separator-gray border-solid">
            <Link href={`/posts/${post.id}`} className="no-underline">
              <Post
                title={post.title}
                body={post.body}
                name={post.name}
                postedAt={post.created_at}
              />
            </Link>
          </li>
        );
      })}
    </ol>
  );
};
