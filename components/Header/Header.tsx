import Logo from "../../public/logo.svg";
import Link from "next/link";
import { Avatar, Button, Menu } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";

export const Header = () => {
  const { user, isLoading, loginWithRedirect, logout } = useAuth0();

  const handleLogout = () => {
    // RecoilでsessionStorageに保存したアクセストークンを消去
    sessionStorage.clear();
    logout();
  };

  return (
    <div className="h-[100px] flex justify-between items-center pr-5">
      <Link href="/">
        <Logo className="w-[200px] h-full" />
      </Link>

      {user === undefined && !isLoading && (
        // ログアウト時の表示
        <ul className="flex items-center">
          <li className="mr-3">
            <Button
              variant="subtle"
              color="yellow"
              size="xs"
              radius="xs"
              onClick={() => loginWithRedirect()}
            >
              ログイン
            </Button>
          </li>
          <li>
            <Button
              color="yellow"
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
          <li className="mr-3">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar radius="xl" size="md" src={user.picture} />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item>マイページ</Menu.Item>
                <Menu.Item>お気に入り</Menu.Item>

                <Menu.Divider />

                <Menu.Item onClick={() => handleLogout()}>ログアウト</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </li>
          <li>
            <Link href="/posts/new">
              <Button color="yellow" size="xs">
                質問する
              </Button>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};
