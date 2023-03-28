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
import PostForm from "./PostForm";
import { useDestroyPost } from "../hooks/useDestroyPost";
import { useRouter } from "next/router";
import { PostType } from "../types";

const PostsByUserId = () => {
  const currentUser = useAtomValue(currentUserAtom);
  const isCurrentUserSet = currentUser.id !== "";
  const { data } = useFetchArray(
    isCurrentUserSet ? `${API_BASE_URL}/users/${currentUser.id}/posts` : null
  );
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [editOpened, setEditOpened] = useState(false);
  const [targetPost, setTargetPost] = useState({ id: "", title: "", body: "" });
  const { destroyPost } = useDestroyPost();

  const handleDelete = async () => {
    const isSuccess = await destroyPost(targetPost.id);

    if (isSuccess) {
      setOpened(false);
      showNotification({
        title: "削除完了",
        message: "投稿を削除しました",
        color: "green.4",
        icon: <MdCheckCircle size={30} />,
      });

      router.replace(router.asPath);
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto mt-10">
      <h2 className="mx-3 mb-3  text-gray-800 text-[20px]">質問の管理</h2>

      {data?.length == 0 && (
        // まだ投稿がない場合
        <div>
          <p className="pl-3 mb-5">気軽に質問してみましょう</p>
          <div className="flex justify-center">
            <Button
              onClick={() => {
                setOpened(true);
              }}
              size="md"
              color="green.4"
            >
              投稿する
            </Button>
            <Modal
              withCloseButton={false}
              fullScreen
              opened={opened}
              onClose={() => setOpened(false)}
            >
              <PostForm close={setOpened} />
            </Modal>
          </div>
        </div>
      )}

      {data?.length > 0 && (
        // 投稿がある場合
        <ul className="mx-3">
          {data?.map((post: PostType) => (
            <li
              key={post.id}
              className="flex justify-between border-0 border-b-[0.5px] xs:px-7 pt-4 pb-6 border-gray-200 border-solid hover:bg-slate-50"
            >
              <Link className="no-underline w-[80%]" href={`/posts/${post.id}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] text-gray-800">{post.title}</h3>
                </div>
                <p>{post.body}</p>
              </Link>
              <div className="flex">
                <UnstyledButton
                  onClick={() => {
                    setEditOpened(true),
                      setTargetPost({
                        id: post.id.toString(),
                        title: post.title,
                        body: post.body,
                      });
                  }}
                  className="mr-2 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100"
                >
                  <HiOutlinePencilAlt className="text-gray-500" />
                </UnstyledButton>

                <UnstyledButton
                  onClick={() => {
                    setOpened(true),
                      setTargetPost({
                        id: post.id.toString(),
                        title: post.title,
                        body: post.body,
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
            <PostForm
              close={setEditOpened}
              // accessToken={accessToken}
              postData={targetPost}
            />
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
                {`「${targetPost.title}」を削除しようとしています。元に戻すことができませんが、よろしいですか？`}
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

export default PostsByUserId;
