import { useAuth0 } from "@auth0/auth0-react";
import { Menu, Modal, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import HeroAria from "components/HeroAria";
import HackForm from "features/posts/components/HackForm";
import PostForm from "features/posts/components/PostForm";
import PostTabIndex from "features/posts/components/PostTabIndex";
import { useWindowSize } from "hooks/useWindowSize";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { BsChatText, BsPencil } from "react-icons/bs";
import { HiOutlinePencilAlt } from "react-icons/hi";

export const dynamic = "force-dynamic";

export default function Home() {
  const { user } = useAuth0();
  const [isHack, setIsHack] = useState(false);
  const [width] = useWindowSize();
  const router = useRouter();
  const [opened, modalHandlers] = useDisclosure(false);

  return (
    <>
      <NextSeo
        title="HappyHacks | ADHD対策のナレッジを共有"
        description="HappyHacksは、ADHDにありがちな困りごとの対策をシェアして、より良い環境調整を自分の生活に
        取り入れるためのサービスです"
        openGraph={{
          title: "ADHD対策のナレッジを共有 | HappyHacks",
          description:
            "HappyHacksは、ADHDにありがちな困りごとの対策をシェアして、より良い環境調整を自分の生活に取り入れるためのサービスです",
          images: [
            {
              alt: "Og Image Alt",
              height: 541,
              url: "https://www.happyhacks.app/ogp.webp",
              width: 1031,
            },
          ],
          url: `${router.asPath}`,
        }}
        twitter={{
          cardType: "summary_large_image",
          handle: "@handle",
          site: "@site",
        }}
      />
      <div>
        <div>
          <HeroAria />
          {width < 768 && user && (
            <div>
              <Menu
                position="bottom-end"
                withArrow
                shadow="xs"
                arrowOffset={20}
                arrowSize={12}
                radius={5}
              >
                <Menu.Target>
                  <UnstyledButton
                    className="fixed bottom-5 right-4 z-50 flex cursor-pointer rounded-full
            bg-main-green py-[14px] px-[14.5px] text-emerald-50"
                  >
                    <HiOutlinePencilAlt size={24} />
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => {
                      modalHandlers.open();
                      setIsHack(true);
                    }}
                  >
                    <div className="flex h-[26px] w-[165px] items-center font-sans">
                      <span className="mr-3.5">
                        <BsPencil
                          size={22}
                          className="mt-0.5 text-main-green"
                        />
                      </span>
                      <span className="font-sans text-[16px] font-[600] text-gray-700">
                        対策を共有する
                      </span>
                    </div>
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => {
                      modalHandlers.open();
                      setIsHack(false);
                    }}
                  >
                    <div className="flex h-[26px] w-[165px] items-center font-sans">
                      <span className="mr-3.5">
                        <BsChatText size={22} className=" text-main-green" />
                      </span>
                      <span className="font-sans text-[16px] font-[600] text-gray-700">
                        質問してみる
                      </span>
                    </div>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          )}
          <div className="mx-auto max-w-[900px]">
            <PostTabIndex />
            <Modal
              withCloseButton={false}
              fullScreen
              opened={opened}
              onClose={() => modalHandlers.close()}
            >
              {isHack ? (
                <HackForm close={() => modalHandlers.close()} />
              ) : (
                <PostForm close={() => modalHandlers.close()} />
              )}
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
