import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { API_BASE_URL } from "const/const";
import React, { useRef } from "react";
import useSWR, { useSWRConfig } from "swr";

import { deleteLike } from "../api/deleteLike";
import { postLike } from "../api/postLike";
import { Like } from "../types";

type Props = {
  commentId: string | string[] | undefined;
  postId: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
};

const useToggleLike = ({ commentId, postId, setShowModal, userId }: Props) => {
  const { data: likesCount } = useSWR(
    `${API_BASE_URL}/comments/${commentId}/likes`,
    async (url: string) => {
      const res = await axios.get(url);
      return res.data;
    }
  );

  const { data: commentLikes, isLoading: likesIsloading } = useSWR(
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

  const { getAccessTokenSilently, isLoading, user } =
    useAuth0();
  const isProcessing = useRef(false);
  const { mutate } = useSWRConfig();

  const isLiked = commentLikes?.likes.some(
    (like: Like) => like.user_id.toString() === userId.toString()
  );

  const toggleLike = async () => {
    if (user === undefined && !isLoading) {
      setShowModal(true);
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
          accessToken: accessToken,
          commentId: commentId,
          likeId: likeId,
        });
      } else {
        await postLike({
          accessToken: accessToken,
          commentId: commentId,
        });
      }

      mutate(`${API_BASE_URL}/comments/${commentId}/likes`);
      mutate(`${API_BASE_URL}/posts/${postId}/comments/${commentId}/likes`);
    } catch (error) {
      console.error("Error in mutateLike:", error);
    } finally {
      isProcessing.current = false;
    }
  };

  return {
    isLiked,
    likesCount,
    likesIsloading,
    toggleLike,
  };
};

export default useToggleLike;
