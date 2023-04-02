import "styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";
import { NavigationProgress } from "@mantine/nprogress";
import { Header } from "components/Header/Header";
import { Auth0Provider } from "@auth0/auth0-react";
import { MdCheckCircle } from "react-icons/md";
import Auth from "features/auth/components/Auth";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import ProgessBar from "components/ProgressBar";

export default function App({ Component, pageProps }: AppProps) {
  const redirectUri = `${process.env["NEXT_PUBLIC_BASE_URL"]}`;

  const onRedirectCallback = (appState: any) => {
    showNotification({
      autoClose: 3000,
      title: "ログインしました",
      message: "",
      color: "green.4",
      icon: <MdCheckCircle size={30} />,
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
          type: "website",
          title: "HappyHacks",
          description: "ADHDの日常生活の困難を環境調整でハックする",
          site_name: "HappyHacks",
          url: "https://www.happyhacks.app",
          images: [
            {
              url: `https://www.happyhacks.com/header-logo.svg`,
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
          ],
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Auth0Provider
        domain={process.env["NEXT_PUBLIC_AUTH0_DOMAIN"]!}
        clientId={process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"]!}
        authorizationParams={{
          redirect_uri: redirectUri,
          audience: process.env["NEXT_PUBLIC_AUTH0_AUDIENCE"]!,
          scope: "openid profile offline_access"
        }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
        onRedirectCallback={(appState) => onRedirectCallback(appState)}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
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
