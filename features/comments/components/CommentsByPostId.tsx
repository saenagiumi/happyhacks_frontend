import { useFetchArray } from "hooks/useFetchArray";
import { API_BASE_URL } from "const/const";
import { Comment } from "features/comments/components/Comment";
import { toZenkaku } from "utils/toZenkaku";
import { mutate } from "swr";
import useToggleLike from "../hooks/useToggleLike";

export const CommentsByPostId = (props: {
  id: string | string[] | undefined;
  accessToken: string;
}) => {
  const { data, isEmpty } = useFetchArray(
    props.id ? `${API_BASE_URL}/posts/${props.id}/comments_with_user` : ""
  );
  mutate(`${API_BASE_URL}/posts/${props.id}/comments_with_user`);

  if (isEmpty) {
    return (
      <p className=" text-gray-500 my-4 ml-1">
        あなたの経験や対策を教えてあげましょう
      </p>
    );
  }

  return (
    <div>
      <h2 className="font-medium text-base text-gray-600 my-4 ml-1">
        {data?.length <= 9
          ? toZenkaku(data?.length.toString())
          : data?.length.toString()}
        件のコメント
      </h2>

      <ol className="space-y-2">
        {data?.map((comment: any) => {
          return (
            <li key={comment.id}>
              <Comment
                id={comment.id}
                title={comment.title}
                body={comment.body}
                name={comment.name}
                iconSrc={comment.picture}
                postedAt={comment.created_at}
                accessToken={props.accessToken}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
};
