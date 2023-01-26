import "styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Header } from "components/Header/Header";

// 認証
import { Auth0Provider } from "@auth0/auth0-react";

// 状態管理
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  const redirectUri = `${process.env["NEXT_PUBLIC_BASE_URL"]}`;

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
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
      <Auth0Provider
        domain={process.env["NEXT_PUBLIC_AUTH0_DOMAIN"]!}
        clientId={process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"]!}
        authorizationParams={{
          redirect_uri: redirectUri,
          audience: process.env["NEXT_PUBLIC_AUTH0_AUDIENCE"]!,
        }}
      >
        <RecoilRoot>
          <Header />
          <Component {...pageProps} />
        </RecoilRoot>
      </Auth0Provider>
    </MantineProvider>
  );
}
