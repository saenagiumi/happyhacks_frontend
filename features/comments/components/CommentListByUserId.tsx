import { useFetchArray } from "hooks/useFetchArray";
import { API_BASE_URL } from "const/const";
import { Modal, Button } from "@mantine/core";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { UnstyledButton } from "@mantine/core";
import { useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "state/currentUser";
import PostForm from "features/posts/components/PostForm";
import { Comment, TargetComment } from "../types";
import { User } from "features/users/types";
import { useDestroyComment } from "../hooks/useDestroyComment";
import { useRouter } from "next/router";

const CommentListByUserId = () => {
  const { destroyComment } = useDestroyComment();
  const router = useRouter();
  const currentUser = useAtomValue<User>(currentUserAtom);
  const [opened, setOpened] = useState<boolean>(false);
  const [editOpened, setEditOpened] = useState<boolean>(false);
  const [targetComment, setTargetComment] = useState<TargetComment>({
    id: "",
    title: "",
    body: "",
  });

  const { data } = useFetchArray(
    currentUser.id !== ""
      ? `${API_BASE_URL}/users/${currentUser.id}/comments`
      : null
  );

  const handleDelete = async () => {
    const isSuccess = await destroyComment(targetComment.id);

    if (isSuccess) {
      setOpened(false);
      showNotification({
        title: "削除完了",
        message: "回答を削除しました",
        color: "green.4",
        icon: <MdCheckCircle size={30} />,
      });

      router.replace(router.asPath);
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto mt-10">
      <h2 className="mx-3 mb-3  text-gray-800 text-[20px]">回答の管理</h2>

      {data?.length == 0 && (
        <div>
          <p className="pl-3 mb-5">まだ回答がありません</p>
        </div>
      )}

      {data?.length > 0 && (
        <ul className="mx-3">
          {data?.map((comment: Comment) => (
            <li
              key={comment.id}
              className="flex justify-between border-0 border-b-[0.5px] xs:px-7 pt-4 pb-6 border-gray-200 border-solid hover:bg-slate-50"
            >
              <Link
                className="no-underline w-[80%]"
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
                    setEditOpened(true),
                      setTargetComment({
                        id: comment.id.toString(),
                        title: comment.title,
                        body: comment.body,
                      });
                  }}
                  className="mr-2 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100"
                >
                  <HiOutlinePencilAlt className="text-gray-500" />
                </UnstyledButton>

                <UnstyledButton
                  onClick={() => {
                    setOpened(true),
                      setTargetComment({
                        id: comment.id.toString(),
                        title: comment.title,
                        body: comment.body,
                      });
                  }}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100"
                >
                  <HiOutlineTrash className="text-gray-500" />
                </UnstyledButton>
              </div>
            </li>
          ))}
          <Modal
            withCloseButton={false}
            fullScreen
            opened={editOpened}
            onClose={() => setEditOpened(false)}
          >
            <PostForm close={setEditOpened} commentData={targetComment} />
          </Modal>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            centered
            withCloseButton={false}
            radius="md"
            size="xs"
          >
            <div className="flex justify-center font-bold text-lg text-gray-800 mt-0.5 mb-3">
              削除しますか？
            </div>
            <div className="mx-1.5">
              <div className="text-sm text-gray-600 mb-8">
                {`「${targetComment.title}」を削除しようとしています。元に戻すことができませんが、よろしいですか？`}
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={() => setOpened(false)}
                  variant="light"
                  color="green"
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
