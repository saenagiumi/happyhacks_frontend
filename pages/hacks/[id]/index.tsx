import { PostDetail } from "features/posts/components/PostDetail";
import { useRouter } from "next/router";
import { API_BASE_URL } from "const/const";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import CommentForm from "features/comments/components/CommentForm";
import CommentListByPostId from "features/comments/components/CommentListByPostId";
import { useAuth0 } from "@auth0/auth0-react";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "state/currentUser";
import { SWRConfig } from "swr";
import { NextPageContext } from "next";
import { NextSeo } from "next-seo";
import { Hack } from "features/posts/components/Hack";

type Props = {
  hackUserId: number;
  hackData: {
    name: string;
    picture: string;
    hack: {
      id: number;
      title: string;
      body: string;
      user_id: number;
      created_at: string;
      updated_at: string;
    };
  };
  fallback: {
    url: {
      hack: {
        id: number;
        title: string;
        body: string;
        user_id: number;
        created_at: string;
        updated_at: string;
      };
      name: string;
      picture: string;
    };
  };
};

const HacksId = ({ hackUserId, hackData, fallback }: Props) => {
  const { user } = useAuth0();
  const currentUser = useAtomValue(currentUserAtom);
  const router = useRouter();
  const [opened, modalHandlers] = useDisclosure(false);

  return (
    <>
      <SWRConfig value={{ fallback }}>
        <NextSeo
          title="HappyHacks"
          description="HappyHacksは、ADHDにありがちな困りごとの対策をシェアして、より良い環境調整を自分の生活に取り入れるためのサービスです"
          openGraph={{
            type: "website",
            title: `ADHD対策のナレッジを共有 | HappyHacks`,
            description:
              "HappyHacksは、ADHDにありがちな困りごとの対策をシェアして、より良い環境調整を自分の生活に取り入れるためのサービスです",
            site_name: "HappyHacks",
            url: `https://www.happyhacks.app/hack/${hackData.hack.id}`,
            images: [
              {
                url: `https://www.happyhacks.app/api/og?title=${hackData.hack.title}`,
                width: 1200,
                height: 630,
              },
            ],
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
        <div className="max-w-[900px] mx-auto">
          {/* <PostDetail /> */}
          {/* <Hack
          title={hackData.hack.title}
          body={hackData.hack.body}
          id={""}
          userId={""}
          /> */}
          <Modal
            withCloseButton={false}
            fullScreen
            opened={opened}
            onClose={() => modalHandlers.close()}
          ></Modal>
        </div>
      </SWRConfig>
    </>
  );
};

HacksId.getInitialProps = async (ctx: NextPageContext) => {
  const hackId = ctx.query.id;
  const hack = await fetch(`${API_BASE_URL}/hacks/${hackId}`);
  const hackData = await hack.json();
  const hackUserId = hackData.hack.user_id;

  return {
    hackUserId,
    hackData,
    fallback: {
      [`${API_BASE_URL}/hacks/${hackId}`]: hackData,
    },
  };
};

export default HacksId;
