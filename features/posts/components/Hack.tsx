import Script from "next/script";
import { Tweet } from "components/Tweet";

import {
  Text,
  Avatar,
  Group,
  Menu,
  UnstyledButton,
  Modal,
  Button,
} from "@mantine/core";

// react-icons
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { showNotification } from "@mantine/notifications";
import { MdCheckCircle } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "state/currentUser";
import PostForm from "./PostForm";
import { useDestroyPost } from "../hooks/useDestroyPost";
import { TargetPost } from "../types";
import { User } from "features/users/types";

type Props = {
  id: string;
  userId: string;
  title: string;
  body: string;
  name: string;
  iconSrc: string;
};

export const Hack = ({ id, userId, title, body, name, iconSrc }: Props) => {
  const currentUser = useAtomValue<User>(currentUserAtom);
  const [opened, setOpened] = useState<boolean>(false);
  const [editOpened, setEditOpened] = useState<boolean>(false);
  const [targetPost, setTargetPost] = useState<TargetPost>({
    id: "",
    title: "",
    body: "",
  });
  // const { destroyPost } = useDestroyPost();
  const router = useRouter();

  // const handleDelete = async () => {
  //   const isSuccess = await destroyPost(id);

  //   if (isSuccess) {
  //     setOpened(false);
  //     showNotification({
  //       autoClose: 3000,
  //       title: "削除完了",
  //       message: "投稿を削除しました",
  //       color: "green.4",
  //       icon: <MdCheckCircle size={30} />,
  //     });
  //   }

  //   router.back();
  // };

  return (
    <div className="pt-3.5 pb-2 xs:p-5 xs:pt-7">
      <div className="flex justify-between items-center text-main-black font-bold">
        <div className="xs:tracking-wide text-[16px] xs:text-[1.125rem] leading-6 tracking-wide">
          {title}
        </div>

        {currentUser.id == userId && router.asPath.includes("hacks") && (
          // ログインユーザーのidと参照している投稿のuser_idが一致し、詳細ページの場合にメニューを表示
          <Menu position="bottom-end" offset={5} width={180} shadow="md">
            <Menu.Target>
              <UnstyledButton className="flex justify-center items-center bg-gray-100 rounded-full p-2 ml-3 mr-2">
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
        <PostForm close={setEditOpened} postData={targetPost} />
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
              // onClick={() => handleDelete()}
              variant="outline"
              color="red"
            >
              削除する
            </Button>
          </div>
        </div>
      </Modal>

      <div className="pt-2 pb-1">
        <div className="w-full break-all text-[14px] xs:text-[1.125rem] leading-7 xs:leading-8 text-main-black tracking-wide">
          {body}
        </div>
        <div className="mx-2">
          <Tweet id={"1248213251235536896"} />
          <Script
            src="https://platform.twitter.com/widgets.js"
            strategy="lazyOnload"
          />
        </div>
      </div>
      <Group position="apart" className="mt-1 mb-0.5">
        <Group spacing="xs">
          <span className="font-sans text-main-black text-[12px]">
            #生活 #tweet
          </span>
          {/* <Avatar src={iconSrc} radius={50} size={26} />
          <Text className="ml-[-3.5px] text-gray-600" size="sm">
            {name}
          </Text> */}
        </Group>
      </Group>
    </div>
  );
};
