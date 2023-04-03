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
import HackList from "features/hacks/components/HackList";
import { useState } from "react";

export default function Home() {
  const { user, isLoading } = useAuth0();
  const [width, _] = useWindowSize();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string | null>("trend");
  const [opened, { open, close }] = useDisclosure(false);
  const showHero =
    width > 767 || (!isLoading && user === undefined && width < 768);

  return (
    <>
      <NextSeo
        title="HappyHacks"
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
                  <Tabs.Tab value="hacks" className="text-[16px] pb-2 pl-5">
                    <span className="font-sans xs:text-[1rem] text-gray-700 font-[700]">
                      対策
                    </span>
                  </Tabs.Tab>
                  <Tabs.Tab value="question" className="text-[16px] pb-2">
                    <span className="font-sans xs:text-[1rem] text-gray-700 font-bold">
                      質問
                    </span>
                  </Tabs.Tab>
                </Tabs.List>
              </div>

              <Tabs.Panel value="hacks">{/* <HackList /> */}</Tabs.Panel>

              <Tabs.Panel value="question">
                <Tabs
                  value={activeTab}
                  onTabChange={setActiveTab}
                  variant="pills"
                  color="green.4"
                  radius="xl"
                >
                  <div className="top-11 pt-2 sticky xs:pt-4 bg-white z-10">
                    <Tabs.List pl="xs" pb="xs">
                      <Tabs.Tab value="trend" className="w-[5.5rem] h-[2rem]">
                        <span
                          className={`flex items-center font-sans text-[0.875rem] ${
                            activeTab !== "trend"
                              ? "text-gray-700"
                              : "text-white"
                          } font-[700]`}
                        >
                          トレンド
                        </span>
                      </Tabs.Tab>
                      <Tabs.Tab
                        value="unanswered"
                        className="w-[5.5rem] h-[2rem]"
                      >
                        <span
                          className={`flex items-center font-sans text-[0.875rem] ${
                            activeTab !== "unanswered"
                              ? "text-gray-700"
                              : "text-white"
                          } font-[700]`}
                        >
                          未回答
                        </span>
                      </Tabs.Tab>
                    </Tabs.List>
                  </div>
                  <Tabs.Panel value="trend">
                    <PostListTrend />
                  </Tabs.Panel>
                  <Tabs.Panel value="unanswered">
                    <PostListUnanswered />
                  </Tabs.Panel>
                </Tabs>
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
