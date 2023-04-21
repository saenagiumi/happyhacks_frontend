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

    router.events.on("routeChangeStart", () => {
      setBar({ d: "2s", n: "barstart" });
    });

    router.events.on("routeChangeComplete", () => {
      setBar({ d: "0.3s", n: "barcomp" });
    });
  }, [router]);

  if (ref.current) {
    return null;
  }

  return (
    <div
      style={{
        animation: bar.d + " 0s normal linear running " + bar.n,
        backgroundColor: "#00c7b7",
        borderRadius: "0px 1px 1px 0px",
        height: "2.5px",
        opacity: bar.n === "barcomp" ? 0.8 : 1,
        position: "fixed",
        transition: "opacity 0.3s ease-in ease-out",
        zIndex: "100",
      }}
    ></div>
  );
}
