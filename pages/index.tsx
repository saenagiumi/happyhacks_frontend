import { useRouter } from "next/router";
import { Modal, Tabs, UnstyledButton } from "@mantine/core";
import { PostListTrend } from "features/posts/components/PostListTrend";
import { PostListUnanswered } from "features/posts/components/PostListUnanswered";
import { NextSeo } from "next-seo";
import { useAuth0 } from "@auth0/auth0-react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useWindowSize } from "hooks/useWindowSize";
import HeroAria from "components/HeroAria";
import { useDisclosure } from "@mantine/hooks";
import PostForm from "features/posts/components/PostForm";
import { CURRENT_LOCATION_URL } from "const/const";

export default function Home() {
  const { user, isLoading } = useAuth0();
  const [width, height] = useWindowSize();
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const showHero =
    width > 767 || (!isLoading && user === undefined && width < 768);

  return (
    <>
      <NextSeo
        title="ADHD対策のナレッジを共有 | HappyHacks"
        description="HappyHacksは、ADHDにありがちな困りごとの対策をシェアして、より良い環境調整を自分の生活に
        取り入れるためのサービスです"
        openGraph={{
          url: `${router.asPath}`,
          title: "ADHD対策のナレッジを共有 | HappyHacks",
          description:
            "HappyHacksは、ADHDにありがちな困りごとの対策をシェアして、より良い環境調整を自分の生活に取り入れるためのサービスです",
        }}
      />
      <div>
        <div>
          {showHero && <HeroAria />}
          {width < 768 && user && (
            <UnstyledButton
              onClick={open}
              className="flex fixed z-50 bottom-5 right-4 py-[14px] px-[14.5px]
            cursor-pointer text-emerald-50 bg-main-green rounded-full"
            >
              <HiOutlinePencilAlt size={24} />
            </UnstyledButton>
          )}
          <div className="max-w-[900px] mx-auto">
            <Tabs defaultValue="hacks" color="green.4" radius="xs">
              <div className="top-0 sticky pt-2 bg-white z-10">
                <Tabs.List>
                  <Tabs.Tab value="hacks" className="text-[16px] pb-3 pl-5">
                    <span className="font-sans xs:text-[1.0rem] text-gray-700 font-[700]">
                      Hacks
                    </span>
                  </Tabs.Tab>
                  <Tabs.Tab value="trend" className="text-[16px] pb-3">
                    <span className="font-sans xs:text-[1rem] text-gray-700 font-bold">
                      トレンド
                    </span>
                  </Tabs.Tab>
                  <Tabs.Tab value="unanswered" className="text-[16px] pb-3">
                    <span className="font-sans xs:text-[1rem] text-gray-700 font-bold">
                      未回答
                    </span>
                  </Tabs.Tab>
                </Tabs.List>
              </div>

              <Tabs.Panel value="hacks" pt="xs">
                対策が入る
              </Tabs.Panel>

              <Tabs.Panel value="trend" pt="xs">
                <PostListTrend />
              </Tabs.Panel>

              <Tabs.Panel value="unanswered" pt="xs">
                <PostListUnanswered />
              </Tabs.Panel>
            </Tabs>
            <Modal
              withCloseButton={false}
              fullScreen
              opened={opened}
              onClose={close}
            >
              <PostForm close={close} />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
