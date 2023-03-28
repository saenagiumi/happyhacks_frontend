import { useRouter } from "next/router";
import { Tabs, UnstyledButton } from "@mantine/core";
import { PostsOrderByCreatedSequence } from "features/posts/components/PostsOrderByCreatedSequence";
import { PostsOrderByCommentsLength } from "features/posts/components/PostsOrderByCommentsLength";
import Link from "next/link";
import Image from "next/image";
import { NextSeo } from "next-seo";
export const ActiveTab = () => {
  const router = useRouter();
  const seo = `${
    router.asPath === "/" ? "HappyHacks" : "/recent" ? "新着 | HappyHacks" : ""
  }`;

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
          <div className="flex justify-center items-center w-full h-[135vw] xs:h-[70vh] md:h-[52vh] bg-main-green text-white">
            <div className="sm:flex flex-row max-w-[900px]">
              <div className="flex-col sm:w-[50%] flex justify-center items-center">
                <div className="flex-col justify-center items-center">
                  <h1 className="font-sans inline-block font-[500] text-[7.3vw] xs:text-[2.1rem] md:text-[2.5rem] text-center leading-tight mb-5">
                    <span className="inline-block">ADHDの日常生活の困難</span>
                    <span className="inline-block">を環境調整でハックする</span>
                  </h1>

                  <div className="flex">
                    <Link href={"/about"} legacyBehavior>
                      <UnstyledButton className="flex justify-between items-center group text-[3.9vw] xs:text-[1.1rem] md:text-[1.2rem] xs:w-[300px] h-[2.9rem] md:h-[3.5rem] text-gray-600 font-sans font-[600] border-2 border-solid border-amber-300 rounded-full bg-white hover:bg-amber-300 w-[60.3vw]  md:w-[300px] pl-5 md:pl-6 pr-1 md:pr-[5px] mx-auto">
                        HappyHacksについて
                        <span className="px-2 py-1.5 md:px-3 md:py-2.5 rounded-full text-white bg-amber-400 group-hover:text-gray-700">
                          →
                        </span>
                      </UnstyledButton>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="sm:w-[50%] mb-[-50px] xs:mb-0">
                <div className="flex justify-center items-center sm:justify-center w-[80%] sm:w-[100%] h-[70%] sm:h-[100%]  m-0 mx-auto">
                  <Image
                    src={"/girl.png"}
                    width={450}
                    height={450}
                    sizes="100vw"
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                    }}
                    priority={true}
                    alt="hero-image"
                  />
                </div>
              </div>
            </div>
          </div>

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
