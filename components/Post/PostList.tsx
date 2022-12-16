// import { usePosts } from "hooks/usePosts";
import { Post } from "components/Post/Post";
import { useFetchArray } from "hooks/useFetchArray";
import { API_URL } from "utils/const";

export const PostList = () => {
  const { data, error, isLoading, isEmpty } = useFetchArray(`${API_URL}/posts`);
  console.log(data);
  

  return (
    <ol className="mx-2">
      {data?.map((post) => {
        console.log(post.id);
        return (
          <li key={post.id} className="mb-2">
            <Post
              title={post.title}
              body={post.body}
              author={post.author}
              postedAt={"2022/12/09 22:56"}
            />
          </li>
        );
      })}
    </ol>
  );
};
