import "styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Header } from "components/Header/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
        fontFamily: 'Noto Sans JP, sans-serif',
        fontSizes: {
          xs: 12,
          sm: 14,
          md: 14,
          lg: 16,
          xl: 20,
        },
        
      }}
    >
      <Header />
      <Component {...pageProps} />
    </MantineProvider>
  );
}
