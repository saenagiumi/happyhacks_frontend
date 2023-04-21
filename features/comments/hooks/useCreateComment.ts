import { useAuth0 } from "@auth0/auth0-react";
import { API_BASE_URL } from "const/const";
import { useState } from "react";
import { useSWRConfig } from "swr";

import { postComment } from "../api/postComment";
import { CommentData } from "../types";

export const useCreateComment = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { mutate } = useSWRConfig();
  const [isProcessing, setIsProcessing] = useState(false);

  const createComment = async (
    postId: string | string[] | undefined,
    commentInputData: CommentData
  ) => {
    if (isProcessing) {
      return;
    }

    try {
      setIsProcessing(true);
      const accessToken = await getAccessTokenSilently({});
      const response = await postComment({
        accessToken,
        commentInputData,
        postId,
      });

      if (response.status === 200) {
        mutate(`${API_BASE_URL}/posts/${postId}/comments`);

        return response.data;
      }
    } catch (error) {
      console.error("Error in postComment:", error);

    } finally {
      setIsProcessing(false);
    }
  };

  return { createComment, isProcessing };
};
