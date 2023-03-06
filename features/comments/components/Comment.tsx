import { useEffect } from "react";

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
import useToggleLike from "../hooks/useToggleLike";
import { useAtom } from "jotai";
import { currentUserAtom } from "state/currentUser";
import useToggleBookmark from "../hooks/useToggleBookmark";

const LOCAL_STORAGE_KEY = "currentUser";

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
    backgroundColor: "#FDFCF4"
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
}: CommentProps) => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const { isLiked, likesData, likeError, toggleLikes, likeIsLoading } =
    useToggleLike({
      commentId: id.toString(),
      userId: currentUser.id,
    });
  const {
    isBookmarked,
    bookmarksData,
    bookmarkError,
    toggleBookmarks,
    bookmarkIsLoading,
  } = useToggleBookmark({
    commentId: id.toString(),
    userId: currentUser.id,
  });

  useEffect(() => {
    // ローカルストレージからcurrentUserを取得する
    const storedCurrentUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  const { classes } = useStyles();
  return (
    <div id={`comments/${id}`}>
      <Paper
        shadow="sm"
        radius="xs"
        p="xs"
        withBorder
        className={isBookmarked? classes.comment : ""}
      >
        <Group className="mb-2 pt-1" position="apart">
          <Group spacing="xs" className="px-[5px]">
            <Avatar src={iconSrc} radius={50} size={38} />
            <Text className="pt-0.5" size="sm">
              <div className="text-gray-700 font-bold">{name}</div>
              <div className="text-gray-400 text-xs">
                {dayjs(postedAt).fromNow()}
              </div>
            </Text>
          </Group>
          <div className="mr-2 pt-1">
            <UnstyledButton onClick={() => toggleLikes()}>
              <div className="flex items-center">
                <div
                  className={`border-[1px] border-solid  ${
                    isLiked ? "border-rose-100 bg-red-50" : "border-gray-100 bg-gray-50"
                  }   w-[38px] h-[38px] rounded-full flex justify-center items-center font-bold text-sm text-gray-400 mr-2`}
                >
                  <div>
                    <LikeButton
                      isLiked={isLiked ? true : false}
                      likeIsLoading={likeIsLoading}
                    ></LikeButton>
                  </div>
                </div>
                <div className="text-gray-400 font-bold text-sm mr-2 mt-[1px] w-[10px]">
                  {likesData ? likesData.counts : 0}
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
            <UnstyledButton className="mr-1" onClick={() => toggleBookmarks()}>
              <div className="flex items-center font-bold text-sm text-gray-400">
                <div className="mr-[-2px] text-xs">ブックマーク</div>
                <div>
                  <BookmarkButton isBookmarked={isBookmarked ? true : false} bookmarkIsLoading={bookmarkIsLoading} />
                </div>
              </div>
            </UnstyledButton>
          </div>
        </div>
      </Paper>
    </div>
  );
};
