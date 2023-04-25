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
  picture: string;
  postedAt: string;
  userId: string;
};

export const Post = ({
  id,
  name,
  title,
  body,
  comments_count,
  picture,
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
        <div className="text-[1.125rem] leading-8 tracking-wide xs:text-[1.75rem] xs:tracking-wide">
          {title}
        </div>

        {currentUser.id == userId && router.asPath.includes("posts") && (
          // ログインユーザーのidと参照している投稿のuser_idが一致し、詳細ページの場合にメニューを表示
          <Menu
            position="bottom-end"
            offset={10}
            width={200}
            radius="md"
            shadow="xs"
          >
            <Menu.Target>
              <UnstyledButton className="ml-3 mr-2 flex items-center justify-center rounded-full bg-gray-100 p-2">
                <HiOutlineDotsHorizontal className="text-gray-500" size={18} />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                className="py-3.5 pl-[17px] text-[17px] font-[600] text-gray-600 xs:text-[16px]"
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
                className="py-3.5 pl-4 text-[17px] font-[600] text-red-400 xs:text-[16px]"
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
        <PostForm close={() => setEditOpened(false)} postData={targetPost} />
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

      <div className="pb-1">
        <Group position="apart" className="my-4 xs:my-5">
          <Group spacing="xs">
            <Avatar
              alt={`${name}のアイコン`}
              src={picture}
              radius={50}
              size={30}
            />
            <Text className="text-[12px] font-bold text-gray-700">{name}</Text>
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
        <div className="w-full break-all text-[14px] leading-8 tracking-wide text-main-black xs:text-[1.125rem]">
          {body}
        </div>
      </div>
    </div>
  );
};
