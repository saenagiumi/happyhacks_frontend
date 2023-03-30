import { useRouter } from "next/router";
import { Tabs } from "@mantine/core";
import { PostsOrderByCreatedSequence } from "features/posts/components/PostsOrderByCreatedSequence";
import { PostsOrderByCommentsLength } from "features/posts/components/PostsOrderByCommentsLength";
import Image from "next/image";
import { NextSeo } from "next-seo";
import AboutButton from "components/AboutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useWindowSize } from "hooks/useWindowSize";
export const ActiveTab = () => {
  const { user, isLoading } = useAuth0();
  const [width, _] = useWindowSize();
  const router = useRouter();
  const seo = `${
    router.asPath === "/" ? "HappyHacks" : "/recent" ? "新着 | HappyHacks" : ""
  }`;
  const showHero =
    width > 767 || (!isLoading && user === undefined && width < 768);

  return (
    <>
      <NextSeo
        title={seo}
        description={seo}
        openGraph={{
          url: `${router.asPath}`,
          title: `${seo}`,
          description: `${seo}`,
        }}
      />
      <div>
        <div>
          {showHero && (
            <div className="flex justify-center items-center w-full mx-auto h-[135vw] xs:h-[70vh] md:h-[52vh] bg-main-green text-white">
              <div className="sm:flex flex-row max-w-[900px]">
                <div className="flex-col sm:w-[50%] flex justify-center items-center">
                  <div className="flex-col justify-center items-center">
                    <h1 className="font-sans inline-block font-[400] text-[7.3vw] xs:text-[2.1rem] md:text-[2.5rem] text-center leading-tight mb-5">
                      <span className="inline-block font-sans">
                        環境調整でハックする
                      </span>
                      <span className="inline-block font-sans">
                        ADHDの日常生活
                      </span>
                    </h1>

                    <AboutButton />
                  </div>
                </div>
                <div className="sm:w-[50%] mb-[-50px] xs:mb-0">
                  <div className="flex justify-center items-center sm:justify-center w-[80%] sm:w-[100%] h-[70%] sm:h-[100%]  m-0 mx-auto">
                    <Image
                      src={"/cup.png"}
                      width={450}
                      height={450}
                      sizes="100vw"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                      }}
                      priority={true}
                      alt="heroエリアの画像"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-[900px] mx-auto">
            <Tabs
              className=""
              value={router.query.activeTab as string}
              defaultValue="/"
              color="green.4"
              radius="xs"
              onTabChange={(value) => router.push(`${value}`)}
            >
              <div className="top-0 sticky pt-2 bg-white z-10">
                <Tabs.List>
                  <Tabs.Tab value="/">
                    <span className="font-sans xs:text-[1rem] text-gray-700 font-bold">
                      トレンド
                    </span>
                  </Tabs.Tab>
                  <Tabs.Tab value="recent">
                    <span className="font-sans xs:text-[1rem] text-gray-700 font-bold">
                      新着
                    </span>
                  </Tabs.Tab>
                </Tabs.List>
              </div>

              <Tabs.Panel value="/" pt="xs">
                <PostsOrderByCommentsLength />
              </Tabs.Panel>

              <Tabs.Panel value="recent" pt="xs">
                <PostsOrderByCreatedSequence />
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveTab;
