import { Tweet } from "components/Tweet";
import Script from "next/script";
import React from "react";

const ToolList = ({ props }: any) => {
  return (
    <div>
      <div className="mx-4">
        <p className="font-sans">鍵をなくしてしまう人を支える技術</p>
        <Tweet id={"1626533711415234562"} />
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="lazyOnload"
        />
      </div>
    </div>
  );
};

export default ToolList;
