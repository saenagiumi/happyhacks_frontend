import { useFetchArray } from "hooks/useFetchArray";
import { API_URL } from "utils/const";
import { Comment } from "components/Comment/Comment";
import { toZenkaku } from "components/libs/toZenkaku";

export const CommentListByPostId = (props: { id: string }) => {
  const { data, error, isLoading, isEmpty } = useFetchArray(
    `${API_URL}/posts/${props.id}/comments_with_user`
  );  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isEmpty) {
    return <p className=" text-gray-500 my-4 ml-1">あなたの経験や対策を教えてあげましょう</p>;
  }

  return (
    <div>
      <h2 className="font-medium text-base text-gray-600 my-4 ml-1">
        {data.length <= 9
          ? toZenkaku(data.length.toString())
          : data.length.toString()}
        件のコメント
      </h2>

      <ol className="space-y-2">
        {data?.map((comment: any) => {
          return (
            <li key={comment.id}>
              <Comment
                title={comment.title}
                body={comment.body}
                name={comment.name}
                iconSrc={comment.picture}
                postedAt={comment.created_at}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
};
