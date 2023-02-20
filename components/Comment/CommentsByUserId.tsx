import { useFetchArray } from "hooks/useFetchArray";
import { API_URL } from "utils/const";
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

type Comment = {
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

const CommentsByUserId = ({ accessToken }: AccessToken) => {
  const { user } = useAuth0();
  const { mutate } = useSWRConfig();
  const { data, error, isLoading, isEmpty } = useFetchArray(
    `${API_URL}/users/${user?.sub}/comments`
  );

  const [opened, setOpened] = useState(false);
  const [targetComment, setTargetComment] = useState({
    title: "",
    commentId: "",
  });

  const handleDelete = async (commentId: string) => {
    try {
      const response = await axios.delete(`${API_URL}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 204) {
        // モーダルを閉じる処理
        setOpened(false);

        // 一覧の更新処理
        mutate(`${API_URL}/users/${user?.sub}/comments`);

        showNotification({
          title: "削除完了",
          message: "回答を削除しました",
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
  
  return (
    <div>
      <h2 className="mx-3 mb-3  text-gray-800 text-[20px]">回答の管理</h2>

      {data?.length == 0 && (
        // まだ投稿がない場合
        <div>
          <p className="pl-3 mb-5">まだ回答がありません</p>
        </div>
      )}

      {data?.length > 0 && (
        // 投稿がある場合
        <ul className="mx-3">
          {data?.map((comment: Comment) => (
            <li key={comment.id} className="border-0 border-b-[0.5px] border-gray-200 border-solid">
              <div className="flex items-center justify-between pt-2 pb-3">
                <h3 className=" text-[16px] text-gray-800">{comment.title}</h3>
                <div className="flex">
                  <Link
                    href={{
                      pathname: "/comments/[id]/edit",
                      query: { id: comment.id },
                    }}
                  >
                    <UnstyledButton className="mr-2 flex items-center justify-center w-8 h-8 rounded-full bg-slate-100">
                      <HiOutlinePencilAlt className="text-gray-500" />
                    </UnstyledButton>
                  </Link>

                  <UnstyledButton
                    onClick={() => {
                      setOpened(true),
                        setTargetComment({
                          title: comment.title,
                          commentId: comment.id,
                        });
                    }}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100"
                  >
                    <HiOutlineTrash className="text-gray-500" />
                  </UnstyledButton>
                </div>
              </div>
              <p>{comment.body}</p>
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
                  onClick={() => handleDelete(targetComment.commentId)}
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

export default CommentsByUserId;
