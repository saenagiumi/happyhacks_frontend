import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "const/const";
import { useAuth0 } from "@auth0/auth0-react";
import { Comment } from "../types";
// import { getLikes } from "../api/getLikes";
import useSWR, { useSWRConfig } from "swr";
import { postLike } from "../api/postLike";
import { deleteLike } from "../api/deleteLike";

interface useToggleLikeArgs {
  commentId: string | string[] | undefined;
  userId: string;
}

const useToggleLike = ({ commentId, userId }: useToggleLikeArgs) => {
  const { getAccessTokenSilently } = useAuth0();
  const { mutate } = useSWRConfig();

  const { data: likesData, error: likeError, isLoading: likeIsLoading } = useSWR(
    `${API_BASE_URL}/comments/${commentId}/likes`,
    async (url: string) => {
      const res = await axios.get(url);
      return res.data;
    }
  );
  

  const isLiked = likesData?.likes.some((like: any) => like.user_id == userId);

  // いいねのトグル関数
  const toggleLikes = async () => {
    const accessToken = await getAccessTokenSilently();
    const likeId = likesData?.likes.find(
      (like: any) => like.user_id == userId
    )?.id;
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isLiked,
    likesData,
    likeError,
    likeIsLoading,
    toggleLikes,
  };
};

export default useToggleLike;
