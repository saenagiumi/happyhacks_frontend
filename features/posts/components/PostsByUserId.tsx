import { Button, Modal, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { API_BASE_URL } from "const/const";
import { useFetchArray } from "hooks/useFetchArray";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useState } from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { MdCheckCircle } from "react-icons/md";
import { currentUserAtom } from "state/currentUser";

import { useDestroyPost } from "../hooks/useDestroyPost";
import { PostType } from "../types";
import PostForm from "./PostForm";

const PostsByUserId = () => {
  const currentUser = useAtomValue(currentUserAtom);
  const isCurrentUserSet = currentUser.id !== "";
  const { data } = useFetchArray(
    isCurrentUserSet ? `${API_BASE_URL}/users/${currentUser.id}/posts` : ""
  );
  const [opened, handlers] = useDisclosure(false);
  const [formOpened, formHandlers] = useDisclosure(false);
  const [targetPost, setTargetPost] = useState({ id: "", title: "", body: "" });
  const { destroyPost } = useDestroyPost();

  const handleDelete = async () => {
    const isSuccess = await destroyPost(targetPost.id);

    if (isSuccess) {
      handlers.close();
      showNotification({
        title: "削除完了",
        autoClose: 3000,
        color: "green.4",
        icon: <MdCheckCircle size={30} />,
        message: "投稿を削除しました",
      });
    }
  };

  return (
    <div className="mx-auto max-w-screen-sm">
      {data?.length == 0 && (
        <div>
          <p className="mb-5 pl-3">気軽に質問してみましょう</p>
          <div className="flex justify-center">
            <Button
              onClick={() => {
                formHandlers.open();
              }}
              size="md"
              color="green.4"
            >
              投稿する
            </Button>
            <Modal
              withCloseButton={false}
              fullScreen
              opened={formOpened}
              onClose={() => formHandlers.close()}
            >
              <PostForm close={() => formHandlers.close()} />
            </Modal>
          </div>
        </div>
      )}

      {data?.length > 0 && (
        <ul className="mx-3">
          {data?.map((post: PostType) => (
            <li
              key={post.id}
              className="flex justify-between border-0 border-b-[0.5px] border-solid border-gray-200 pt-4 pb-6 xs:px-7 xs:hover:bg-slate-50"
            >
              <Link className="w-[80%] no-underline" href={`/posts/${post.id}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] text-gray-800">{post.title}</h3>
                </div>
                <p>{post.body}</p>
              </Link>
              <div className="flex">
                <UnstyledButton
                  onClick={() => {
                    formHandlers.open(),
                      setTargetPost({
                        id: post.id.toString(),
                        title: post.title,
                        body: post.body,
                      });
                  }}
                  className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100"
                >
                  <HiOutlinePencilAlt className="text-gray-500" />
                </UnstyledButton>

                <UnstyledButton
                  onClick={() => {
                    handlers.open();
                    setTargetPost({
                      id: post.id.toString(),
                      title: post.title,
                      body: post.body,
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
              postData={targetPost}
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
                {`「${targetPost.title}」を削除しようとしています。元に戻すことができませんが、よろしいですか？`}
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={() => handlers.close()}
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

export default PostsByUserId;
