import "styles/globals.css";

import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";
import { Header } from "components/Layout/Header";
import ProgessBar from "components/Layout/ProgressBar";
import Auth from "features/auth/components/Auth";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { MdCheckCircle } from "react-icons/md";

export default function App({ Component, pageProps }: AppProps) {
  const redirectUri = `${process.env["NEXT_PUBLIC_BASE_URL"]}`;

  const onRedirectCallback = (appState: any) => {
    showNotification({
      title: "ログインしました",
      autoClose: 3000,
      color: "green.4",
      icon: <MdCheckCircle size={30} />,
      message: "",
    });
    window.history.replaceState(
      {},
      document.title,
      appState && appState.returnTo
        ? appState.returnTo
        : window.location.pathname
    );
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <DefaultSeo
        defaultTitle="HappyHacks"
        description="ADHDの日常生活の困難を環境調整でハックする"
        openGraph={{
          title: "ADHD対策のナレッジを共有",
          description: "ADHDの日常生活の困難を環境調整でハックする",
          images: [
            {
              alt: "Og Image Alt",
              height: 541,
              url: "https://www.happyhacks.app/ogp.webp",
              width: 1031,
            },
          ],
          site_name: "HappyHacks",
          type: "website",
          url: "https://www.happyhacks.app",
        }}
        twitter={{
          cardType: "summary_large_image",
          handle: "@handle",
          site: "@site",
        }}
      />
      <Auth0Provider
        domain={process.env["NEXT_PUBLIC_AUTH0_DOMAIN"]!}
        clientId={process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"]!}
        authorizationParams={{
          audience: process.env["NEXT_PUBLIC_AUTH0_AUDIENCE"]!,
          redirect_uri: redirectUri,
          scope: "openid profile offline_access",
        }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
        onRedirectCallback={(appState) => onRedirectCallback(appState)}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colors: {
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
            },
            colorScheme: "light",
            fontFamily: "Noto Sans JP, sans-serif",
            fontSizes: {
              lg: 16,
              md: 16,
              sm: 14,
              xl: 20,
              xs: 12,
            },
          }}
        >
          <NotificationsProvider position="top-center">
            <Auth>
              <ProgessBar />
              <Header />
              <Component {...pageProps} />
            </Auth>
          </NotificationsProvider>
        </MantineProvider>
      </Auth0Provider>
    </>
  );
}
