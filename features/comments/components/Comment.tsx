import { useEffect } from "react";

// Mantine
import { Text, Avatar, Group } from "@mantine/core";

// 日付
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale("ja");

// 相対日時
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// お気に入りボタン
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";

// お気に入り、ブックマーク操作のカスタムフック
import useToggleLike from "../hooks/useToggleLike";
import useToggleBookmark from "../hooks/useToggleBookmark";

// 状態管理
import { useAtom } from "jotai";
import { currentUserAtom } from "state/currentUser";

import { LOCAL_STORAGE_KEY } from "const/const";

type Props = {
  id: number;
  post_id: string;
  title: string;
  body: string;
  name: string;
  iconSrc: string;
  postedAt: string;
};

export const Comment = (props: Props) => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const { isLiked, likesCount, toggleLike, commentLikesIsloading } =
    useToggleLike({
      postId: props.post_id,
      commentId: props.id.toString(),
      userId: currentUser.id,
    });
  const { isBookmarked, commentBookmarksIsLoading, toggleBookmark } =
    useToggleBookmark({
      postId: props.post_id,
      commentId: props.id.toString(),
      userId: currentUser.id,
    });

  useEffect(() => {
    // ローカルストレージからcurrentUserを取得する
    const storedCurrentUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  return (
    <div
      className="border-0 border-t-[0px] mb-3 xs:mb-5 border-li-separator-gray border-solid text-main-black"
      id={`comments/${props.id}`}
    >
      <div>
        <div
          className={
            isBookmarked ? "bg-amber-100 pb-1 mb-2 xs:p-7" : "pb-1 mb-2 xs:p-7"
          }
        >
          <Group className="pl-3 pt-4 pr-1.5" position="apart">
            <Group spacing="xs">
              <Avatar src={props.iconSrc} radius={50} size={38} />
              <Text className="pt-0.5" size="sm">
                <div className="text-gray-700 font-bold">{props.name}</div>
                <div className="text-gray-400 text-xs">
                  {dayjs(props.postedAt).fromNow()}
                </div>
              </Text>
            </Group>

            <div className="flex items-center">
              <div className="mr-2 mt-[1px]">
                <BookmarkButton
                  onClick={() => toggleBookmark()}
                  isBookmarked={isBookmarked}
                  commentBookmarksIsLoading={commentBookmarksIsLoading}
                />
              </div>

              <div className="pt-1">
                <LikeButton
                  onClick={() => toggleLike()}
                  likesCount={likesCount}
                  isLiked={isLiked}
                  commentLikesIsLoading={commentLikesIsloading}
                />
              </div>
            </div>
          </Group>

          <div className="ml-12">
            <div className="pl-2.5 pt-1 pr-3.5 text-[14px] xs:text-[1.125rem] text-main-black font-bold leading-6 tracking-wide">
              {props.title}
            </div>

            <div>
              <div className="w-full pl-2.5 mt-2 pr-3.5 pb-5 break-all text-[14px] xs:text-[1.125rem] leading-7 tracking-wide xs:leading-8 text-main-black">
                {props.body}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
