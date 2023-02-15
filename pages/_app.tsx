import "styles/globals.css";
import type { AppProps } from "next/app";

// Mantine
import { MantineProvider } from "@mantine/core";
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";

import { Header } from "components/Header/Header";

// 認証
import { Auth0Provider } from "@auth0/auth0-react";

// 状態管理
import { RecoilRoot } from "recoil";

// Toast
import { MdCheckCircle } from "react-icons/md";

export default function App({ Component, pageProps }: AppProps) {
  const redirectUri = `${process.env["NEXT_PUBLIC_BASE_URL"]}`;

  const onRedirectCallback = () => {
    showNotification({
      title: "ログインしました",
      message: "",
      color: "green.4",
      icon: <MdCheckCircle size={30} />,
      disallowClose: true,
    });
  };

  return (
    <Auth0Provider
      domain={process.env["NEXT_PUBLIC_AUTH0_DOMAIN"]!}
      clientId={process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"]!}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: process.env["NEXT_PUBLIC_AUTH0_AUDIENCE"]!,
      }}
      onRedirectCallback={(appState) => {
        // appState には、リダイレクト前の状態が含まれています
        window.history.replaceState(
          {},
          document.title,
          appState && appState.returnTo
            ? appState.returnTo
            : window.location.pathname
        );
      }}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          colors: {
            "ocean-blue": [
              "#7AD1DD",
              "#5FCCDB",
              "#44CADC",
              "#2AC9DE",
              "#1AC2D9",
              "#11B7CD",
              "#09ADC3",
              "#0E99AC",
              "#128797",
              "#147885",
            ],
            "bright-pink": [
              "#F0BBDD",
              "#ED9BCF",
              "#EC7CC3",
              "#ED5DB8",
              "#F13EAF",
              "#F71FA7",
              "#FF00A1",
              "#E00890",
              "#C50E82",
              "#AD1374",
            ],
            green: [
              "#dffdf7",
              "#bcf0e4",
              "#96e6d1",
              "#6fdaba",
              "#49d0a2",
              "#2fb692",
              "#218e79",
              "#13655c",
              "#053e3c",
              "#001714",
            ],
          },
          fontFamily: "Noto Sans JP, sans-serif",
          fontSizes: {
            xs: 12,
            sm: 14,
            md: 16,
            lg: 16,
            xl: 20,
          },
        }}
      >
        <RecoilRoot>
          <NotificationsProvider position="top-center">
            <Header />
            <Component {...pageProps} />
          </NotificationsProvider>
        </RecoilRoot>
      </MantineProvider>
    </Auth0Provider>
  );
}
