import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Button, Menu, Modal, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Montserrat_Alternates } from "@next/font/google";
import HackForm from "features/posts/components/HackForm";
import PostForm from "features/posts/components/PostForm";
import { useWindowSize } from "hooks/useWindowSize";
import { useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsChatText, BsPencil } from "react-icons/bs";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { RiSearch2Line } from "react-icons/ri";
import { currentUserAtom } from "state/currentUser";

const montserrat = Montserrat_Alternates({
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

export const Header = () => {
  const { isLoading, loginWithRedirect, logout, user } = useAuth0();
  const currentUser = useAtomValue(currentUserAtom);
  const [isHack, setIsHack] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);
  const [opened, modalHandlers] = useDisclosure(false);
  const [alertOpened, alertModalHandlers] = useDisclosure(false);
  const [width] = useWindowSize();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo:
          typeof window === "undefined" ? undefined : window.location.origin,
      },
    }),
      localStorage.clear();
  };

  return (
    <div className="mx-auto flex h-12 max-w-screen-md items-center justify-between pl-1 pr-2.5 xl:h-14">
      <Link href="/" className="flex items-center justify-center no-underline">
        <Image
          className="ml-2 mr-1.5 h-[22px] w-[22px] xs:mr-2 xs:h-[20px] xs:w-[20px] xl:h-[26px] xl:w-[26px]"
          src="/header-logo.svg"
          alt="headerのロゴ"
          width={30}
          height={30}
          priority={true}
        ></Image>
        <h1
          className={`${montserrat.className} text-[1.15rem] font-[500] tracking-tight text-slate-700 xs:text-[1rem] xl:text-[1.3rem]`}
        >
          HappyHacks
        </h1>
      </Link>

      <Modal
        radius={8}
        overlayOpacity={0.35}
        size={width > 768 ? "sm" : 355}
        centered
        opened={alertOpened}
        withCloseButton={false}
        onClose={() => alertModalHandlers.close()}
      >
        <div>
          <div className="mr-6 mt-2 flex items-center justify-center">
            <Image
              className="ml-2 mr-1.5 h-[20px] w-[20px] xs:mr-2 xs:h-[46px] xs:w-[46px]"
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
              onClick={() => loginWithRedirect()}
              className="my-6 mx-auto flex w-[200px] justify-center rounded-[6px] bg-gray-50 py-[9px] text-[14px] text-gray-700 shadow-sm shadow-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              ログインページへ
            </UnstyledButton>
            <p className="font-sans text-[12px] text-gray-700">
              <span>
                <Link href={"/terms"} onClick={alertModalHandlers.close}>
                  利用規約
                </Link>
              </span>
              、
              <span>
                <Link href={"/privacy"} onClick={alertModalHandlers.close}>
                  プライバシーポリシー
                </Link>
                に同意の上でご利用ください。
              </span>
            </p>
          </div>
        </div>
      </Modal>

      {!isLoading && user === undefined && (
        <ul className="flex items-center">
          <li className="mr-3.5">
            <Link className="flex" href="/search">
              <RiSearch2Line className="text-gray-700" size={20} />
            </Link>
          </li>
          <li>
            <Button
              autoFocus={false}
              color="green.4"
              size="xs"
              radius="sm"
              onClick={() => alertModalHandlers.open()}
            >
              ログイン
            </Button>
          </li>
        </ul>
      )}

      {user && (
        <ul className="flex items-center">
          <li className="mr-3.5">
            <Link className="flex" href="/search">
              <RiSearch2Line className="text-gray-700" size={20} />
            </Link>
          </li>
          <li className="mr-0.5 xs:mr-3 xs:mt-0">
            <Menu
              opened={menuOpened}
              onChange={setMenuOpened}
              position="bottom-end"
              offset={12}
              shadow="xl"
              width={235}
              radius={5}
            >
              <Menu.Target>
                <UnstyledButton className="flex cursor-pointer items-center justify-center">
                  <Avatar
                    radius={50}
                    alt={user?.name}
                    size={32}
                    src={currentUser.picture}
                  />
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Link href="/dashboard" className="no-underline">
                  <Menu.Item className="py-3.5 pl-4 font-sans text-[18px] font-[600] text-gray-700 xs:py-3 xs:text-[16px]">
                    投稿の管理
                  </Menu.Item>
                </Link>
                <Link href="/dashboard/comments" className="no-underline">
                  <Menu.Item className="py-3.5 pl-4 font-sans text-[18px] font-[600] text-gray-700 xs:py-3 xs:text-[16px]">
                    回答の管理
                  </Menu.Item>
                </Link>
                <Link href="/dashboard/bookmarks" className="no-underline">
                  <Menu.Item className="py-3.5 pl-4 font-sans text-[18px] font-[600] text-gray-700 xs:py-3 xs:text-[16px]">
                    ブックマーク
                  </Menu.Item>
                </Link>
                <Link href="/profile" className="no-underline">
                  <Menu.Item className="py-3.5 pl-4 font-sans text-[18px] font-[600] text-gray-700 xs:py-3 xs:text-[16px]">
                    プロフィール編集
                  </Menu.Item>
                </Link>

                <Menu.Divider />
                <Link href="/about" className="no-underline">
                  <Menu.Item className="py-3.5 pl-[18px] font-sans text-[18px] font-[600] text-gray-700 xs:py-3 xs:text-[16px]">
                    HappyHacksについて
                  </Menu.Item>
                </Link>

                <Menu.Item
                  className="flex py-3.5 pl-[17px] xs:py-2.5 "
                  component="a"
                  onClick={() => handleLogout()}
                >
                  <UnstyledButton className="w-full font-sans text-[18px] font-[600] text-gray-700 xs:text-[16px]">
                    ログアウト
                  </UnstyledButton>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </li>
          {user && width > 767 && (
            <li>
              <Menu shadow="md" position="bottom-end" radius={5}>
                <Menu.Target>
                  <UnstyledButton className="flex h-[34px] w-[86px] cursor-pointer items-center justify-center rounded-full bg-main-green text-white">
                    <HiOutlinePencilAlt className="mr-1 ml-0.5" size={16} />
                    <div className="mr-1.5 font-sans text-[14.5px] font-[600]">
                      投稿
                    </div>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => {
                      modalHandlers.open();
                      setIsHack(true);
                    }}
                  >
                    <div className="flex h-[24px] w-[165px] items-center font-sans">
                      <span className="mr-4 mt-0.5">
                        <BsPencil size={22} className="text-main-green" />
                      </span>
                      <span className="font-sans text-[15px] font-[600] text-gray-700">
                        対策を共有する
                      </span>
                    </div>
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      modalHandlers.open();
                      setIsHack(false);
                    }}
                  >
                    <div className="flex h-[24px] w-[165px] items-center font-sans">
                      <span className="mr-4 mt-0.5">
                        <BsChatText size={22} className=" text-main-green" />
                      </span>
                      <span className="font-sans text-[15px] font-[600] text-gray-700">
                        質問してみる
                      </span>
                    </div>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <Modal
                withCloseButton={false}
                fullScreen
                opened={opened}
                onClose={() => modalHandlers.close()}
              >
                {isHack ? (
                  <HackForm close={() => modalHandlers.close()} />
                ) : (
                  <PostForm close={() => modalHandlers.close()} />
                )}
              </Modal>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Header;
