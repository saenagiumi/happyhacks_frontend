import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Menu,
  UnstyledButton,
  Modal,
  Button,
} from "@mantine/core";

// react-icons
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import axios from "axios";
import { API_URL } from "utils/const";
import { showNotification } from "@mantine/notifications";
import { MdCheckCircle } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "state/currentUser";

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingLeft: 7,
    paddingTop: 8,
    paddingBottom: 5,
    fontSize: theme.fontSizes.md,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

interface PostProps {
  userId: string;
  title: string;
  body: string;
  name: string;
  iconSrc: string;
  postedAt: string;
  accessToken: string | undefined;
  comments_count: number;
}

export const Post = ({
  userId,
  title,
  body,
  name,
  iconSrc,
  postedAt,
  accessToken,
  comments_count,
}: PostProps) => {  
  const { classes } = useStyles();
  const user = useAtomValue(currentUserAtom);
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  const handleDelete = async (postId: string | string[] | undefined) => {
    try {
      const response = await axios.delete(`${API_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 204) {
        // モーダルを閉じる処理
        setOpened(false);

        // back
        router.back();

        showNotification({
          title: "削除完了",
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

  return (
    <div className="pt-1.5">
      <div className="flex justify-between items-center pl-2 pr-2 pt-1.5 text-gray-600 font-bold">
        <Text className="mr-1" size={15.5}>
          {title}
        </Text>
        

        {accessToken && user?.id == userId && (
          // ログインユーザーのidと参照している投稿のuser_idが一致したらメニューを表示
          <Menu position="bottom-end" offset={5} width={180} shadow="md">
            <Menu.Target>
              <UnstyledButton>
                <HiOutlineDotsHorizontal className="text-gray-500" size={18} />
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Link
                className="no-underline"
                href={{
                  pathname: "/posts/[id]/edit",
                  query: { id: router.query.id },
                }}
              >
                <Menu.Item>編集する</Menu.Item>
              </Link>

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
              onClick={() => handleDelete(router.query.id)}
              variant="outline"
              color="red"
            >
              削除する
            </Button>
          </div>
        </div>
      </Modal>

      <TypographyStylesProvider className={classes.body}>
        <div className="w-full break-all text-gray-500">{body}</div>
      </TypographyStylesProvider>
      <Group position="apart" className="mt-1 mb-0.5">
        <Group className="ml-1.5" spacing="xs">
          <Avatar src={iconSrc} alt={"author.name"} radius="xl" size={26} />
          <Text className="ml-[-3.5px] text-gray-600" size="sm">
            {name}
          </Text>
        </Group>
        <Group className="pr-1.5">
          {comments_count && (
            // コメントがあればアイコンと件数を表示
            <div className=" text-gray-500 flex items-center">
              <HiOutlineChatBubbleOvalLeft className="mr-0.5" />
              <div className="text-sm">{comments_count}</div>
            </div>
          )}
        </Group>
      </Group>
    </div>
  );
};
