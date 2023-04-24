import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Button, Menu, Modal, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { Montserrat_Alternates } from "@next/font/google";
import { Tweet } from "components/Tweet";
import { LOCAL_STORAGE_KEY } from "const/const";
import BookmarkButton from "features/comments/components/BookmarkButton";
import LikeButton from "features/comments/components/LikeButton";
import { useWindowSize } from "hooks/useWindowSize";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdCheckCircle } from "react-icons/md";
import { currentUserAtom } from "state/currentUser";

import { useDestroyPost } from "../hooks/useDestroyPost";
import useToggleHackBookmark from "../hooks/useToggleHackBookmark";
import useToggleHackLike from "../hooks/useToggleHackLike";
import { TargetHack } from "../types";
import HackForm from "./HackForm";

const montserrat = Montserrat_Alternates({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

type Props = {
  id: string;
  name: string;
  title: string;
  body: string;
  category: string;
  picture: string;
  tags: string[];
  tweetId: string;
  userId: string;
};

export const Hack = ({
  id,
  name,
  title,
  body,
  category,
  picture,
  tags,
  tweetId,
  userId,
}: Props) => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const [width] = useWindowSize();
  const { loginWithPopup } = useAuth0();
  const [showModal, setShowModal] = useState(false);

  const { bookmarksIsloading, isBookmarked, toggleBookmark } =
    useToggleHackBookmark({
      hackId: id,
      setShowModal,
      userId: currentUser.id,
    });
  const { isLiked, likesCount, likesIsloading, toggleLike } = useToggleHackLike(
    {
      hackId: id,
      setShowModal,
      userId: currentUser.id,
    }
  );
  const [openedEdit, { close: closeEdit, open: openEdit }] =
    useDisclosure(false);
  const [openedMenu, { close: closeMenu, open: openMenu }] =
    useDisclosure(false);
  const [targetHack, setTargetHack] = useState<TargetHack>({
    id: "",
    title: "",
    body: "",
    category: "",
    tags: [],
    tweet_id: "",
  });

  const { destroyHack } = useDestroyPost();
  const router = useRouter();

  const handleDelete = async () => {
    const isSuccess = await destroyHack(id);

    if (isSuccess) {
      closeMenu();
      showNotification({
        title: "削除完了",
        autoClose: 3000,
        color: "green.4",
        icon: <MdCheckCircle size={30} />,
        message: "投稿を削除しました",
      });
    }

    router.back();
  };

  useEffect(() => {
    // ローカルストレージからcurrentUserを取得する
    const storedCurrentUser = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  return (
    <div>
      <div className="mr-[-12px] flex justify-between">
        <div className="flex items-center justify-center">
          <Avatar className="mr-2.5" src={picture} size={34} radius={50} />
          <div className="text-[12px] font-bold text-gray-700">{name}</div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-[32px] w-[32px] items-center justify-center">
            <BookmarkButton
              onClick={() => toggleBookmark()}
              isBookmarked={isBookmarked}
              bookmarksIsLoading={bookmarksIsloading}
            />
          </div>
          <div className="flex scale-75 items-center justify-center">
            <LikeButton
              onClick={() => toggleLike()}
              likesCount={likesCount}
              isLiked={isLiked}
              likesIsLoading={likesIsloading}
            />
          </div>
        </div>
      </div>
      <div className="pt-4 pb-2 xs:p-5 xs:pt-7">
        <div className="">
          <div className="flex justify-between font-bold text-main-black">
            <div className="text-[16px] leading-6 tracking-wide xs:text-[1.125rem] xs:tracking-wide">
              {title}
            </div>

            {currentUser.id == userId && router.asPath.includes("hacks") && (
              <Menu
                position="bottom-end"
                offset={10}
                width={220}
                radius="md"
                shadow="sm"
              >
                <Menu.Target>
                  <UnstyledButton className="ml-3 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gray-100 p-2">
                    <HiOutlineDotsHorizontal
                      className="text-gray-500"
                      size={18}
                    />
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    className="py-3.5 pl-4 text-[18px] xs:text-[16px]"
                    onClick={() => {
                      openEdit(),
                        setTargetHack({
                          id: id,
                          title: title,
                          body: body,
                          category: category,
                          tags: tags,
                          tweet_id: tweetId,
                        });
                    }}
                  >
                    編集する
                  </Menu.Item>
                  <Menu.Item
                    onClick={openMenu}
                    className="py-3.5 pl-4 text-[18px] text-red-500 xs:text-[16px]"
                  >
                    削除する
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </div>
          <div className="mt-3.5 mb-4">
            <div>
              <div className="font-sans text-[10px] text-main-black xs:text-[12px]">
                {tags.map((tag, index) => (
                  <span
                    className="mr-1.5 rounded-full border-[0.5px]  border-solid border-gray-500 px-2.5 py-1.5"
                    key={index}
                  >
                    {"#" + " " + tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Modal
            withCloseButton={false}
            fullScreen
            opened={openedEdit}
            onClose={closeEdit}
          >
            <HackForm hackData={targetHack} close={closeEdit} />
          </Modal>
          <Modal
            opened={openedMenu}
            onClose={closeMenu}
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
                <Button onClick={closeMenu} variant="light" color="green">
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

          <div className="pt-2 pb-1">
            <div className="break-all text-[14px] leading-7 tracking-wide text-main-black xs:text-[1.125rem] xs:leading-8">
              {body}
            </div>
            <div className="xs:mx-auto">
              {tweetId !== undefined && tweetId !== "" && (
                <div>
                  <Tweet id={tweetId} />
                  <Script
                    src="https://platform.twitter.com/widgets.js"
                    strategy="lazyOnload"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
