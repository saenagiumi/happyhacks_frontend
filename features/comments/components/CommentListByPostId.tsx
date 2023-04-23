import { useAuth0 } from "@auth0/auth0-react";
import { Button, Skeleton } from "@mantine/core";
import { API_BASE_URL } from "const/const";
import { Comment } from "features/comments/components/Comment";
import { User } from "features/users/types";
import { useFetchArray } from "hooks/useFetchArray";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "state/currentUser";
import { mutate } from "swr";
import { toZenkaku } from "utils/toZenkaku";

import { CommentReturnType } from "../types";
import CommentFormButton from "./CommentFormButton";

type Props = {
  currentUser: User;
  modalHandlers: {
    readonly close: () => void;
    readonly open: () => void;
    readonly toggle: () => void;
  };
  postId: string | string[] | undefined;
  postUserId: string;
};

const CommentListByPostId = (props: Props) => {
  const currentUser = useAtomValue(currentUserAtom);
  const { isLoading, loginWithPopup, user } = useAuth0();
  const { data: commentsData, isEmpty: commentsDataIsEmpty } = useFetchArray(
    props.postId ? `${API_BASE_URL}/posts/${props.postId}/comments` : ""
  );

  mutate(`${API_BASE_URL}/posts/${props.postId}/comments`);

  return (
    <div>
      {isLoading && user === undefined && (
        <div className="mx-3 mt-2.5 mb-5 flex">
          <Skeleton className="px-4" height={38} circle />
          <Skeleton
            className="ml-2 w-full pl-3.5 pt-1.5 "
            height={38}
            radius={20}
          ></Skeleton>
        </div>
      )}

      {!isLoading && user === undefined && (
        <div className="mt-2.5 mb-5 flex justify-center">
          <Button
            className="h-[39px] px-[25.3px] font-sans text-[15px] text-emerald-50"
            onClick={() => loginWithPopup()}
            color="green.4"
            size="sm"
            radius={4}
          >
            ログインして回答
          </Button>
        </div>
      )}

      {user && currentUser.id.toString() !== props.postUserId && (
        <CommentFormButton
          currentUser={props.currentUser}
          modalHandlers={props.modalHandlers}
        />
      )}

      {commentsData && commentsData !== undefined && !commentsDataIsEmpty && (
        <h2 className="my-1 ml-2.5 text-base font-medium text-gray-600 xs:my-3">
          {commentsData.length <= 9
            ? toZenkaku(commentsData.length.toString())
            : commentsData.length.toString()}
          件の回答
        </h2>
      )}

      {commentsData && commentsData !== undefined && !commentsDataIsEmpty && (
        <ol className="m-0 p-0">
          {commentsData.map((comment: CommentReturnType) => {
            return (
              <li key={comment.id}>
                <Comment
                  id={comment.id}
                  post_id={comment.post_id.toString()}
                  title={comment.title}
                  body={comment.body}
                  name={comment.name}
                  picture={comment.picture}
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
