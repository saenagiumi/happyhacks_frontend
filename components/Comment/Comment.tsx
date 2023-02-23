import { useCallback, useEffect, useState } from "react";

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

import { HiOutlineShare } from "react-icons/hi";
import axios from "axios";
import { API_URL } from "utils/const";

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 12,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    "& > p:last-child": {
      marginBottom: 0,
    },
  },
}));

interface CommentProps {
  id: number;
  title: string;
  body: string;
  name: string;
  iconSrc: string;
  postedAt: string;
  accessToken: string;
}

export const Comment = ({
  id,
  title,
  body,
  name,
  iconSrc,
  postedAt,
  accessToken,
}: CommentProps) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const postLike = async ({ id }: any) => {
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    return await axios.post(
      `${API_URL}/comments/${id}/likes`,
      {
        comment_id: id,
      },
      config
    );
  };

  const handleClick = async (id: number) => {
    setLiked(!liked);
    await postLike({ id }); // call postLike after updating the state
  };

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
          <div className="mr-2 pt-1">
            <UnstyledButton onClick={() => handleClick(id)}>
              <div className="flex items-center">
                <div
                  className={`border-[0.9px] border-solid  ${
                    liked ? "border-rose-400" : "border-gray-100"
                  } bg-gray-100 w-[38px] h-[38px] rounded-full flex justify-center items-center font-bold text-sm text-gray-400 mr-2`}
                >
                  {/* <div className="mr-[-6px]">いいね</div> */}
                  <div>
                    <LikeButton on={liked ? true : false}></LikeButton>
                  </div>
                </div>
                <div className="text-gray-400 font-bold text-sm mt-[1px]">
                  3
                </div>
              </div>
            </UnstyledButton>
          </div>
        </Group>
        <Text className="px-1.5 pt-1 pb-2 text-gray-600 font-bold" size="md">
          {title}
        </Text>

        <div className={classes.body}>
          <div className="w-full break-all text-gray-500">{body}</div>
        </div>

        <div className="mb-[-8px] flex flex-row items-center border-0 border-t-[1px] border-solid border-gray-200">
          <div className="flex justify-center basis-1/2">
            <UnstyledButton>
              <div className="flex items-center">
                <div className="font-bold text-xs text-gray-400 mr-2">
                  共有する
                </div>
                <HiOutlineShare className="text-gray-400" />
              </div>
            </UnstyledButton>
          </div>
          <div className="flex justify-center basis-1/2">
            <UnstyledButton
              className="mr-1"
              onClick={() => setBookmarked(!bookmarked)}
            >
              <div className="flex items-center font-bold text-sm text-gray-400">
                <div className="mr-[-2px] text-xs">ブックマーク</div>
                <div>
                  <BookmarkButton on={bookmarked ? true : false} />
                </div>
              </div>
            </UnstyledButton>
          </div>
        </div>
      </Paper>
    </div>
  );
};
