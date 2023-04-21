import {
  Avatar,
  Button,
  Group,
  Menu,
  Modal,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { User } from "features/users/types";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { MdCheckCircle } from "react-icons/md";
import { currentUserAtom } from "state/currentUser";

import { useDestroyPost } from "../hooks/useDestroyPost";
import { TargetPost } from "../types";
import PostForm from "./PostForm";

type Props = {
  id: string;
  name: string;
  title: string;
  body: string;
  comments_count: number;
  iconSrc: string;
  postedAt: string;
  userId: string;
};

export const Post = ({
  id,
  name,
  title,
  body,
  comments_count,
  iconSrc,
  userId,
}: Props) => {
  const currentUser = useAtomValue<User>(currentUserAtom);
  const [opened, setOpened] = useState<boolean>(false);
  const [editOpened, setEditOpened] = useState<boolean>(false);
  const [targetPost, setTargetPost] = useState<TargetPost>({
    id: "",
    title: "",
    body: "",
  });
  const { destroyPost } = useDestroyPost();
  const router = useRouter();

  const handleDelete = async () => {
    const isSuccess = await destroyPost(id);

    if (isSuccess) {
      setOpened(false);
      showNotification({
        title: "完了",
        autoClose: 3000,
        color: "green.4",
        icon: <MdCheckCircle size={30} />,
        message: "投稿を削除しました",
      });
    }

    router.back();
  };

  return (
    <div className="pt-3.5 pb-2 xs:p-5 xs:pt-7">
      <div className="flex items-start justify-between font-bold text-main-black">
        <div className="text-[16px] leading-6 tracking-wide xs:text-[1.125rem] xs:tracking-wide">
          {title}
        </div>

        {currentUser.id == userId && router.asPath.includes("posts") && (
          // ログインユーザーのidと参照している投稿のuser_idが一致し、詳細ページの場合にメニューを表示
          <Menu position="bottom-end" offset={5} width={180} shadow="md">
            <Menu.Target>
              <UnstyledButton className="ml-3 mr-2 flex items-center justify-center rounded-full bg-gray-100 p-2">
                <HiOutlineDotsHorizontal className="text-gray-500" size={18} />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => {
                  setEditOpened(true),
                    setTargetPost({
                      id: id,
                      title: title,
                      body: body,
                    });
                }}
              >
                編集する
              </Menu.Item>

              <Menu.Item
                onClick={() => setOpened(true)}
                className=" text-red-500"
              >
                削除する
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </div>
      <Modal
        withCloseButton={false}
        fullScreen
        opened={editOpened}
        onClose={() => setEditOpened(false)}
      >
        <PostForm close={() =>setEditOpened(false)} postData={targetPost} />
      </Modal>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
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
            削除した投稿は元に戻すことができません。よろしいですか？
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

      <div className="pt-2 pb-1">
        <div className="w-full break-all text-[14px] leading-7 tracking-wide text-main-black xs:text-[1.125rem] xs:leading-8">
          {body}
        </div>
      </div>
      <Group position="apart" className="mt-1 mb-0.5">
        <Group spacing="xs">
          <Avatar src={iconSrc} radius={50} size={26} />
          <Text className="ml-[-3.5px] text-gray-600" size="sm">
            {name}
          </Text>
        </Group>
        <Group className="pr-1.5">
          {comments_count && (
            // コメントがあればアイコンと件数を表示
            <div className="flex items-center text-gray-500">
              <HiOutlineChatBubbleOvalLeft className="mr-1" />
              <div>{comments_count}</div>
            </div>
          )}
        </Group>
      </Group>
    </div>
  );
};
