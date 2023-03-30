import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function ProgessBar() {
  const [bar, setBar] = useState({ d: "5s", n: "barstart" });
  const ref = useRef(true);
  const router = useRouter();

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }

    router.events.on("routeChangeStart", (e) => {
      setBar({ d: "5s", n: "barstart" });
    });

    router.events.on("routeChangeComplete", (e) => {
      setBar({ d: "0.4s", n: "barcomp" });
    });
  }, [router.asPath]);

  if (ref.current) {
    return null;
  }

  return (
    <div
      style={{
        height: "2.5px",
        position: "fixed",
        backgroundColor: "#1366BA",
        borderRadius: "0px 1px 1px 0px",
        animation: bar.d + " 0s normal backwards running " + bar.n,
      }}
    ></div>
  );
}
