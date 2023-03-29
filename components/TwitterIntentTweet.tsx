import Image from "next/image";
import { ComponentProps, forwardRef } from "react";

type TwitterIntentTweetProps = {
  text?: string;
  url?: string;
  hashtags?: string[];
  via?: string;
  related?: string[];
  in_reply_to?: string;
} & Omit<ComponentProps<"a">, "href" | "target" | "rel">;

export const TwitterIntentTweet = forwardRef<
  HTMLAnchorElement,
  TwitterIntentTweetProps
>(
  (
    { text, url, hashtags, via, related, in_reply_to, ...intrinsicProps },
    forwardedRef
  ) => {
    const _url = new URL("https://twitter.com/intent/tweet");

    if (text !== undefined) _url.searchParams.set("text", text);
    if (url !== undefined) _url.searchParams.set("url", url);
    if (hashtags !== undefined)
      _url.searchParams.set("hashtags", hashtags.join(","));
    if (via !== undefined) _url.searchParams.set("via", via);
    if (related !== undefined)
      _url.searchParams.set("related", related.join(","));
    if (in_reply_to !== undefined)
      _url.searchParams.set("in_reply_to", in_reply_to);

    return (
      <a
        className="flex items-center font-sans bg-blue-400 hover:bg-blue-500 text-sky-50 text-[15px] font-[600] pl-4 pr-[18px] py-2 rounded-[4px] no-underline"
        ref={forwardedRef}
        href={_url.toString()}
        target="_blank"
        rel="noopener noreferrer"
        {...intrinsicProps}
      >
        <Image
          className="mr-2"
          src="/tw-logo-white.svg"
          width="16"
          height="16"
          alt="twitterのロゴ"
          priority={true}
        />
        Twitterにシェアする
      </a>
    );
  }
);

if (process.env.NODE_ENV === "development") {
  TwitterIntentTweet.displayName = "TwitterShareLink";
}
