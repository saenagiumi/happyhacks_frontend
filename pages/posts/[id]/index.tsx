import { useAuth0 } from "@auth0/auth0-react";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { API_BASE_URL } from "const/const";
import CommentForm from "features/comments/components/CommentForm";
import CommentListByPostId from "features/comments/components/CommentListByPostId";
import { PostDetail } from "features/posts/components/PostDetail";
import { useAtomValue } from "jotai";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { currentUserAtom } from "state/currentUser";
import { SWRConfig } from "swr";

export const dynamic = "force-dynamic";

type Props = {
  fallback: {
    url: {
      name: string;
      picture: string;
      post: {
        id: number;
        title: string;
        body: string;
        created_at: string;
        updated_at: string;
        user_id: number;
      };
    };
  };
  postData: {
    name: string;
    picture: string;
    post: {
      id: number;
      title: string;
      body: string;
      created_at: string;
      updated_at: string;
      user_id: number;
    };
  };
  postUserId: number;
};

const PostsId = ({ fallback, postData, postUserId }: Props) => {
  const { user } = useAuth0();
  const currentUser = useAtomValue(currentUserAtom);
  const router = useRouter();
  const [opened, modalHandlers] = useDisclosure(false);

  return (
    <>
      <SWRConfig value={{ fallback }}>
        <NextSeo
          title="HappyHacks | ADHD対策のナレッジを共有"
          description="HappyHacksは、ADHDにありがちな困りごとの対策をシェアして、より良い環境調整を自分の生活に取り入れるためのサービスです"
          openGraph={{
            title: "ADHD対策のナレッジを共有 | HappyHacks",
            description:
              "HappyHacksは、ADHDにありがちな困りごとの対策をシェアして、より良い環境調整を自分の生活に取り入れるためのサービスです",
            images: [
              {
                height: 630,
                url: `https://www.happyhacks.app/api/og?title=${postData.post.title}`,
                width: 1200,
              },
            ],
            site_name: "HappyHacks",
            type: "website",
            url: `https://www.happyhacks.app/post/${postData.post.id}`,
          }}
          twitter={{
            cardType: "summary_large_image",
            handle: "@handle",
            site: "@site",
          }}
        />
        <div className="mx-auto max-w-[900px]">
          <PostDetail />
          <CommentListByPostId
            postUserId={postUserId.toString()}
            currentUser={currentUser}
            postId={router.query.id}
            modalHandlers={modalHandlers}
          />
          <Modal
            withCloseButton={false}
            fullScreen
            opened={opened}
            onClose={() => modalHandlers.close()}
          >
            <div className="mx-auto max-w-screen-sm">
              <CommentForm
                userId={user?.sub}
                postId={router.query.id}
                modalHandlers={modalHandlers}
              />
            </div>
          </Modal>
        </div>
      </SWRConfig>
    </>
  );
};

PostsId.getInitialProps = async (ctx: NextPageContext) => {
  const postId = ctx.query.id;
  try {
    const post = await fetch(`${API_BASE_URL}/posts/${postId}`);
    const postData = await post.json();
    const postUserId = postData.post.user_id;

    return {
      fallback: {
        [`${API_BASE_URL}/posts/${postId}`]: postData,
      },
      postData,
      postUserId,
    };
  } catch (error) {
    console.error("Error in getInitialProps:", error);
  }
};

export default PostsId;
