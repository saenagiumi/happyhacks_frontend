import { PostDetail } from "features/posts/components/PostDetail";

import { useFetch } from "hooks/useFetch";
import { useRouter } from "next/router";
import { API_BASE_URL } from "const/const";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Avatar } from "@mantine/core";
import CommentForm from "features/comments/components/CommentForm";
import { CommentsByPostId } from "features/comments/components/CommentsByPostId";
import { useAuth0 } from "@auth0/auth0-react";

// アクセストークンの取得
import { useEffect, useState } from "react";
import { getPostUser } from "features/posts/api/getUser";
import { Post } from "features/posts/types";
import { usePostUser } from "features/posts/hooks/usePostUser";
import { usePost } from "features/posts/hooks/usePost";
import getUser from "features/auth/api/getUser";
import { useAtom } from "jotai";
import { currentUserAtom } from "state/currentUser";

const LOCAL_STORAGE_KEY = "currentUser";

const PostsId = () => {
  const { user, isLoading, loginWithPopup, getAccessTokenSilently } =
    useAuth0();
  const [accessToken, setAccessToken] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const router = useRouter();
  const [opened, modalHandlers] = useDisclosure(false);

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
  }, []);  

  useEffect(() => {
    const checkFirstAccess = async (sub: string | undefined) => {
      // 初回アクセスかどうかを判断する
      const res = await getUser(user?.sub);
      if (res?.sub == null) {
        setIsRegistered(false);
        router.push("/registration");
      }
      if (res?.sub) {
        setCurrentUser(res);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(res)); // ローカルストレージに保存
      }
    };
    if (user) {
      checkFirstAccess(user.sub);
    }
  }, [user, getAccessTokenSilently]);

  return (
    <div className="mx-1.5">
      <PostDetail accessToken={accessToken} />
      <CommentsByPostId id={router.query.id} accessToken={accessToken} />
      <Modal centered opened={opened} onClose={() => modalHandlers.close()}>
        <CommentForm
          accessToken={accessToken}
          userId={user?.sub}
          postId={router.query.id}
          modalHandlers={modalHandlers}
        />
      </Modal>

      {user === undefined && !isLoading && (
        <div className="flex justify-center my-10">
          <Button
            className="text-emerald-50"
            onClick={() => loginWithPopup()}
            color="green.4"
            size="md"
          >
            ログインして回答する
          </Button>
        </div>
      )}

      {user && !isLoading && (
        <div className="flex my-2.5 mx-0.5">
          <Avatar src={currentUser.picture} radius={50} size={38} />
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
