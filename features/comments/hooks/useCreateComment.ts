import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useSWRConfig } from "swr";
import { useState } from "react";
import { API_BASE_URL } from "const/const";
import { CommentData } from "../types";
import { postComment } from "../api/postComment";

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
        postId,
        accessToken,
        commentInputData,
      });

      if (response.status === 200) {
        mutate(`${API_BASE_URL}/posts/${postId}/comments`);

        return response.data;
      }
    } catch (e: any) {
      // エラー発生の状況を特定できていないので、以下は暫定的な対応
      if (e.response.status === 401 || 403) {
        throw new Error("Unauthorized");
      }

      if (e.error === "missing_refresh_token") {
        throw new Error("Missing refresh token");
      }

      let message;
      if (axios.isAxiosError(e) && e.response) {
        console.error(e.response.data.message);
      } else {
        message = String(e);
        console.error(message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return { createComment, isProcessing };
};
