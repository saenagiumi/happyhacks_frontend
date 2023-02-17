import { useFetchArray } from "hooks/useFetchArray";
import { API_URL } from "utils/const";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";

import { Modal, Button } from "@mantine/core";

import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { UnstyledButton } from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { MdCheckCircle } from "react-icons/md";
import { showNotification } from "@mantine/notifications";
import { useSWRConfig } from "swr";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  body: string;
  name: string;
  picture: string;
  sub: string;
  created_at: string;
};

type AccessToken = {
  accessToken: string;
};

const PostsByUserId = ({ accessToken }: AccessToken) => {
  const { mutate } = useSWRConfig();
  const [opened, setOpened] = useState(false);
  const [targetPost, setTargetPost] = useState({ title: "", PostId: "" });
  const { user } = useAuth0();
  const { data, error, isLoading, isEmpty } = useFetchArray(
    `${API_URL}/posts/`
  );

  const handleDelete = async (postId: string) => {
    try {
      const response = await axios.delete(`${API_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 204) {
        // モーダルを閉じる処理
        setOpened(false);

        // 一覧の更新処理
        mutate(`${API_URL}/posts/`);

        showNotification({
          title: "投稿完了",
          message: "投稿を削除しました",
          color: "green.4",
          icon: <MdCheckCircle size={30} />,
        });
        return response.data;
      }
    } catch (error) {
      console.error(error);
      // エラーが発生した場合の処理を実行する
    }
  };

  // data配列から、ログインしているユーザーの投稿だけを抽出する
  const userPosts = user
    ? data?.filter((post: Post) => post.sub === user.sub)
    : [];

  return (
    <div>
      <h2 className="mx-3 mb-3  text-gray-800 text-[20px]">質問の管理</h2>
      {userPosts?.length > 0 && (
        // 投稿がある場合
        <ul className="mx-3">
          {userPosts?.map((post: Post) => (
            <li key={post.id}>
              <div className="flex items-center justify-between pt-2 pb-10">
                <h3 className=" text-[16px] text-gray-800">{post.title}</h3>
                <div className="flex">
                  <UnstyledButton className="mr-2 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100">
                    <HiOutlinePencilAlt className="text-gray-500" />
                  </UnstyledButton>

                  <UnstyledButton
                    onClick={() => {
                      setOpened(true),
                        setTargetPost({ title: post.title, PostId: post.id });
                    }}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100"
                  >
                    <HiOutlineTrash className="text-gray-500" />
                  </UnstyledButton>
                </div>
              </div>
              <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
            </li>
          ))}
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            centered
            withCloseButton={false}
            radius="md"
            size="90%"
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
                  onClick={() => handleDelete(targetPost.PostId)}
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
      {userPosts?.length == 0 && (
        // まだ投稿がない場合
        <div>
          <p className="pl-3 mb-5">気軽に質問してみましょう</p>
          <div className="flex justify-center">
            <Button size="md" color="green.4">
              <Link href={"/posts/new"} className="no-underline">
                投稿する
              </Link>
            </Button>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default PostsByUserId;
