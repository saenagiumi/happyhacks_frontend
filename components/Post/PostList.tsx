import { usePosts } from "hooks/usePosts";
import { CommentHtml } from "components/Post/Post";

export const PostList = () => {
  const { data, error } = usePosts();

  return (
    <div className="mx-2">
      {data?.map((data) => {
        return (
          <ol>
            <li key={data.id} className="mb-2">
              <CommentHtml
                postedAt={"2022/12/09 22:56"}
                body={"data.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrasedata.company.catchPhrase"}
                user={data.name}
              />
            </li>
          </ol>
        );
      })}
    </div>
  );
};
