import { useCallback, useState } from "react";

// Mantine
import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  UnstyledButton,
} from "@mantine/core";

// Day.js
import dayjs from "dayjs";

// 日本語対応
import "dayjs/locale/ja";
dayjs.locale("ja");

// 相対日時のプラグイン
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// お気に入りボタン
import { LikeButton } from "./LikeButton";
import { BookmarkButton } from "./BookmarkButton";

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
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

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
          <Group spacing="xs" className="px-[5px]">
            <Avatar src={iconSrc} alt={name} radius="xl" />
            <Text className="pt-0.5" size="sm">
              <div className="text-gray-700 font-bold">{name}</div>
              <div className="text-gray-400 text-xs">
                {dayjs(postedAt).fromNow()}
              </div>
            </Text>
          </Group>
        </Group>
        <Text className="px-2 pt-1 pb-3 text-gray-600 font-bold" size="md">
          {title}
        </Text>

        <div className={classes.body}>
          <div className="w-full break-all text-gray-500">{body}</div>
        </div>

        <hr className="mb-[1px] mx-[3px] h-[1px] bg-gray-200 border-0 dark:bg-gray-700" />

        <div className="mb-[-8px] flex justify-center items-center gap-x-[17%]">
          <UnstyledButton onClick={() => setLiked(!liked)}>
            <div className="flex justify-center items-center font-bold text-sm text-gray-400">
              <div className="mr-[-6px]">いいね</div>
              <div className=" mb-[2px]">
                <LikeButton on={liked ? true : false}></LikeButton>
              </div>
              <div className="ml-[-5px] text-gray-400">3</div>
            </div>
          </UnstyledButton>

          <UnstyledButton onClick={() => setBookmarked(!bookmarked)}>
            <div className="flex justify-center items-center font-bold text-sm text-gray-400">
              <div className="mr-[-6px]">マイリスト</div>
              <div>
                <BookmarkButton on={bookmarked ? true : false} />
              </div>
              <div className="ml-[-5px] text-gray-400">3</div>
            </div>
          </UnstyledButton>
        </div>
      </Paper>
    </div>
  );
};
