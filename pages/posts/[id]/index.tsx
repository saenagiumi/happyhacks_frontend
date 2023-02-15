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
import { useEffect, useState } from "react";

const PostsId = () => {
  const router = useRouter();
  const [opened, modalHandlers] = useDisclosure(false);

  const { data, error, isLoading } = useFetch(
    router.query.id ? `${API_URL}/posts/${router.query.id}` : null
  );

  const { user, loginWithPopup, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState("");
  
  // アクセストークン取得
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAccessTokenSilently({});
        setAccessToken(token);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getToken();
  }, [getAccessTokenSilently, user?.sub]);
  

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
        <CommentForm accessToken={accessToken} userId={user?.sub} postId={router.query.id} modalHandlers={modalHandlers} />
      </Modal>

      {user === undefined && !isLoading && (
        <div className="flex justify-center my-10">
          <Button className="text-emerald-50" onClick={() => loginWithPopup()} color="green.4" size="md">
            ログインして回答する
          </Button>
        </div>
      )}

      {user && !isLoading && (
        <div className="flex my-2.5 mx-0.5">
          <Avatar src={user.picture} radius="xl" size="md" />
          <div
            onClick={() => modalHandlers.open()}
            className="w-full box-border ml-2 pl-3.5 pt-1.5 border-solid border border-gray-300 rounded-full  text-gray-400"
          >
            回答する
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsId;
