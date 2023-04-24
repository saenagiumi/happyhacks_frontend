// Mantine
import "dayjs/locale/ja";

import { Avatar, Group, Modal, Text, UnstyledButton } from "@mantine/core";
// 日付
import dayjs from "dayjs";
dayjs.locale("ja");

// 相対日時
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

// お気に入りボタン
import { useAuth0 } from "@auth0/auth0-react";
import { Montserrat_Alternates } from "@next/font/google";
import { LOCAL_STORAGE_KEY } from "const/const";
import { useWindowSize } from "hooks/useWindowSize";
// 状態管理
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { currentUserAtom } from "state/currentUser";

import useToggleBookmark from "../hooks/useToggleBookmark";
// お気に入り、ブックマーク操作のカスタムフック
import useToggleLike from "../hooks/useToggleLike";
import BookmarkButton from "./BookmarkButton";
import LikeButton from "./LikeButton";

const montserrat = Montserrat_Alternates({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

type Props = {
  id: number;
  name: string;
  title: string;
  body: string;
  picture: string;
  post_id: string;
  postedAt: string;
};

export const Comment = (props: Props) => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [width] = useWindowSize();
  const { loginWithPopup } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const { isLiked, likesCount, likesIsloading, toggleLike } = useToggleLike({
    commentId: props.id.toString(),
    postId: props.post_id,
    setShowModal,
    userId: currentUser.id,
  });
  const { bookmarksIsLoading, isBookmarked, toggleBookmark } =
    useToggleBookmark({
      commentId: props.id.toString(),
      postId: props.post_id,
      setShowModal,
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
      className="mb-3 border-0 border-t-[0px] border-solid border-li-separator-gray text-main-black xs:mb-5"
      id={`comments/${props.id}`}
    >
      <div>
        <div
          className={
            isBookmarked ? "mb-2 bg-amber-100 pb-1 xs:p-7" : "mb-2 pb-1 xs:p-7"
          }
        >
          <Group className="pl-3 pt-4 pr-1.5" position="apart">
            <Group spacing="xs">
              <Avatar
                alt={`${props?.name}のアイコン`}
                src={props.picture}
                radius={50}
                size={38}
              />
              <Text className="pt-0.5" size="sm">
                <div className="font-bold text-gray-700">{props.name}</div>
                <div className="text-xs text-gray-400">
                  {dayjs(props.postedAt).fromNow()}
                </div>
              </Text>
            </Group>

            <div>
              <div className="mr-1 flex items-center gap-1.5">
                <BookmarkButton
                  onClick={() => toggleBookmark()}
                  isBookmarked={isBookmarked}
                  bookmarksIsLoading={bookmarksIsLoading}
                />
                <LikeButton
                  onClick={() => toggleLike()}
                  likesCount={likesCount}
                  isLiked={isLiked}
                  likesIsLoading={likesIsloading}
                />
              </div>
            </div>
          </Group>

          <Modal
            radius={8}
            overlayOpacity={0.35}
            size={width > 768 ? "sm" : 355}
            centered
            opened={showModal}
            withCloseButton={false}
            onClose={() => setShowModal(false)}
          >
            <div>
              <div className="mr-6 mt-2 flex items-center justify-center">
                <Image
                  className="ml-2 mr-1.5 h-[20px] w-[20px] xs:mr-2 xs:h-[26px] xs:w-[26px]"
                  src="/header-logo.svg"
                  alt="headerのロゴ"
                  width={30}
                  height={30}
                  priority={true}
                ></Image>
                <h3
                  className={`${montserrat.className} text-[1rem] font-[500] tracking-tight text-slate-700 xs:text-[1.3rem]`}
                >
                  HappyHacks
                </h3>
              </div>
              <div className="px-1.5 py-5">
                <p className="font-sans text-[14px] text-gray-700">
                  HappyHacksは、ADHD対策のアイデアを共有できるサービスです。
                  ログインすると、投稿やブックマークなどの機能をお使いいただけます。
                </p>
                <UnstyledButton
                  onClick={() => {
                    loginWithPopup(), setShowModal(false);
                  }}
                  className="my-6 mx-auto flex w-[200px] justify-center rounded-[6px] bg-gray-50 py-[9px] text-[14px] text-gray-700 shadow-sm shadow-gray-400"
                >
                  ログイン
                </UnstyledButton>
                <p className="font-sans text-[12px] text-gray-700">
                  <span>
                    <Link href={"/terms"} onClick={() => setShowModal(false)}>
                      利用規約
                    </Link>
                  </span>
                  、
                  <span>
                    <Link href={"/privacy"} onClick={() => setShowModal(false)}>
                      プライバシーポリシー
                    </Link>
                    に同意の上でご利用ください。
                  </span>
                </p>
              </div>
            </div>
          </Modal>

          <div className="ml-12">
            <div className="pl-2.5 pt-1 pr-3.5 text-[14px] font-bold leading-6 tracking-wide text-main-black xs:text-[1.125rem]">
              {props.title}
            </div>

            <div>
              <div className="mt-2 w-full break-all pl-2.5 pr-3.5 pb-5 text-[14px] leading-7 tracking-wide text-main-black xs:text-[1.125rem] xs:leading-8">
                {props.body}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
