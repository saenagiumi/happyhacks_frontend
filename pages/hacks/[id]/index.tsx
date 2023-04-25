import { TwitterIntentTweet } from "components/TwitterIntentTweet";
import { API_BASE_URL } from "const/const";
import { Hack } from "features/posts/components/Hack";
import { NextPageContext } from "next";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { SWRConfig } from "swr";

export const dynamic = "force-dynamic";

type Props = {
  fallback: {
    url: {
      hack: {
        id: number;
        name: string;
        title: string;
        body: string;
        created_at: string;
        picture: string;
        updated_at: string;
        user_id: number;
      };
    };
  };
  hackData: {
    hack: {
      id: number;
      name: string;
      title: string;
      body: string;
      category: string;
      created_at: string;
      picture: string;
      tags: string[];
      tweet_id: string;
      updated_at: string;
      user_id: number;
    };
  };
  hackUserId: number;
};

const HacksId = ({ fallback, hackData }: Props) => {
  return (
    <>
      <SWRConfig value={{ fallback }}>
        <NextSeo
          title={`${hackData.hack.title} | HappyHacks`}
          description="HappyHacksは、ADHDにありがちな困りごとの対策をシェアして、より良い環境調整を自分の生活に取り入れるためのサービスです"
          openGraph={{
            title: `${hackData.hack.title} | HappyHacks`,
            description:
              "HappyHacksは、ADHDにありがちな困りごとの対策をシェアして、より良い環境調整を自分の生活に取り入れるためのサービスです",
            images: [
              {
                height: 630,
                url: `https://www.happyhacks.app/api/og?title=${hackData.hack.title}`,
                width: 1200,
              },
            ],
            site_name: "HappyHacks",
            type: "website",
            url: `https://www.happyhacks.app/hack/${hackData.hack.id}`,
          }}
          twitter={{
            cardType: "summary_large_image",
            handle: "@handle",
            site: "@site",
          }}
        />
        <div className={`mx-auto mb-10 ${hackData.hack.tweet_id ? "max-w-screen-xs" : "max-w-screen-sm"}`}>
          <div className="w-full flex-col items-center justify-center px-7 pt-3">
            <Hack
              title={hackData.hack.title}
              body={hackData.hack.body}
              picture={hackData.hack.picture}
              name={hackData.hack.name}
              id={hackData.hack.id.toString()}
              userId={hackData.hack.user_id.toString()}
              tweetId={hackData.hack.tweet_id?.toString()}
              category={hackData.hack.category}
              tags={hackData.hack.tags}
            />

            {!hackData.hack.tweet_id && (
              <div className="my-3 mb-10">
                <TwitterIntentTweet
                  className="flex h-[40px] w-[160px] items-center justify-center rounded-full bg-blue-400 py-2 pl-5 pr-[22px] font-sans text-[15px] font-[600] text-sky-50 no-underline xs:ml-4"
                  text={`\n\n${hackData.hack.title}\n`}
                  url={`https://www.happyhacks.app/hacks/${hackData.hack.id.toString()}`}
                >
                  <Image
                    className="mr-2"
                    src="/tw-logo-white.svg"
                    width="16"
                    height="16"
                    alt="twitterのロゴ"
                    priority={true}
                  />
                  ツイートする
                </TwitterIntentTweet>
              </div>
            )}
          </div>
        </div>
      </SWRConfig>
    </>
  );
};

HacksId.getInitialProps = async (ctx: NextPageContext) => {
  const hackId = ctx.query.id;

  try {
    const hack = await fetch(`${API_BASE_URL}/hacks/${hackId}`);
    const hackData = await hack.json();
    const hackUserId = hackData.hack.user_id;

    return {
      fallback: {
        [`${API_BASE_URL}/hacks/${hackId}`]: hackData,
      },
      hackData,
      hackUserId,
    };
  } catch (error) {
    console.error("Error in getInitialProps:", error);
  }
};

export default HacksId;
