import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { API_BASE_URL } from "const/const";
import React, { useRef } from "react";
import useSWR, { useSWRConfig } from "swr";

import { deleteLike } from "../api/deleteLike";
import { postLike } from "../api/postLike";
import { Like } from "../types";

type Props = {
  hackId: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
};

const useToggleHackLike = ({ hackId, setShowModal, userId }: Props) => {
  const { data: hackLikes, isLoading: likesIsloading } = useSWR(
    `${API_BASE_URL}/hacks/${hackId}/likes`,
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

  const { getAccessTokenSilently, isLoading, user } = useAuth0();
  const isProcessing = useRef(false);
  const { mutate } = useSWRConfig();

  const isLiked = hackLikes?.likes.some(
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

    const likeId = hackLikes.likes?.find(
      (like: Like) => like.user_id.toString() == userId
    )?.id;

    try {
      isProcessing.current = true;
      const accessToken = await getAccessTokenSilently();

      if (isLiked) {
        await deleteLike({
          accessToken: accessToken,
          hackId: hackId,
          likeId: likeId?.toString(),
        });
      } else {
        await postLike({
          accessToken: accessToken,
          hackId: hackId,
        });
      }

      mutate(`${API_BASE_URL}/hacks/${hackId}/likes`);
    } catch (error) {
      console.error("Error in mutateLike:", error);
    } finally {
      isProcessing.current = false;
    }
  };

  return {
    isLiked,
    likesCount: hackLikes?.likes_count,
    likesIsloading,
    toggleLike,
  };
};

export default useToggleHackLike;
