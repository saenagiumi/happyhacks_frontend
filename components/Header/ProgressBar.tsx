import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function ProgessBar() {  
    const router = useRouter();
    useEffect(() => {
      router.events.on("routeChangeStart", e => {
        setBar({d: "1s", n:"barstart"})
      });
      router.events.on("routeChangeComplete", e => {
        setBar({d: "0.2s", n:"barcomp"})
      });
    }, []);
    const [bar, setBar] = useState({d: "5s", n:"barstart"});  
    return (
        <div style={{
            height: "3px",
            position: "fixed",
            backgroundColor: "rgb(30, 41, 59)",
            borderRadius: "0px 1px 1px 0px",
            animation: bar.d + " 0s normal backwards running " + bar.n
          }}></div>    
    )
}