import { useRouter } from "next/router";
import { Modal, UnstyledButton } from "@mantine/core";
import { NextSeo } from "next-seo";
import { useAuth0 } from "@auth0/auth0-react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useWindowSize } from "hooks/useWindowSize";
import HeroAria from "components/HeroAria";
import { useDisclosure } from "@mantine/hooks";
import PostForm from "features/posts/components/PostForm";
import PostTabIndex from "features/posts/components/PostTabIndex";

export default function Home() {
  const { user, isLoading } = useAuth0();
  const [width, _] = useWindowSize();
  const router = useRouter();
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
            <PostTabIndex />
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
