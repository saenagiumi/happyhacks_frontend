import { useEffect } from "react";
import { useRouter } from "next/router";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

export function RouterTransition() {
  const router = useRouter();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        timer && clearTimeout(timer);
        nprogress.complete();
        nprogress.start();
      }
    };

    const handleComplete = () => {
      timer = setTimeout(() => nprogress.complete(), 200);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.asPath]);

  return <NavigationProgress color="blue" autoReset={true} />;
}
