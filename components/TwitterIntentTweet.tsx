import { ComponentProps, forwardRef } from "react";

type TwitterIntentTweetProps = {
  hashtags?: string[];
  in_reply_to?: string;
  related?: string[];
  text?: string;
  url?: string;
  via?: string;
} & Omit<ComponentProps<"a">, "href" | "target" | "rel">;

export const TwitterIntentTweet = forwardRef<
  HTMLAnchorElement,
  TwitterIntentTweetProps
>(
  (
    { hashtags, in_reply_to, related, text, url, via, ...intrinsicProps },
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
        ref={forwardedRef}
        href={_url.toString()}
        target="_blank"
        rel="noopener noreferrer"
        {...intrinsicProps}
      ></a>
    );
  }
);

if (process.env.NODE_ENV === "development") {
  TwitterIntentTweet.displayName = "TwitterShareLink";
}
