import Link from "next/link";
import { Avatar, Button, Menu, Modal, UnstyledButton } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { HiOutlinePencilAlt } from "react-icons/hi";
// import { MdNotificationsNone } from "react-icons/md";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "state/currentUser";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import PostForm from "features/posts/components/PostForm";
import { Montserrat_Alternates } from "@next/font/google";
import { useWindowSize } from "hooks/useWindowSize";

const montserrat = Montserrat_Alternates({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const Header = () => {
  const { loginWithRedirect, logout, isLoading, user } = useAuth0();
  const currentUser = useAtomValue(currentUserAtom);
  const [opened, { open, close }] = useDisclosure(false);
  const [width, _] = useWindowSize();

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
    <div className="h-12 md:h-14 flex justify-between items-center max-w-screen-md mx-auto pl-1 pr-2.5">
      <Link href="/" className="no-underline flex justify-center items-center">
        <Image
          className="ml-2 mr-1.5 xs:mr-2 w-[22px] xs:w-[26px] h-[22px] xs:h-[26px]"
          src="/header-logo.svg"
          alt="headerのロゴ"
          width={30}
          height={30}
          priority={true}
        ></Image>
        <h1
          className={`${montserrat.className} text-slate-700 font-[500] text-[1.15rem] xs:text-[1.3rem] tracking-tight`}
        >
          HappyHacks
        </h1>
      </Link>

      {!isLoading && user === undefined && (
        <ul className="flex items-center">
          <li className="mr-1">
            <Button
              variant="subtle"
              color="green.4"
              size="xs"
              radius="xs"
              onClick={() => loginWithRedirect()}
            >
              ログイン
            </Button>
          </li>
          <li>
            <Button
              color="green.4"
              size="xs"
              radius="sm"
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: {
                    screen_hint: "signup",
                    scope: "openid profile offline_access"
                  },
                })
              }
            >
              新規登録
            </Button>
          </li>
        </ul>
      )}

      {user && (
        <ul className="flex items-center">
          {/* <li className="flex text-gray-400 mr-3">
            <MdNotificationsNone size={22} />
          </li> */}
          <li className="mr-1 mt-0.5 xs:mr-3 xs:mt-0">
            <Menu position="bottom-end" offset={12} shadow="xl" width={220}>
              <Menu.Target>
                <div>
                  <Avatar radius={50} size={32} src={currentUser.picture} />
                </div>
              </Menu.Target>

              <Menu.Dropdown>
                <Link href="/dashboard" className="no-underline">
                  <Menu.Item className="text-main-black text-[0.9rem] font-[500]">
                    質問の管理
                  </Menu.Item>
                </Link>
                <Link href="/dashboard/comments" className="no-underline">
                  <Menu.Item className="text-main-black text-[0.9rem] font-[500]">
                    回答の管理
                  </Menu.Item>
                </Link>
                <Link href="/dashboard/bookmarks" className="no-underline">
                  <Menu.Item className="text-main-black text-[0.9rem] font-[500]">
                    ブックマーク
                  </Menu.Item>
                </Link>
                <Link href="/profile" className="no-underline">
                  <Menu.Item className="text-main-black text-[0.9rem] font-[500]">
                    プロフィール編集
                  </Menu.Item>
                </Link>

                <Menu.Divider />
                <Link href="/about" className="no-underline">
                  <Menu.Item className="text-main-black text-[0.9rem] font-[500]">
                    HappyHacksについて
                  </Menu.Item>
                </Link>

                <Menu.Item
                  className="text-main-black text-[0.9rem] font-[500]"
                  onClick={() => handleLogout()}
                >
                  ログアウト
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </li>
          {user && width > 767 && (
            <li>
              <UnstyledButton
                onClick={open}
                className="flex items-center justify-center w-[33px] h-[32px] text-emerald-50 bg-main-green rounded-full"
              >
                <HiOutlinePencilAlt size={16} />
              </UnstyledButton>
              <Modal
                withCloseButton={false}
                fullScreen
                opened={opened}
                onClose={close}
              >
                <PostForm close={close} />
              </Modal>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
