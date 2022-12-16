import { usePosts } from "hooks/usePosts";
import { Post } from "components/Post/Post";

export const PostList = () => {
  const { data, error } = usePosts();

  return (
    <div className="mx-2">
      {data?.map((post) => {
        console.log(post.id);
        return (
          <li key={post.id} className="mb-2">
            <Post
              postedAt={"2022/12/09 22:56"}
              body={
                "data.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrase"
              }
              user={post.name}
            />
          </li>
        );
      })}
    </div>
  );
};
