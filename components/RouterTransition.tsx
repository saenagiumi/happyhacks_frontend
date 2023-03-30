import { useEffect } from "react";
import { useRouter } from "next/router";
import { NavigationProgress, nprogress } from "@mantine/nprogress";

export function RouterTransition() {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", (e) => {
      nprogress.start();
    });
    router.events.on("routeChangeComplete", (e) => {
      nprogress.complete();
    });
  }, []);

  return <NavigationProgress color="blue" autoReset={true} />;
}
