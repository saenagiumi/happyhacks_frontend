import axios from "axios";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { API_BASE_URL } from "const/const";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "state/currentUser";
import { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import { postPost } from "../api/postPost";
import { patchPost } from "../api/patchPost";
import { patchComment } from "../api/patchComment";

type FormData = {
  title: string;
  body: string;
  user_id: string;
};

export const usePost = () => {
  const currentUser = useAtomValue(currentUserAtom);
  const { mutate } = useSWRConfig();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { getAccessTokenSilently } = useAuth0();

  const createPost = async (postInputData: FormData) => {
    if (isProcessing) {
      return;
    }

    try {
      setIsProcessing(true);
      const accessToken = await getAccessTokenSilently();
      const response = await postPost({ postInputData, accessToken });

      if (response.status === 200) {
        mutate(`${API_BASE_URL}/posts_with_comments_count`);

        return response.data;
      }
    } catch (e: any) {
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

  const updatePost = async (postId: string, postInputData: FormData) => {
    if (isProcessing) {
      return;
    }
    try {
      setIsProcessing(true);
      const accessToken = await getAccessTokenSilently();
      const response = await patchPost({ postId, postInputData, accessToken });

      if (response.status === 200) {
        if (router.pathname === "/posts/[id]") {
          mutate(`${API_BASE_URL}/posts/${router.query.id}`);
        } else {
          mutate(`${API_BASE_URL}/users/${currentUser.id}/posts`);
        }

        return response.data;
      }
    } catch (e: any) {
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

  const updateComment = async (commentId: string, commentInputData: FormData) => {
    if (isProcessing) {
      return;
    }

    try {
      setIsProcessing(true);
      const accessToken = await getAccessTokenSilently();

      const response = await patchComment({
        commentId,
        commentInputData,
        accessToken,
      });

      if (response.status === 200) {
        mutate(`${API_BASE_URL}/users/${currentUser.id}/comments`);

        return response.data;
      }
    } catch (e: any) {
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

  return { createPost, updatePost, updateComment };
};
