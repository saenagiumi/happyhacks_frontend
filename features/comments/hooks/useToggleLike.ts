import { useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "const/const";
import { useAuth0 } from "@auth0/auth0-react";
import useSWR, { useSWRConfig } from "swr";
import { postLike } from "../api/postLike";
import { deleteLike } from "../api/deleteLike";
import { Like } from "../types";

type Props = {
  userId: string;
  postId: string;
  commentId: string | string[] | undefined;
};

const useToggleLike = ({ postId, commentId, userId }: Props) => {
  const { data: likesCount } = useSWR(
    `${API_BASE_URL}/comments/${commentId}/likes`,
    async (url: string) => {
      const res = await axios.get(url);
      return res.data;
    }
  );

  const { data: commentLikes, isLoading: commentLikesIsloading } = useSWR(
    `${API_BASE_URL}/posts/${postId}/comments/${commentId}/likes`,
    async (url: string) => {
      const accessToken = await getAccessTokenSilently();
      const config = {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      };
      const res = await axios.get(url, config);
      return res.data;
    }
  );

  const { user, isLoading, getAccessTokenSilently, loginWithPopup } =
    useAuth0();
  const isProcessing = useRef(false);
  const { mutate } = useSWRConfig();

  const isLiked = commentLikes?.likes.some(
    (like: Like) => like.user_id.toString() == userId
  );

  const toggleLike = async () => {
    if (user === undefined && !isLoading) {
      loginWithPopup();
      return;
    }

    if (isProcessing.current) {
      return;
    }
    const likeId = commentLikes?.likes.find(
      (like: Like) => like.user_id.toString() == userId
    )?.id;
    try {
      isProcessing.current = true;
      const accessToken = await getAccessTokenSilently();

      if (isLiked) {
        await deleteLike({
          likeId: likeId,
          commentId: commentId,
          accessToken: accessToken,
        });
      } else {
        await postLike({
          commentId: commentId,
          accessToken: accessToken,
        });
      }

      mutate(`${API_BASE_URL}/comments/${commentId}/likes`);
      mutate(`${API_BASE_URL}/posts/${postId}/comments/${commentId}/likes`);
    } catch (e: any) {
      // エラー発生の状況を特定できていないので、以下は暫定的な対応
      if (e.response.status === 401 || 403) {
        throw new Error("Unauthorized");
      }

      let message;
      if (axios.isAxiosError(e) && e.response) {
        console.error(e.response.data.message);
      } else {
        message = String(e);
        console.error(message);
      }
    } finally {
      isProcessing.current = false;
    }
  };

  return {
    isLiked,
    likesCount,
    commentLikesIsloading,
    toggleLike,
  };
};

export default useToggleLike;
