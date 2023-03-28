import { useFetchArray } from "hooks/useFetchArray";
import { API_BASE_URL } from "const/const";
import { Comment } from "features/comments/components/Comment";
import { toZenkaku } from "utils/toZenkaku";
import { mutate } from "swr";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Skeleton } from "@mantine/core";
import CommentFormClickable from "./CommentFormButton";
import { CommentWithUser } from "../types";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "state/currentUser";
import { use } from "react";

type Props = {
  postId: string | string[] | undefined;
  currentUser: any;
  modalHandlers: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
};

const CommentListByPostId = (props: Props) => {
  const currentUser = useAtomValue(currentUserAtom);
  const { user, isLoading, loginWithPopup } = useAuth0();
  const { data, isEmpty } = useFetchArray(
    props.postId ? `${API_BASE_URL}/posts/${props.postId}` : null
  );
  const { data: commentsData, isEmpty: commentsDataIsEmpty } = useFetchArray(
    props.postId
      ? `${API_BASE_URL}/posts/${props.postId}/comments_with_user`
      : null
  );

  mutate(`${API_BASE_URL}/posts/${props.postId}/comments_with_user`);

  return (
    <div>
      {isLoading && user === undefined && (
        <div className="flex mx-3 mt-2.5 mb-5">
          <Skeleton className="px-4" height={38} circle />
          <Skeleton
            className="w-full ml-2 pl-3.5 pt-1.5 "
            height={38}
            radius={20}
          ></Skeleton>
        </div>
      )}

      {!isLoading && user === undefined && (
        <div className="flex justify-center mt-2.5 mb-5">
          <Button
            className="text-emerald-50 font-sans mr-0.2 text-[15px] h-[38px] px-[25px]"
            onClick={() => loginWithPopup()}
            color="green.4"
            size="sm"
            radius={4}
          >
            ログインして回答する
          </Button>
        </div>
      )}

      {user && currentUser.id !== data.user_id && (
        <CommentFormClickable
          currentUser={props.currentUser}
          modalHandlers={props.modalHandlers}
        />
      )}

      {!commentsDataIsEmpty && (
        <h2 className="font-medium text-base text-gray-600 my-1 xs:my-3 ml-2.5">
          {commentsData.length <= 9
            ? toZenkaku(commentsData.length.toString())
            : commentsData.length.toString()}
          件の回答
        </h2>
      )}

      {!commentsDataIsEmpty && (
        <ol className="m-0 p-0">
          {commentsData.map((comment: CommentWithUser) => {
            return (
              <li key={comment.id}>
                <Comment
                  id={comment.id}
                  post_id={comment.post_id.toString()}
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
      )}
    </div>
  );
};

export default CommentListByPostId;
