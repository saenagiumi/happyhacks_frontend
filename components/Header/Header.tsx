import Logo from "../../public/header-logo.svg";
import Link from "next/link";
import { Avatar, Button, Menu, UnstyledButton } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";

import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdNotificationsNone } from "react-icons/md";

export const Header = () => {
  const { user, isLoading, isAuthenticated, loginWithRedirect, logout } =
    useAuth0();
  console.log({ user, isLoading, isAuthenticated, loginWithRedirect, logout });

  const handleLogout = () => {
    // RecoilでsessionStorageに保存したアクセストークンを消去
    sessionStorage.clear();
    logout({
      logoutParams: {
        returnTo:
          typeof window === "undefined" ? undefined : window.location.origin,
      },
    });
  };
  return (
    <div className="h-12 flex justify-between items-center pt-1 pl-2 pr-2.5">
      <Link href="/">
        <Logo className="w-[170px] h-full" />
      </Link>

      {user === undefined && !isLoading && (
        // ログアウト時の表示
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
        // ログイン時の表示
        <ul className="flex items-center">
          <li className="flex text-gray-400 mr-3">
            <MdNotificationsNone size={22} />
          </li>
          <li className="mr-3">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar radius="xl" size={32} src={user.picture} />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item>プロフィール</Menu.Item>
                <Menu.Item>マイリスト</Menu.Item>

                <Menu.Divider />

                <Menu.Item onClick={() => handleLogout()}>ログアウト</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </li>
          <li>
            <Link href="/posts/new">
              <UnstyledButton className="flex items-center justify-center w-[32px] h-[31px] text-emerald-50 bg-main-green rounded-[3px]">
                <HiOutlinePencilAlt size={18} />
              </UnstyledButton>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};
