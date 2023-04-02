import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function ProgessBar() {
  const [bar, setBar] = useState({ d: "5s", n: "barstart" });
  const ref = useRef(true);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router.events]);

  const handleStart = () => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    setBar({ d: "1s", n: "barstart" });
  };

  const handleComplete = () => {
    setBar({ d: "0.4s", n: "barcomp" });
  };

  return !ref.current ? (
    <div
      style={{
        height: "2.5px",
        position: "fixed",
        backgroundColor: "#2d63e4",
        borderRadius: "0px 1px 1px 0px",
        animation: bar.d + " 0s normal backwards running " + bar.n,
      }}
    ></div>
  ) : (
    <></>
  );
}
