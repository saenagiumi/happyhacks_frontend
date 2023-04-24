import { Button, Modal, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { API_BASE_URL } from "const/const";
import PostForm from "features/posts/components/PostForm";
import { User } from "features/users/types";
import { useFetchArray } from "hooks/useFetchArray";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useState } from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { MdCheckCircle } from "react-icons/md";
import { currentUserAtom } from "state/currentUser";

import { useDestroyComment } from "../hooks/useDestroyComment";
import { Comment, TargetComment } from "../types";

const CommentListByUserId = () => {
  const { destroyComment } = useDestroyComment();
  const currentUser = useAtomValue<User>(currentUserAtom);
  const [opened, handlers] = useDisclosure(false);
  const [formOpened, formHandlers] = useDisclosure(false);

  const [targetComment, setTargetComment] = useState<TargetComment>({
    id: "",
    title: "",
    body: "",
  });

  const { data } = useFetchArray(
    currentUser.id !== ""
      ? `${API_BASE_URL}/users/${currentUser.id}/comments`
      : ""
  );

  const handleDelete = async () => {
    const isSuccess = await destroyComment(targetComment.id);

    if (isSuccess) {
      handlers.close();
      showNotification({
        title: "削除完了",
        autoClose: 3000,
        color: "green.4",
        icon: <MdCheckCircle size={30} />,
        message: "回答を削除しました",
      });
    }
  };

  return (
    <div className="mx-auto max-w-screen-sm">
      {data?.length == 0 && (
        <div>
          <p className="mb-5 pl-3">まだ回答がありません</p>
        </div>
      )}

      {data?.length > 0 && (
        <ul className="mx-3">
          {data?.map((comment: Comment) => (
            <li
              key={comment.id}
              className="flex justify-between border-0 border-b-[0.5px] border-solid border-gray-200 pt-4 pb-6 hover:bg-slate-50 xs:px-7"
            >
              <Link
                className="w-[80%] no-underline"
                href={`/posts/${comment?.post_id}#comments/${comment.id}`}
              >
                <div className="flex items-center justify-between pt-2 pb-3">
                  <h3 className="text-[16px] text-gray-800">{comment.title}</h3>
                </div>
                <p>{comment.body}</p>
              </Link>
              <div className="flex">
                <UnstyledButton
                  onClick={() => {
                    formHandlers.open(),
                      setTargetComment({
                        id: comment.id.toString(),
                        title: comment.title,
                        body: comment.body,
                      });
                  }}
                  className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100"
                >
                  <HiOutlinePencilAlt className="text-gray-500" />
                </UnstyledButton>

                <UnstyledButton
                  onClick={() => {
                    handlers.open(),
                      setTargetComment({
                        id: comment.id.toString(),
                        title: comment.title,
                        body: comment.body,
                      });
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100"
                >
                  <HiOutlineTrash className="text-gray-500" />
                </UnstyledButton>
              </div>
            </li>
          ))}
          <Modal
            withCloseButton={false}
            fullScreen
            opened={formOpened}
            onClose={() => formHandlers.close()}
          >
            <PostForm
              close={() => formHandlers.close()}
              commentData={targetComment}
            />
          </Modal>
          <Modal
            opened={opened}
            onClose={() => handlers.close()}
            centered
            withCloseButton={false}
            radius="md"
            size="xs"
          >
            <div className="mt-0.5 mb-3 flex justify-center text-lg font-bold text-gray-800">
              削除しますか？
            </div>
            <div className="mx-1.5">
              <div className="mb-8 text-sm text-gray-600">
                {`「${targetComment.title}」を削除しようとしています。元に戻すことができませんが、よろしいですか？`}
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={() => handlers.close()}
                  variant="light"
                  color="green"
                  className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  キャンセル
                </Button>
                <Button
                  onClick={() => handleDelete()}
                  variant="outline"
                  color="red"
                >
                  削除する
                </Button>
              </div>
            </div>
          </Modal>
        </ul>
      )}
    </div>
  );
};

export default CommentListByUserId;
