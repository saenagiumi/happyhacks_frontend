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
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { NextSeo } from "next-seo";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const postId = params?.id;
  const post = await fetch(`${API_BASE_URL}/posts/${postId}`);
  const postData = await post.json();

  return {
    props: {
      postId,
      postData,
    },
  };
};

const PostsId = ({
  postId,
  postData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useAuth0();
  const currentUser = useAtomValue(currentUserAtom);
  const router = useRouter();
  const [opened, modalHandlers] = useDisclosure(false);

  return (
    <>
      <NextSeo
        title="HappyHacks"
        description="HappyHacksは、ADHDにありがちな困りごとの対策をシェアして、より良い環境調整を自分の生活に取り入れるためのサービスです"
        openGraph={{
          type: "website",
          title: `ADHD対策のナレッジを共有 | HappyHacks`,
          description:
            "HappyHacksは、ADHDにありがちな困りごとの対策をシェアして、より良い環境調整を自分の生活に取り入れるためのサービスです",
          site_name: "HappyHacks",
          url: `https://www.happyhacks.app/post/${postId}`,
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
        <PostDetail postId={postId} postData={postData} />
        <CommentListByPostId
          postUserId={postData.post.user_id}
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
    </>
  );
};

export default PostsId;
