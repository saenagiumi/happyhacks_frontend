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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  const post = await fetch(`${API_BASE_URL}/posts/${id}`);
  const postData = await post.json();
  const postUserId = postData.user_id;

  return {
    props: {
      postUserId,
      fallback: {
        [`${API_BASE_URL}/posts/${id}`]: postData,
      },
    },
  };
};

const PostsId = ({
  postUserId,
  fallback,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useAuth0();
  const currentUser = useAtomValue(currentUserAtom);
  const router = useRouter();
  const [opened, modalHandlers] = useDisclosure(false);

  return (
    <>
      <SWRConfig value={{ fallback }}>
        <div className="max-w-[900px] mx-auto">
          <PostDetail />
          <CommentListByPostId
            postUserId={postUserId}
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

export default PostsId;
