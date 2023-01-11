import { useFetchArray } from "hooks/useFetchArray";
import { API_URL } from "utils/const";
import { Comment } from "components/Comment/Comment";

export const CommentListByPostId = (props: { id: string }) => {
  const { data, error, isLoading, isEmpty } = useFetchArray(
    `${API_URL}/posts/${props.id}/comments`
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isEmpty) {
    return <p className=" text-gray-500">あなたの知見を共有してあげましょう</p>;
  }

  return (
      <ol className="space-y-2">
        {data?.map((comment: any) => {
          
          return (
            <li key={comment.id}>
              <Comment
                title={comment.title}
                body={comment.body}
                userId={comment.user_id}
                postedAt={comment.created_at}
              />
            </li>
          );
        })}
      </ol>
  );
};
