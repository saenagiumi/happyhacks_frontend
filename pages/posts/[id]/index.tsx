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

type Props = {
  postUserId: number;
  postData: {
    name: string;
    picture: string;
    post: {
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
      post: {
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

const PostsId = ({ postUserId, postData, fallback }: Props) => {
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
            url: `https://www.happyhacks.app/post/${postData.post.id}`,
            images: [
              {
                url: `https://www.happyhacks.app/api/og?title=${postData.post.title}`,
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
            <div className="max-w-screen-sm mx-auto">
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
  const post = await fetch(`${API_BASE_URL}/posts/${postId}`);
  const postData = await post.json();
  const postUserId = postData.post.user_id;

  return {
    postUserId,
    postData,
    fallback: {
      [`${API_BASE_URL}/posts/${postId}`]: postData,
    },
  };
};

export default PostsId;
