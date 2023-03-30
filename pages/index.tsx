import { useRouter } from "next/router";
import { Tabs } from "@mantine/core";
import { PostsOrderByCreatedSequence } from "features/posts/components/PostsOrderByCreatedSequence";
import { PostsOrderByCommentsLength } from "features/posts/components/PostsOrderByCommentsLength";
import Image from "next/image";
import { NextSeo } from "next-seo";
import AboutButton from "components/AboutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useWindowSize } from "hooks/useWindowSize";
import HeroAria from "components/HeroAria";

export default function Home() {
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
          {showHero && <HeroAria />}

          <div className="max-w-[900px] mx-auto">
            <Tabs defaultValue="hacks" color="green.4" radius="xs">
              <div className="top-0 sticky pt-2 bg-white z-10">
                <Tabs.List>
                  <Tabs.Tab value="hacks">
                    <span className="font-sans xs:text-[1rem] text-gray-700 font-bold">
                      Hacks
                    </span>
                  </Tabs.Tab>
                  <Tabs.Tab value="trend">
                    <span className="font-sans xs:text-[1rem] text-gray-700 font-bold">
                      トレンド(Q)
                    </span>
                  </Tabs.Tab>
                  <Tabs.Tab value="unanswered">
                    <span className="font-sans xs:text-[1rem] text-gray-700 font-bold">
                      未回答(Q)
                    </span>
                  </Tabs.Tab>
                </Tabs.List>
              </div>

              <Tabs.Panel value="hacks" pt="xs">
                対策が入る
              </Tabs.Panel>

              <Tabs.Panel value="trend" pt="xs">
                <PostsOrderByCommentsLength />
              </Tabs.Panel>

              <Tabs.Panel value="unanswered" pt="xs">
                <PostsOrderByCreatedSequence />
              </Tabs.Panel>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
