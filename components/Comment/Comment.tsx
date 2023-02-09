import { useCallback, useState } from "react";

// Mantine
import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  Button,
} from "@mantine/core";

// Day.js
import dayjs from 'dayjs';

// 日本語対応
import 'dayjs/locale/ja';
dayjs.locale('ja');

// 相対日時のプラグイン
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

// お気に入りボタン
import { LikeButton } from "./LikeButton";


const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

interface CommentProps {
  title: string;
  body: string;
  name: string;
  iconSrc: string;
  postedAt: string;
}

export const Comment = ({
  title,
  body,
  name,
  iconSrc,
  postedAt,
}: CommentProps) => {
  const [on, setOn] = useState(false);
  const handleClick = useCallback(() => {
    setOn((prev) => !prev);
  }, []);

  const { classes } = useStyles();
  return (
    <div>
      <Paper
        shadow="sm"
        radius="xs"
        p="xs"
        withBorder
        className={classes.comment}
      >
        <Group className="mb-2 pt-1" position="apart">
          <Group spacing="xs" className="px-2">
            <Avatar src={iconSrc} alt={name} radius="xl" />
            <Text className="pt-0.5" size="sm">
              <div className="text-gray-700 font-bold">{name}</div>
              <div className="text-gray-400 text-xs">{dayjs(postedAt).fromNow()}</div>
            </Text>
          </Group>
          <div className="mr-1 flex justify-center items-center">
            <div
              onClick={handleClick}
              className="flex items-center rounded-none border-solid border-gray-100"
            >
              <LikeButton on={on}></LikeButton>
              <div className=" mt-[3px] mr-3.5 text-gray-400">2</div>
            </div>
          </div>
        </Group>
        <Text className="pl-1.5 pb-3 text-gray-600 font-bold" size="xl">
          {title}
        </Text>

        <TypographyStylesProvider className={classes.body}>
          <div className="w-full break-all text-gray-500 text-base">{body}</div>
        </TypographyStylesProvider>

        <Group className="my-5 mx-3" position="center">
          <Button
            // variant="gradient"
            // gradient={{ from: "teal", to: "cyan", deg: 60 }}
          >
            リストに追加
          </Button>
        </Group>
      </Paper>
    </div>
  );
};
