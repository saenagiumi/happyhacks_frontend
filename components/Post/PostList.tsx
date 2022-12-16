import { usePosts } from "hooks/usePosts";
import { Post } from "components/Post/Post";

export const PostList = () => {
  const { data, error } = usePosts();

  return (
    <ol className="mx-2">
      {data?.map((post) => {
        console.log(post.id);
        return (
          <li key={post.id} className="mb-2">
            <Post
              title={"title"}
              body={
                "data.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrase"
              }
              author={"authoname"}
              postedAt={"2022/12/09 22:56"}
            />
          </li>
        );
      })}
    </ol>
  );
};
