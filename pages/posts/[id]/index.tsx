import { PostDetail } from "components/Post/PostDetail";

import { useFetch } from "hooks/useFetch";
import { useRouter } from "next/router";
import { API_URL } from "utils/const";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Avatar, Button } from "@mantine/core";
import CommentForm from "components/Comment/CommentForm";
import { CommentListByPostId } from "components/Comment/CommentListByPostId";
import { useAuth0 } from "@auth0/auth0-react";

// アクセストークンの取得
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import tokenState from "recoil/atoms/tokenState";

const PostsId = () => {
  const router = useRouter();
  const [opened, modalHandlers] = useDisclosure(false);

  const { data, error, isLoading } = useFetch(
    router.query.id ? `${API_URL}/posts/${router.query.id}` : null
  );
  const { user, loginWithPopup } = useAuth0();

  const { getAccessTokenSilently } = useAuth0();
  const setToken = useSetRecoilState(tokenState);

  // ログイン時にトークンを取得しRecoilへ格納
  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getToken();
  }, [user]);
  

  if (isLoading) {
    return <div>ローディング中</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="mx-1.5">
      <PostDetail />
      <CommentListByPostId id={data.id} />
      <Modal centered opened={opened} onClose={() => modalHandlers.close()}>
        <CommentForm userId={user?.sub} postId={router.query.id} modalHandlers={modalHandlers} />
      </Modal>

      {user === undefined && !isLoading && (
        <div className="flex justify-center my-10">
          <Button onClick={() => loginWithPopup()} color="yellow" size="md">
            ログインして回答する
          </Button>
        </div>
      )}

      {user && (
        <div className="flex mt-4">
          <Avatar src={user.picture} radius="xl" size="md" />
          <div
            onClick={() => modalHandlers.open()}
            className="w-full box-border ml-2 p-3 border-solid border border-gray-300 rounded-lg  text-gray-400"
          >
            回答する
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsId;
